import os
from PIL import Image
import numpy as np

PARTS_DIR = '/home/quartz/Desktop/dossier-generator/assets/neuro/parts'

def make_transparent(img_path):
    print(f"Processing {img_path}...")
    img = Image.open(img_path).convert('L')
    data = np.array(img)
    
    alpha = 255 - data
    # To remove faint grays completely:
    alpha = alpha.astype(np.float32)
    alpha[alpha < 50] = 0
    alpha = np.clip(alpha * 1.5, 0, 255).astype(np.uint8)
    
    out = np.zeros((data.shape[0], data.shape[1], 4), dtype=np.uint8)
    out[..., 0] = 0 # R
    out[..., 1] = 0 # G
    out[..., 2] = 0 # B
    out[..., 3] = alpha # A
    
    png_path = img_path.replace('.jpg', '.png')
    Image.fromarray(out).save(png_path)
    os.remove(img_path)

if __name__ == '__main__':
    for filename in os.listdir(PARTS_DIR):
        if filename.endswith('.jpg'):
            make_transparent(os.path.join(PARTS_DIR, filename))
    print("Done processing.")
