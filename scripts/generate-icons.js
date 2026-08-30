import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Crisp SVG definition
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#090e1a" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22c55e" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
    </linearGradient>
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Background Squircle -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />
  <rect x="8" y="8" width="496" height="496" rx="104" fill="none" stroke="#1e293b" stroke-width="6" />

  <!-- Background Tech Grid Lines -->
  <g opacity="0.12" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 6">
    <line x1="80" y1="160" x2="432" y2="160" />
    <line x1="80" y1="256" x2="432" y2="256" />
    <line x1="80" y1="352" x2="432" y2="352" />
    <line x1="160" y1="80" x2="160" y2="432" />
    <line x1="256" y1="80" x2="256" y2="432" />
    <line x1="352" y1="80" x2="352" y2="432" />
  </g>

  <!-- Glow effect -->
  <circle cx="256" cy="256" r="150" fill="url(#glowGrad)" />

  <!-- Stylized "S" Matrix Route Pathway -->
  <g filter="url(#neonGlow)">
    <!-- Top Arc of S -->
    <path d="M 360 160 C 360 115 152 115 152 210 C 152 290 360 260 360 340 C 360 415 152 415 152 370" 
          fill="none" 
          stroke="url(#primaryGrad)" 
          stroke-width="36" 
          stroke-linecap="round" 
          stroke-linejoin="round" />
    
    <!-- Route Waypoints -->
    <circle cx="360" cy="160" r="14" fill="#38bdf8" />
    <circle cx="256" cy="235" r="12" fill="#60a5fa" />
    <circle cx="152" cy="370" r="14" fill="#38bdf8" />
  </g>

  <!-- Live Status Beacon -->
  <g transform="translate(380, 100)">
    <circle cx="0" cy="0" r="18" fill="#0f172a" stroke="#1e293b" stroke-width="4" />
    <circle cx="0" cy="0" r="9" fill="url(#accentGrad)" />
  </g>

  <!-- SAFA Branding Badge in Bottom Right -->
  <g transform="translate(256, 442)">
    <rect x="-65" y="-16" width="130" height="32" rx="16" fill="#0f172a" stroke="#334155" stroke-width="2" />
    <text x="0" y="5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" fill="#38bdf8" letter-spacing="3" text-anchor="middle">SAFA</text>
  </g>
</svg>`;

// Maskable version with safe-zone padding
const maskableSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#090e1a" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>
    <linearGradient id="primaryGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
    <linearGradient id="glowGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
    </linearGradient>
    <filter id="neonGlow2" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Full background for maskable -->
  <rect width="512" height="512" fill="url(#bgGrad2)" />

  <g transform="translate(256, 256) scale(0.8) translate(-256, -256)">
    <!-- Tech Grid -->
    <g opacity="0.15" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 6">
      <line x1="80" y1="160" x2="432" y2="160" />
      <line x1="80" y1="256" x2="432" y2="256" />
      <line x1="80" y1="352" x2="432" y2="352" />
      <line x1="160" y1="80" x2="160" y2="432" />
      <line x1="256" y1="80" x2="256" y2="432" />
      <line x1="352" y1="80" x2="352" y2="432" />
    </g>

    <circle cx="256" cy="256" r="140" fill="url(#glowGrad2)" />

    <!-- Stylized S -->
    <g filter="url(#neonGlow2)">
      <path d="M 360 160 C 360 115 152 115 152 210 C 152 290 360 260 360 340 C 360 415 152 415 152 370" 
            fill="none" 
            stroke="url(#primaryGrad2)" 
            stroke-width="40" 
            stroke-linecap="round" 
            stroke-linejoin="round" />
      <circle cx="360" cy="160" r="16" fill="#38bdf8" />
      <circle cx="256" cy="235" r="14" fill="#60a5fa" />
      <circle cx="152" cy="370" r="16" fill="#38bdf8" />
    </g>

    <circle cx="380" cy="110" r="12" fill="#22c55e" />
  </g>
</svg>`;

async function generate() {
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);

  const svgBuffer = Buffer.from(svgContent);
  const maskableBuffer = Buffer.from(maskableSvgContent);

  // 192x192 PNG
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  // 512x512 PNG
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  // Apple Touch Icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // Maskable 192
  await sharp(maskableBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-maskable-192.png'));

  // Maskable 512
  await sharp(maskableBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-maskable-512.png'));

  console.log('All PWA icon assets generated successfully!');
}

generate().catch(console.error);
