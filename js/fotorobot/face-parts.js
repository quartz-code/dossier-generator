// face-parts.js — SVG face-part library for Фоторобот (facial composite)
// Ported from React to vanilla JS. All parts render in a 400×500 SVG viewBox.

const FaceParts = (() => {

  const EYE_WHITE = 'oklch(0.94 0.01 90)';
  const EYE_DARK = 'oklch(0.18 0.02 50)';
  const ELDRITCH = 'oklch(0.52 0.13 150)';
  const ELDRITCH_DEEP = 'oklch(0.38 0.1 160)';

  // ===================== FACE SHAPES (6) =====================
  const FACE = [
    (c) => `<path d="M200 80 C 250 80, 290 120, 295 200 C 300 280, 280 380, 200 420 C 120 380, 100 280, 105 200 C 110 120, 150 80, 200 80 Z" fill="${c.skin}" fill-opacity="0.18" stroke="${c.skin}" stroke-width="2.4"/>`,
    (c) => `<path d="M120 100 L 280 100 C 295 100, 300 110, 300 130 L 300 320 C 300 360, 280 400, 250 415 L 150 415 C 120 400, 100 360, 100 320 L 100 130 C 100 110, 105 100, 120 100 Z" fill="${c.skin}" fill-opacity="0.18" stroke="${c.skin}" stroke-width="2.4"/>`,
    (c) => `<ellipse cx="200" cy="250" rx="105" ry="170" fill="${c.skin}" fill-opacity="0.18" stroke="${c.skin}" stroke-width="2.4"/>`,
    (c) => `<path d="M200 82 C 245 82, 280 130, 282 210 C 284 300, 250 390, 200 418 C 150 390, 116 300, 118 210 C 120 130, 155 82, 200 82 Z" fill="${c.skin}" fill-opacity="0.18" stroke="${c.skin}" stroke-width="2.4"/>`,
    (c) => `<path d="M130 95 C 270 95, 305 140, 300 220 C 295 300, 250 380, 200 418 C 150 380, 105 300, 100 220 C 95 140, 130 95, 130 95 Z" fill="${c.skin}" fill-opacity="0.18" stroke="${c.skin}" stroke-width="2.4"/>`,
    (c) => `<path d="M200 78 C 240 78, 270 120, 272 200 C 274 300, 250 400, 200 425 C 150 400, 126 300, 128 200 C 130 120, 160 78, 200 78 Z" fill="${c.skin}" fill-opacity="0.18" stroke="${c.skin}" stroke-width="2.4"/>`,
  ];

  // ===================== EARS (3) =====================
  const EARS = [
    (c) => `<g stroke="${c.skin}" stroke-width="2.2" fill="${c.skin}" fill-opacity="0.16"><path d="M105 220 C 88 222, 84 245, 92 265 C 98 278, 110 275, 112 260 L 112 235 Z"/><path d="M295 220 C 312 222, 316 245, 308 265 C 302 278, 290 275, 288 260 L 288 235 Z"/></g>`,
    (c) => `<g stroke="${c.skin}" stroke-width="2.2" fill="${c.skin}" fill-opacity="0.16"><path d="M104 210 C 80 215, 74 250, 86 280 C 96 296, 114 292, 116 272 L 116 230 Z"/><path d="M296 210 C 320 215, 326 250, 314 280 C 304 296, 286 292, 284 272 L 284 230 Z"/></g>`,
    (c) => `<g stroke="${c.skin}" stroke-width="2.2" fill="${c.skin}" fill-opacity="0.16"><path d="M105 215 C 88 220, 86 248, 98 268 C 100 260, 104 252, 112 248 L 110 228 Z"/><path d="M295 215 C 312 220, 314 248, 302 268 C 300 260, 296 252, 288 248 L 290 228 Z"/></g>`,
  ];

  // ===================== HAIR (10) =====================
  const HAIR = [
    (c) => `<path d="M108 195 C 105 140, 140 85, 200 85 C 260 85, 295 140, 292 195 C 285 170, 260 150, 200 150 C 140 150, 115 170, 108 195 Z" fill="${c.hair}" stroke="${c.hair}" stroke-width="1.5"/>`,
    (c) => `<path d="M120 110 C 160 95, 240 95, 280 110 C 270 100, 130 100, 120 110 Z" fill="${c.hair}" fill-opacity="0.25" stroke="${c.hair}" stroke-width="1.5"/>`,
    (c) => `<g fill="${c.hair}" stroke="${c.hair}" stroke-width="1.5"><path d="M100 220 C 95 150, 140 80, 200 80 C 260 80, 305 150, 300 220 C 300 280, 295 320, 290 350 C 282 310, 278 270, 275 220 C 270 180, 240 150, 200 150 C 160 150, 130 180, 125 220 C 122 270, 118 310, 110 350 C 105 320, 100 280, 100 220 Z"/></g>`,
    (c) => `<path d="M108 195 C 105 135, 145 82, 200 82 C 255 82, 295 135, 292 195 C 285 165, 260 145, 210 150 L 205 150 C 200 130, 190 110, 170 100 C 150 110, 130 150, 108 195 Z" fill="${c.hair}" stroke="${c.hair}" stroke-width="1.5"/>`,
    (c) => `<path d="M112 180 C 112 135, 145 88, 200 88 C 255 88, 288 135, 288 180 C 280 160, 250 142, 200 142 C 150 142, 120 160, 112 180 Z" fill="${c.hair}" fill-opacity="0.85" stroke="${c.hair}" stroke-width="1.5" stroke-dasharray="2 3"/>`,
    (c) => `<g fill="${c.hair}" stroke="${c.hair}" stroke-width="1.2"><path d="M104 180 C 100 130, 145 78, 200 78 C 255 78, 300 130, 296 180 C 290 165, 275 155, 270 165 C 265 150, 250 148, 245 160 C 240 145, 220 145, 215 158 C 210 145, 190 145, 185 158 C 180 148, 160 148, 155 160 C 150 155, 135 155, 130 165 C 125 155, 110 165, 104 180 Z"/></g>`,
    (c) => `<path d="M115 195 C 118 150, 140 110, 170 100 L 175 130 C 185 120, 215 120, 225 130 L 230 100 C 260 110, 282 150, 285 195 C 275 170, 250 155, 200 158 C 150 155, 125 170, 115 195 Z" fill="${c.hair}" stroke="${c.hair}" stroke-width="1.5"/>`,
    (c) => `<path d="M110 185 C 108 140, 142 88, 200 88 C 258 88, 292 140, 290 185 C 285 160, 270 140, 200 140 C 130 140, 115 160, 110 185 Z M105 185 C 102 175, 100 165, 102 158" fill="${c.hair}" stroke="${c.hair}" stroke-width="1.5"/>`,
    (c) => `<g fill="${c.hair}" stroke="${c.hair}" stroke-width="1.5"><path d="M106 200 C 100 140, 140 80, 200 80 C 260 80, 300 140, 294 200 C 288 180, 275 170, 268 180 C 262 168, 248 165, 240 178 C 232 165, 215 165, 208 178 C 200 168, 185 168, 178 178 C 170 165, 155 168, 148 180 C 140 170, 120 180, 106 200 Z"/></g>`,
    (c) => `<g fill="${c.hair}" stroke="${c.hair}" stroke-width="1.5"><path d="M190 80 C 195 70, 205 70, 210 80 L 215 175 L 185 175 Z"/><path d="M120 110 C 130 105, 150 105, 175 108" fill="none" stroke-opacity="0.5"/><path d="M280 110 C 270 105, 250 105, 225 108" fill="none" stroke-opacity="0.5"/></g>`,
  ];

  // ===================== BROWS (6) =====================
  const BROWS = [
    (c) => `<g stroke="${c.hair}" stroke-width="3.2" stroke-linecap="round" fill="none"><path d="M138 188 C 148 182, 168 182, 178 188"/><path d="M222 188 C 232 182, 252 182, 262 188"/></g>`,
    (c) => `<g stroke="${c.hair}" stroke-width="3.4" stroke-linecap="round" fill="none"><path d="M136 182 L 178 192"/><path d="M222 192 L 264 182"/></g>`,
    (c) => `<g stroke="${c.hair}" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M140 190 L 178 188"/><path d="M222 188 L 260 190"/></g>`,
    (c) => `<g fill="${c.hair}" stroke="${c.hair}" stroke-width="1"><path d="M136 184 C 146 178, 172 178, 180 186 C 170 192, 146 192, 136 184 Z"/><path d="M220 186 C 228 178, 254 178, 264 184 C 254 192, 230 192, 220 186 Z"/></g>`,
    (c) => `<g stroke="${c.hair}" stroke-width="3" stroke-linecap="round" fill="none"><path d="M138 178 C 148 170, 168 172, 178 178"/><path d="M222 178 C 232 172, 252 170, 262 178"/></g>`,
    () => '',
  ];

  // ===================== EYES (8) =====================
  const EYES = [
    () => `<g><ellipse cx="155" cy="215" rx="20" ry="11" fill="${EYE_WHITE}" stroke="${EYE_DARK}" stroke-width="2"/><ellipse cx="245" cy="215" rx="20" ry="11" fill="${EYE_WHITE}" stroke="${EYE_DARK}" stroke-width="2"/><circle cx="155" cy="215" r="6" fill="${EYE_DARK}"/><circle cx="245" cy="215" r="6" fill="${EYE_DARK}"/><circle cx="153" cy="212" r="1.6" fill="${EYE_WHITE}"/><circle cx="243" cy="212" r="1.6" fill="${EYE_WHITE}"/></g>`,
    () => `<g stroke="${EYE_DARK}" stroke-width="2" fill="none"><path d="M135 215 C 145 210, 168 210, 178 215 C 168 220, 145 220, 135 215 Z" fill="${EYE_WHITE}"/><path d="M225 215 C 235 210, 258 210, 268 215 C 258 220, 235 220, 225 215 Z" fill="${EYE_WHITE}"/><circle cx="155" cy="215" r="4" fill="${EYE_DARK}" stroke="none"/><circle cx="245" cy="215" r="4" fill="${EYE_DARK}" stroke="none"/></g>`,
    () => `<g><circle cx="155" cy="215" r="15" fill="${EYE_WHITE}" stroke="${EYE_DARK}" stroke-width="2"/><circle cx="245" cy="215" r="15" fill="${EYE_WHITE}" stroke="${EYE_DARK}" stroke-width="2"/><circle cx="155" cy="215" r="5" fill="${EYE_DARK}"/><circle cx="245" cy="215" r="5" fill="${EYE_DARK}"/></g>`,
    () => `<g><path d="M132 210 C 140 205, 172 205, 180 212 C 170 218, 142 218, 132 210 Z" fill="${EYE_WHITE}" stroke="${EYE_DARK}" stroke-width="2"/><path d="M222 212 C 230 205, 262 205, 270 210 C 260 218, 232 218, 222 212 Z" fill="${EYE_WHITE}" stroke="${EYE_DARK}" stroke-width="2"/><path d="M130 200 C 140 196, 170 196, 182 202" stroke="${EYE_DARK}" stroke-width="2.4" fill="none"/><path d="M218 202 C 230 196, 260 196, 272 200" stroke="${EYE_DARK}" stroke-width="2.4" fill="none"/><circle cx="156" cy="212" r="5" fill="${EYE_DARK}"/><circle cx="244" cy="212" r="5" fill="${EYE_DARK}"/></g>`,
    () => `<g><circle cx="155" cy="215" r="13" fill="${EYE_WHITE}" stroke="${EYE_DARK}" stroke-width="2"/><circle cx="245" cy="215" r="13" fill="${EYE_WHITE}" stroke="${EYE_DARK}" stroke-width="2"/><circle cx="155" cy="215" r="7" fill="${EYE_DARK}"/><circle cx="245" cy="215" r="7" fill="${EYE_DARK}"/></g>`,
    () => `<g><path d="M133 220 C 145 208, 170 208, 180 220 C 170 216, 145 216, 133 220 Z" fill="${EYE_WHITE}" stroke="${EYE_DARK}" stroke-width="2"/><path d="M223 220 C 233 208, 258 208, 270 220 C 258 216, 233 216, 223 220 Z" fill="${EYE_WHITE}" stroke="${EYE_DARK}" stroke-width="2"/><circle cx="156" cy="216" r="5" fill="${EYE_DARK}"/><circle cx="244" cy="216" r="5" fill="${EYE_DARK}"/><path d="M140 200 L 175 205 M225 205 L 260 200" stroke="${EYE_DARK}" stroke-width="1.6" opacity="0.5"/></g>`,
    () => `<g><ellipse cx="155" cy="217" rx="18" ry="10" fill="${EYE_WHITE}" stroke="${EYE_DARK}" stroke-width="2"/><path d="M226 217 C 234 212, 258 212, 266 217 C 258 220, 234 220, 226 217 Z" fill="${EYE_WHITE}" stroke="${EYE_DARK}" stroke-width="2"/><circle cx="155" cy="217" r="6" fill="${EYE_DARK}"/><circle cx="248" cy="217" r="4" fill="${EYE_DARK}"/></g>`,
    () => `<g stroke="${EYE_DARK}" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M135 215 C 145 210, 168 210, 178 215"/><path d="M225 215 C 235 210, 258 210, 268 215"/><path d="M145 222 L 150 219 M160 222 L 165 219 M235 222 L 240 219 M250 222 L 255 219" opacity="0.6"/></g>`,
  ];

  // ===================== NOSE (5) =====================
  const NOSE = [
    (c) => `<path d="M200 230 C 196 255, 192 275, 195 285 C 200 290, 205 290, 210 285 C 208 275, 204 255, 200 230" fill="none" stroke="${c.skin}" stroke-width="2.2" stroke-linecap="round"/>`,
    (c) => `<path d="M198 230 C 196 255, 190 280, 185 290 C 190 296, 200 294, 208 288 C 206 278, 204 255, 200 230" fill="none" stroke="${c.skin}" stroke-width="2.2" stroke-linecap="round"/>`,
    (c) => `<g fill="none" stroke="${c.skin}" stroke-width="2.2" stroke-linecap="round"><path d="M200 230 C 198 255, 196 270, 200 275"/><ellipse cx="195" cy="278" rx="5" ry="4"/><ellipse cx="205" cy="278" rx="5" ry="4"/></g>`,
    (c) => `<path d="M200 230 C 197 260, 193 295, 196 305 C 201 310, 206 310, 211 305 C 209 295, 204 260, 200 230" fill="none" stroke="${c.skin}" stroke-width="2.2" stroke-linecap="round"/>`,
    (c) => `<g fill="none" stroke="${c.skin}" stroke-width="2.2" stroke-linecap="round"><path d="M200 230 C 199 255, 197 270, 200 275"/><path d="M188 282 C 195 290, 205 290, 212 282"/><ellipse cx="192" cy="282" rx="4" ry="3"/><ellipse cx="208" cy="282" rx="4" ry="3"/></g>`,
  ];

  // ===================== MOUTH (7) =====================
  const MOUTH = [
    (c) => `<path d="M175 335 C 190 340, 210 340, 225 335" fill="none" stroke="${c.skin}" stroke-width="2.4" stroke-linecap="round"/>`,
    (c) => `<path d="M175 338 C 190 335, 210 345, 228 330" fill="none" stroke="${c.skin}" stroke-width="2.4" stroke-linecap="round"/>`,
    (c) => `<path d="M175 342 C 190 332, 210 332, 225 342" fill="none" stroke="${c.skin}" stroke-width="2.4" stroke-linecap="round"/>`,
    (c) => `<g><path d="M170 330 C 190 350, 210 350, 230 330" fill="oklch(0.4 0.02 30)" stroke="${c.skin}" stroke-width="2.2" stroke-linecap="round"/><path d="M178 335 C 190 342, 210 342, 222 335" fill="${EYE_WHITE}" stroke="none" opacity="0.6"/></g>`,
    (c) => `<path d="M175 336 L 225 336" fill="none" stroke="${c.skin}" stroke-width="2.6" stroke-linecap="round"/>`,
    (c) => `<g fill="${c.skin}" fill-opacity="0.3" stroke="${c.skin}" stroke-width="2"><path d="M172 332 C 190 326, 210 326, 228 332 C 210 340, 190 340, 172 332 Z"/><path d="M174 338 C 190 344, 210 344, 226 338" fill="none"/></g>`,
    (c) => `<g><ellipse cx="200" cy="338" rx="20" ry="10" fill="oklch(0.3 0.02 25)" stroke="${c.skin}" stroke-width="2.2"/><path d="M190 344 C 195 348, 205 348, 210 344" fill="${EYE_WHITE}" stroke="none"/></g>`,
  ];

  // ===================== BEARD (5) =====================
  const BEARD = [
    () => '',
    (c) => `<g fill="${c.hair}" opacity="0.35"><path d="M140 300 C 150 340, 170 400, 200 410 C 230 400, 250 340, 260 300 C 250 330, 230 360, 200 365 C 170 360, 150 330, 140 300 Z"/></g>`,
    (c) => `<g fill="${c.hair}" stroke="${c.hair}" stroke-width="1"><path d="M185 345 C 180 360, 185 380, 200 385 C 215 380, 220 360, 215 345 C 210 352, 190 352, 185 345 Z"/><path d="M190 330 C 195 326, 205 326, 210 330 C 205 336, 195 336, 190 330 Z"/></g>`,
    (c) => `<g fill="${c.hair}" stroke="${c.hair}" stroke-width="1"><path d="M120 280 C 120 360, 150 415, 200 420 C 250 415, 280 360, 280 280 C 275 320, 260 360, 240 380 C 225 395, 210 400, 200 400 C 190 400, 175 395, 160 380 C 140 360, 125 320, 120 280 Z"/><path d="M150 290 C 160 310, 175 320, 200 322 C 225 320, 240 310, 250 290 C 240 300, 220 305, 200 305 C 180 305, 160 300, 150 290 Z" fill="${c.hair}" opacity="0.7"/></g>`,
    (c) => `<g fill="${c.hair}" stroke="${c.hair}" stroke-width="1"><path d="M170 328 C 165 322, 155 322, 150 328 C 155 335, 165 336, 175 332 Z"/><path d="M230 328 C 235 322, 245 322, 250 328 C 245 335, 235 336, 225 332 Z"/></g>`,
  ];

  // ===================== ACCESSORY (8) =====================
  const ACCESSORY = [
    () => '',
    () => `<g fill="none" stroke="oklch(0.8 0.04 85)" stroke-width="2.4"><circle cx="155" cy="215" r="26"/><circle cx="245" cy="215" r="26"/><path d="M181 215 L 219 215"/><path d="M129 212 L 110 205"/><path d="M271 212 L 290 205"/></g>`,
    () => `<g stroke="oklch(0.2 0.02 50)" stroke-width="2.4"><rect x="128" y="200" width="54" height="26" rx="8" fill="oklch(0.15 0.02 50)"/><rect x="218" y="200" width="54" height="26" rx="8" fill="oklch(0.15 0.02 50)"/><path d="M182 213 L 218 213" fill="none"/><path d="M128 206 L 110 200" fill="none"/><path d="M272 206 L 290 200" fill="none"/></g>`,
    () => `<g fill="none" stroke="oklch(0.8 0.04 85)" stroke-width="2.6"><circle cx="245" cy="215" r="28"/><circle cx="245" cy="215" r="24" fill="oklch(0.7 0.05 180 / 0.15)"/><path d="M245 243 C 248 270, 252 290, 260 310"/></g>`,
    () => `<g><path d="M90 130 C 90 110, 130 90, 200 90 C 270 90, 310 110, 310 130 L 310 140 L 90 140 Z" fill="oklch(0.22 0.02 40)" stroke="oklch(0.12 0.02 40)" stroke-width="1.5"/><path d="M70 140 C 120 132, 280 132, 330 140 C 320 150, 280 152, 200 152 C 120 152, 80 150, 70 140 Z" fill="oklch(0.18 0.02 40)" stroke="oklch(0.12 0.02 40)" stroke-width="1.5"/><path d="M90 140 C 130 138, 270 138, 310 140" fill="none" stroke="oklch(0.5 0.08 30)" stroke-width="3"/></g>`,
    () => `<g><path d="M110 120 C 110 95, 150 82, 200 82 C 250 82, 290 95, 290 120 C 280 130, 260 135, 200 135 C 140 135, 120 130, 110 120 Z" fill="oklch(0.28 0.03 45)" stroke="oklch(0.15 0.02 40)" stroke-width="1.5"/><path d="M200 135 C 230 140, 270 142, 295 138" fill="none" stroke="oklch(0.15 0.02 40)" stroke-width="1.5"/></g>`,
    () => `<g fill="oklch(0.12 0.02 40)" stroke="oklch(0.08 0.01 40)" stroke-width="1.5"><path d="M135 195 C 130 200, 128 230, 135 240 L 180 240 C 185 230, 183 200, 178 195 Z"/><path d="M135 200 C 120 190, 110 185, 100 180" fill="none" stroke="oklch(0.1 0.01 40)" stroke-width="2"/><path d="M180 200 C 195 195, 210 200, 220 205" fill="none" stroke="oklch(0.1 0.01 40)" stroke-width="2"/></g>`,
    () => `<g><rect x="205" y="335" width="42" height="6" rx="2" fill="oklch(0.32 0.04 35)" stroke="oklch(0.2 0.02 35)" stroke-width="1" transform="rotate(-8 205 335)"/><rect x="243" y="333" width="6" height="10" rx="1" fill="oklch(0.5 0.1 30)" transform="rotate(-8 205 335)"/><path d="M250 330 C 256 318, 254 305, 258 295" fill="none" stroke="oklch(0.8 0.02 80)" stroke-width="2" opacity="0.5"/><path d="M255 325 C 262 315, 260 300, 264 290" fill="none" stroke="oklch(0.8 0.02 80)" stroke-width="1.5" opacity="0.35"/></g>`,
  ];

  // ===================== MYTHOS (7) =====================
  const MYTHOS = [
    () => '',
    () => `<g fill="none" stroke="${ELDRITCH}" stroke-width="2.4" stroke-linecap="round"><path d="M180 340 C 170 355, 165 375, 172 388 C 178 380, 180 365, 182 352" fill="${ELDRITCH}" fill-opacity="0.2"/><path d="M200 342 C 198 360, 200 380, 200 392 C 202 380, 204 360, 202 342" fill="${ELDRITCH}" fill-opacity="0.2"/><path d="M220 340 C 230 355, 235 375, 228 388 C 222 380, 220 365, 218 352" fill="${ELDRITCH}" fill-opacity="0.2"/><circle cx="172" cy="388" r="2" fill="${ELDRITCH}"/><circle cx="200" cy="392" r="2" fill="${ELDRITCH}"/><circle cx="228" cy="388" r="2" fill="${ELDRITCH}"/></g>`,
    () => `<g><ellipse cx="200" cy="160" rx="18" ry="11" fill="${EYE_WHITE}" stroke="${ELDRITCH}" stroke-width="2"/><circle cx="200" cy="160" r="7" fill="${ELDRITCH_DEEP}"/><circle cx="200" cy="160" r="4" fill="${ELDRITCH}"/><circle cx="197" cy="157" r="1.5" fill="${EYE_WHITE}"/><path d="M178 148 C 188 142, 212 142, 222 148" stroke="${ELDRITCH}" stroke-width="1.6" fill="none"/></g>`,
    () => `<g fill="oklch(0.2 0.02 40)" stroke="oklch(0.12 0.01 40)" stroke-width="1.5"><path d="M130 95 C 110 80, 95 60, 92 45 C 105 55, 118 70, 132 85 Z"/><path d="M270 95 C 290 80, 305 60, 308 45 C 295 55, 282 70, 268 85 Z"/></g>`,
    () => `<g><circle cx="155" cy="215" r="9" fill="${ELDRITCH}" opacity="0.9"/><circle cx="245" cy="215" r="9" fill="${ELDRITCH}" opacity="0.9"/><circle cx="155" cy="215" r="14" fill="${ELDRITCH}" opacity="0.25"/><circle cx="245" cy="215" r="14" fill="${ELDRITCH}" opacity="0.25"/></g>`,
    () => `<g fill="none" stroke="${ELDRITCH}" stroke-width="2" stroke-linecap="round" opacity="0.8"><path d="M120 390 C 128 395, 135 400, 138 408"/><path d="M115 400 C 123 405, 130 410, 133 418"/><path d="M280 390 C 272 395, 265 400, 262 408"/><path d="M285 400 C 277 405, 270 410, 267 418"/></g>`,
    () => `<g fill="none" stroke="${ELDRITCH}" stroke-width="2" stroke-linecap="round" opacity="0.85"><path d="M200 110 L 200 140"/><path d="M188 120 L 212 120"/><circle cx="200" cy="128" r="8"/><circle cx="200" cy="128" r="2" fill="${ELDRITCH}"/></g>`,
  ];

  // ===================== SCARS (8) =====================
  const SCARS = [
    () => '',
    () => `<g opacity="0.7"><path d="M140 280 L 160 320" stroke="oklch(0.5 0.1 20)" stroke-width="2" stroke-linecap="round"/><path d="M142 290 L 150 288 M 148 300 L 156 298 M 154 310 L 162 308" stroke="oklch(0.4 0.1 20)" stroke-width="1.5"/></g>`,
    () => `<g opacity="0.7"><path d="M220 160 L 250 210" stroke="oklch(0.5 0.1 20)" stroke-width="2" stroke-linecap="round"/><path d="M225 175 L 235 170 M 235 190 L 245 185" stroke="oklch(0.4 0.1 20)" stroke-width="1.5"/></g>`,
    () => `<g><rect x="180" y="240" width="40" height="15" rx="2" fill="oklch(0.9 0.02 80)" stroke="oklch(0.7 0.02 80)" transform="rotate(-5 200 245)"/><rect x="185" y="242" width="10" height="11" fill="oklch(0.8 0.02 80)" transform="rotate(-5 200 245)"/></g>`,
    () => `<g><circle cx="230" cy="360" r="3" fill="oklch(0.2 0.05 40)"/><circle cx="230" cy="359" r="1" fill="oklch(0.3 0.05 40)"/></g>`,
    () => `<g><path d="M135 228 C 150 240, 165 240, 175 228" fill="none" stroke="oklch(0.1 0.1 300)" stroke-width="8" stroke-linecap="round" opacity="0.1"/><path d="M225 228 C 235 240, 250 240, 265 228" fill="none" stroke="oklch(0.1 0.1 300)" stroke-width="8" stroke-linecap="round" opacity="0.1"/></g>`,
    () => `<text x="135" y="280" font-family="monospace" font-size="14" fill="oklch(0.2 0.1 240)" opacity="0.6" transform="rotate(15 135 280)">138</text>`,
    () => `<g opacity="0.7"><path d="M200 120 L 190 140 L 210 140 Z M200 110 L 200 150 M 185 130 L 215 130" fill="none" stroke="oklch(0.4 0.1 30)" stroke-width="2"/></g>`,
  ];

  // ===================== HATS (7) =====================
  const HATS = [
    () => '',
    () => `<g><path d="M110 135 C 150 145, 250 145, 290 135 C 310 130, 320 140, 310 150 C 270 160, 130 160, 90 150 C 80 140, 90 130, 110 135 Z" fill="oklch(0.2 0.02 40)" stroke="oklch(0.1 0.02 40)" stroke-width="2"/><path d="M130 138 C 130 60, 270 60, 270 138 Z" fill="oklch(0.2 0.02 40)" stroke="oklch(0.1 0.02 40)" stroke-width="2"/><path d="M130 120 C 150 130, 250 130, 270 120 L 270 135 C 250 145, 150 145, 130 135 Z" fill="oklch(0.1 0.02 40)"/><path d="M150 65 C 180 80, 220 80, 250 65" fill="none" stroke="oklch(0.1 0.02 40)" stroke-width="2"/></g>`,
    () => `<g><path d="M110 140 C 130 150, 270 150, 290 140 C 310 130, 280 120, 250 120 C 250 80, 150 80, 150 120 C 120 120, 90 130, 110 140 Z" fill="oklch(0.3 0.02 60)" stroke="oklch(0.15 0.02 60)" stroke-width="2"/><circle cx="200" cy="85" r="4" fill="oklch(0.15 0.02 60)"/></g>`,
    () => `<g><path d="M110 145 C 150 160, 250 160, 290 145 C 310 140, 270 120, 200 120 C 130 120, 90 140, 110 145 Z" fill="oklch(0.1 0.02 240)" stroke="oklch(0.05 0.02 240)" stroke-width="2"/><path d="M125 125 C 110 80, 290 80, 275 125 Z" fill="oklch(0.25 0.05 130)" stroke="oklch(0.15 0.05 130)" stroke-width="2"/><rect x="123" y="115" width="154" height="15" fill="oklch(0.1 0.02 240)" stroke="oklch(0.05 0.02 240)" stroke-width="1"/><circle cx="200" cy="115" r="8" fill="oklch(0.8 0.1 80)" stroke="oklch(0.6 0.1 80)" stroke-width="1"/><path d="M125 122 C 160 132, 240 132, 275 122" fill="none" stroke="oklch(0.8 0.1 80)" stroke-width="2"/></g>`,
    () => `<g><path d="M120 130 C 120 70, 280 70, 280 130 C 290 130, 300 160, 290 200 C 280 230, 270 230, 270 200 L 270 135 L 130 135 L 130 200 C 130 230, 120 230, 110 200 C 100 160, 110 130, 120 130 Z" fill="oklch(0.35 0.03 70)" stroke="oklch(0.2 0.03 70)" stroke-width="2" stroke-linejoin="round"/><path d="M140 135 C 140 100, 260 100, 260 135 Z" fill="oklch(0.25 0.03 70)" stroke="oklch(0.2 0.03 70)" stroke-width="2"/><path d="M140 135 L 260 135" fill="none" stroke="oklch(0.2 0.03 70)" stroke-width="2"/><path d="M160 115 L 240 115 M115 160 L 125 160 M275 160 L 285 160" stroke="oklch(0.2 0.03 70)" stroke-width="1" stroke-dasharray="2 3"/></g>`,
    () => `<path d="M170 80 C 100 80, 80 150, 90 230 C 95 270, 110 320, 150 350 L 150 420 L 250 420 L 250 350 C 290 320, 305 270, 310 230 C 320 150, 300 80, 230 80 Z M 190 100 C 240 100, 270 140, 275 220 C 275 290, 240 330, 190 330 C 140 330, 105 290, 105 220 C 110 140, 140 100, 190 100 Z" fill="oklch(0.18 0.01 40)" stroke="oklch(0.1 0.01 40)" stroke-width="2" fill-rule="evenodd"/>`,
    () => `<g><path d="M125 105 C 160 120, 240 120, 275 105 L 280 135 C 240 150, 160 150, 120 135 Z" fill="oklch(0.9 0.01 90)" stroke="oklch(0.6 0.02 90)" stroke-width="1.5"/><path d="M123 120 C 160 135, 240 135, 277 120" fill="none" stroke="oklch(0.7 0.02 90)" stroke-width="1"/><path d="M220 115 A 8 8 0 0 1 240 125" fill="none" stroke="oklch(0.5 0.15 30)" stroke-width="4" opacity="0.6"/></g>`,
  ];

  const LIBRARY = {
    face: FACE, ears: EARS, hair: HAIR, brows: BROWS,
    eyes: EYES, nose: NOSE, mouth: MOUTH, beard: BEARD,
    scars: SCARS, accessory: ACCESSORY, hats: HATS, mythos: MYTHOS,
  };

  const LABELS = {
    face: { name: 'Овал лица', glyph: 'I' },
    hair: { name: 'Волосы', glyph: 'II' },
    brows: { name: 'Брови', glyph: 'III' },
    eyes: { name: 'Глаза', glyph: 'IV' },
    nose: { name: 'Нос', glyph: 'V' },
    mouth: { name: 'Рот', glyph: 'VI' },
    beard: { name: 'Борода', glyph: 'VII' },
    ears: { name: 'Уши', glyph: 'VIII' },
    scars: { name: 'Особые приметы', glyph: 'IX' },
    accessory: { name: 'Очки / Маски', glyph: 'X' },
    hats: { name: 'Головные уборы', glyph: 'XI' },
    mythos: { name: 'Искажение', glyph: '✷' },
  };

  const CATEGORY_ORDER = ['face', 'hair', 'brows', 'eyes', 'nose', 'mouth', 'beard', 'ears', 'scars', 'accessory', 'hats', 'mythos'];
  const SKIN_TONES = ['#f1c9a5', '#e0b58a', '#c68642', '#8d5524', '#ffdbac', '#d4a373', '#9e7455', '#6b4f3a', '#a8c4a2', '#b9a7d9'];
  const HAIR_COLORS = ['#1a1410', '#3a2418', '#5a3a1f', '#8b6b3a', '#c9a961', '#d9d2c5', '#7a2d2d', '#2d4a3a', '#4a2d6b', '#8a8a8a'];

  const PAPER_SPECKS = Array.from({ length: 40 }, (_, i) => {
    const a = (i * 9301 + 49297) % 233280;
    const b = (i * 49297 + 9301) % 233280;
    return { x: (a / 233280) * 400, y: (b / 233280) * 500, r: 0.4 + ((a + b) % 17) / 12 };
  });

  const THUMB_BOX = {
    face: { x: 95, y: 75, w: 210, h: 360 },
    hair: { x: 95, y: 70, w: 210, h: 180 },
    brows: { x: 120, y: 165, w: 160, h: 50 },
    eyes: { x: 120, y: 185, w: 160, h: 70 },
    nose: { x: 165, y: 215, w: 70, h: 90 },
    mouth: { x: 160, y: 310, w: 80, h: 60 },
    beard: { x: 130, y: 300, w: 140, h: 130 },
    ears: { x: 75, y: 195, w: 250, h: 110 },
    scars: { x: 120, y: 120, w: 160, h: 260 },
    accessory: { x: 95, y: 80, w: 210, h: 180 },
    hats: { x: 70, y: 40, w: 260, h: 220 },
    mythos: { x: 95, y: 80, w: 210, h: 350 },
  };

  function idx(arr, n) {
    return arr[((n % arr.length) + arr.length) % arr.length];
  }

  function hashFace(f) {
    const s = JSON.stringify(f);
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return h;
  }

  function renderFace(face, size) {
    size = size || 320;
    const c = { skin: face.skinTone, hair: face.hairColor };
    const specks = PAPER_SPECKS.map(s =>
      `<circle cx="${s.x}" cy="${s.y}" r="${s.r}" fill="oklch(0.3 0.04 50)"/>`
    ).join('');
    const num = Math.abs(hashFace(face)) % 9000 + 1000;

    let layers = '';
    if (face.mythos === 3) layers += idx(MYTHOS, 3)(c);
    layers += idx(EARS, face.ears)(c);
    layers += idx(FACE, face.face)(c);
    layers += idx(SCARS, face.scars)(c);
    layers += idx(HAIR, face.hair)(c);
    layers += idx(HATS, face.hats)(c);
    layers += idx(BROWS, face.brows)(c);
    layers += idx(EYES, face.eyes)(c);
    layers += idx(NOSE, face.nose)(c);
    layers += idx(MOUTH, face.mouth)(c);
    layers += idx(BEARD, face.beard)(c);
    layers += idx(ACCESSORY, face.accessory)(c);
    if (face.mythos !== 3) layers += idx(MYTHOS, face.mythos)(c);

    return `<svg viewBox="0 0 400 500" width="${size}" height="${size * 1.25}" role="img" aria-label="Фоторобот подозреваемого">
      <rect x="0" y="0" width="400" height="500" fill="oklch(0.84 0.035 85)"/>
      <g opacity="0.12">${specks}</g>
      ${layers}
      <text x="20" y="485" font-family="monospace" font-size="11" fill="oklch(0.35 0.04 50)" opacity="0.7">ARKHAM P.D. · ФОТОРОБОТ</text>
      <text x="380" y="485" font-family="monospace" font-size="11" fill="oklch(0.35 0.04 50)" opacity="0.7" text-anchor="end">№ ${num}</text>
    </svg>`;
  }

  function renderThumb(cat, index, colors) {
    const lib = LIBRARY[cat];
    if (!lib) return '';
    const renderer = idx(lib, index);
    const content = renderer(colors);
    const box = THUMB_BOX[cat] || { x: 130, y: 180, w: 140, h: 160 };
    return `<svg viewBox="${box.x} ${box.y} ${box.w} ${box.h}" class="fr-thumb-svg" preserveAspectRatio="xMidYMid meet">${content}</svg>`;
  }

  const DEFAULT_FACE = {
    face: 0, hair: 0, brows: 0, eyes: 0, nose: 0, mouth: 0,
    beard: 0, ears: 0, scars: 0, accessory: 0, hats: 0, mythos: 0,
    skinTone: '#e0b58a', hairColor: '#3a2418',
  };

  return {
    LIBRARY, LABELS, CATEGORY_ORDER, SKIN_TONES, HAIR_COLORS,
    DEFAULT_FACE, renderFace, renderThumb, hashFace,
  };
})();
