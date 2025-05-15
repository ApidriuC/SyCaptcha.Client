import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function printTree(dir, prefix = '') {
    const files = fs.readdirSync(dir);
    files.forEach((file, index) => {
        const isLast = index === files.length - 1;
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        console.log(`${prefix}${isLast ? '└──' : '├──'} ${file}`);
        if (stats.isDirectory()) {
            printTree(filePath, `${prefix}${isLast ? '    ' : '│   '}`);
        }
    });
}

const libPath = path.join(__dirname, 'lib');

if (fs.existsSync(libPath)) {
    console.log('Estructura de /lib:\n');
    printTree(libPath);
} else console.log('La carpeta /lib no existe. Asegúrate de haber hecho el build.');
