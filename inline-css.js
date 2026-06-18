import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const htmlPath = path.join(distDir, 'index.html');

try {
  if (fs.existsSync(htmlPath)) {
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Find the CSS file link tag
    const cssLinkRegex = /<link\s+rel="stylesheet"\s+crossorigin\s+href="\/assets\/([a-zA-Z0-9_-]+\.css)">/;
    const match = htmlContent.match(cssLinkRegex);

    if (match) {
      const cssFileName = match[1];
      const cssFilePath = path.join(distDir, 'assets', cssFileName);

      if (fs.existsSync(cssFilePath)) {
        const cssContent = fs.readFileSync(cssFilePath, 'utf8');

        // Replace link tag with style tag
        htmlContent = htmlContent.replace(cssLinkRegex, `<style>${cssContent}</style>`);
        fs.writeFileSync(htmlPath, htmlContent, 'utf8');

        console.log(`Successfully inlined CSS: ${cssFileName}`);

        // Delete the original CSS file to prevent network request
        fs.unlinkSync(cssFilePath);
        console.log(`Deleted stylesheet asset: ${cssFileName}`);
      } else {
        console.warn(`CSS file not found at path: ${cssFilePath}`);
      }
    } else {
      console.warn('No CSS link tag found in index.html matching style definition pattern.');
    }
  } else {
    console.warn(`dist/index.html not found at path: ${htmlPath}`);
  }
} catch (error) {
  console.error('Failed to inline CSS:', error);
}
