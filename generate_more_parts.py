import os
from PIL import Image, ImageFilter, ImageEnhance
import numpy as np

BASE_DIR = '/home/quartz/Desktop/dossier-generator/assets/neuro'
PARTS_DIR = '/home/quartz/Desktop/dossier-generator/assets/neuro/parts'

def dodge(front, back):
    result = front * 255.0 / (255.0 - back + 1e-6)
    result[result > 255] = 255
    result[back == 255] = 255
    return result.astype('uint8')

def make_transparent_sketch(img):
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(2.0)
    
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(1.5)
    
    inv_img = Image.eval(img, lambda x: 255 - x)
    blurred = inv_img.filter(ImageFilter.GaussianBlur(15))
    
    blurred_np = np.array(blurred).astype(np.float32)
    img_np = np.array(img).astype(np.float32)
    
    sketch = dodge(blurred_np, img_np)
    
    alpha = 255 - sketch
    alpha[alpha < 80] = 0
    alpha = np.clip(alpha * 1.5, 0, 255)
    
    out = np.zeros((sketch.shape[0], sketch.shape[1], 4), dtype=np.uint8)
    out[..., 3] = alpha
    return Image.fromarray(out)

def process_base(base_index):
    path = os.path.join(BASE_DIR, f'base_{base_index}.jpg')
    if not os.path.exists(path):
        return
        
    print(f"Processing base_{base_index}.jpg")
    img = Image.open(path).convert('L')
    
    w, h = img.size
    
    face = make_transparent_sketch(img)
    face.save(os.path.join(PARTS_DIR, f'face_{base_index+2}.png'))
    
    eyes_img = img.crop((int(w*0.15), int(h*0.35), int(w*0.85), int(h*0.52)))
    eyes = make_transparent_sketch(eyes_img)
    eyes.save(os.path.join(PARTS_DIR, f'eyes_{base_index+2}.png'))
    
    nose_img = img.crop((int(w*0.35), int(h*0.50), int(w*0.65), int(h*0.70)))
    nose = make_transparent_sketch(nose_img)
    nose.save(os.path.join(PARTS_DIR, f'nose_{base_index+2}.png'))
    
    mouth_img = img.crop((int(w*0.30), int(h*0.68), int(w*0.70), int(h*0.85)))
    mouth = make_transparent_sketch(mouth_img)
    mouth.save(os.path.join(PARTS_DIR, f'mouth_{base_index+2}.png'))

if __name__ == '__main__':
    for i in range(1, 5):
        process_base(i)
    print("Generation complete.")
