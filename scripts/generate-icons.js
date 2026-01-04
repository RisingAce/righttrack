import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6ee7b7;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#34d399;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="#0f172a"/>
  <path d="M128 256 L205 333 L384 154" stroke="url(#grad)" stroke-width="48" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const sizes = [192, 512];

async function generateIcons() {
  const svgBuffer = Buffer.from(svgIcon);
  
  for (const size of sizes) {
    const outputPath = join(__dirname, '..', 'public', `pwa-${size}x${size}.png`);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`Generated ${outputPath}`);
  }
  
  // Apple touch icon
  const applePath = join(__dirname, '..', 'public', 'apple-touch-icon.png');
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(applePath);
  console.log(`Generated ${applePath}`);
}

generateIcons().catch(console.error);
