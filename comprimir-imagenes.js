const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = './imagenes';
const files = fs.readdirSync(dir);

let totalAntes = 0;
let totalDespues = 0;

async function comprimir() {
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const ruta = path.join(dir, file);
    const stats = fs.statSync(ruta);
    const sizeAntes = stats.size;
    totalAntes += sizeAntes;

    const tmp = ruta + '.tmp';

    try {
      if (ext === '.png') {
        await sharp(ruta)
          .png({ compressionLevel: 9, effort: 10 })
          .toFile(tmp);
      } else {
        await sharp(ruta)
          .jpeg({ quality: 75, mozjpeg: true })
          .toFile(tmp);
      }

      const sizeDespues = fs.statSync(tmp).size;
      // Solo reemplazar si el resultado es más pequeño
      if (sizeDespues < sizeAntes) {
        fs.renameSync(tmp, ruta);
        totalDespues += sizeDespues;
        const ahorro = ((1 - sizeDespues / sizeAntes) * 100).toFixed(0);
        console.log(`✓ ${file}: ${(sizeAntes/1024).toFixed(0)}KB → ${(sizeDespues/1024).toFixed(0)}KB (-${ahorro}%)`);
      } else {
        fs.unlinkSync(tmp);
        totalDespues += sizeAntes;
        console.log(`- ${file}: sin cambio (ya optimizado)`);
      }
    } catch (e) {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
      totalDespues += sizeAntes;
      console.log(`✗ ${file}: error - ${e.message}`);
    }
  }

  const ahorro = ((1 - totalDespues / totalAntes) * 100).toFixed(1);
  console.log(`\nTotal: ${(totalAntes/1024/1024).toFixed(1)}MB → ${(totalDespues/1024/1024).toFixed(1)}MB (-${ahorro}%)`);
}

comprimir();
