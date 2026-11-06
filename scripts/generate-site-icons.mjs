/**
 * One-off / maintenance: resize public/images/branding/apex-legends-site-icon-source.jpg
 * into favicon + PWA + footer assets under public/.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const src = path.join(root, 'public', 'images', 'branding', 'apex-legends-site-icon-source.jpg');
const outDir = path.join(root, 'public');

export async function generateSiteIcons() {
  const sizes = [16, 32, 180, 192, 512];
  /** @type {Record<number, Buffer>} */
  const buffers = {};

  for (const s of sizes) {
    buffers[s] = await sharp(src)
      .resize(s, s, { fit: 'cover', position: 'centre' })
      .png()
      .toBuffer();
  }

  await fs.promises.writeFile(path.join(outDir, 'favicon-16.png'), buffers[16]);
  await fs.promises.writeFile(path.join(outDir, 'favicon-32.png'), buffers[32]);
  await fs.promises.writeFile(path.join(outDir, 'apple-touch-icon.png'), buffers[180]);
  await fs.promises.writeFile(path.join(outDir, 'logo-192.png'), buffers[192]);
  await fs.promises.writeFile(path.join(outDir, 'logo-512.png'), buffers[512]);
  await fs.promises.writeFile(path.join(outDir, 'logo.png'), buffers[192]);

  /** ICO with embedded PNG images */
  function buildIco(pngBuffers) {
    const reserved = Buffer.alloc(2);
    reserved.writeUInt16LE(0, 0);
    const type = Buffer.alloc(2);
    type.writeUInt16LE(1, 0);
    const count = Buffer.alloc(2);
    count.writeUInt16LE(pngBuffers.length, 0);
    const headerSize = 6 + pngBuffers.length * 16;
    const entries = [];
    let offset = headerSize;
    const dimensions = [16, 32];
    for (let i = 0; i < pngBuffers.length; i++) {
      const png = pngBuffers[i];
      const w = dimensions[i];
      const entry = Buffer.alloc(16);
      entry[0] = w;
      entry[1] = w;
      entry[2] = 0;
      entry[3] = 0;
      entry.writeUInt16LE(1, 4);
      entry.writeUInt16LE(32, 6);
      entry.writeUInt32LE(png.length, 8);
      entry.writeUInt32LE(offset, 12);
      entries.push(entry);
      offset += png.length;
    }
    return Buffer.concat([reserved, type, count, ...entries, ...pngBuffers]);
  }

  const icoBuf = buildIco([buffers[16], buffers[32]]);
  await fs.promises.writeFile(path.join(outDir, 'favicon.ico'), icoBuf);

  console.log('Generated: favicon-16.png, favicon-32.png, favicon.ico, apple-touch-icon.png, logo.png, logo-192.png, logo-512.png');
}

const isMain =
  typeof process.argv[1] === 'string' &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  generateSiteIcons().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
