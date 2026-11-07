import fs from 'node:fs';
import path from 'node:path';

/** Instant JS redirect for Astro /go/* static stubs (meta refresh can feel sluggish). */
export function patchGoRedirectHtml(rootDir) {
  const goDir = path.join(rootDir, 'go');
  if (!fs.existsSync(goDir)) return 0;

  let patched = 0;
  for (const entry of fs.readdirSync(goDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = path.join(goDir, entry.name, 'index.html');
    if (!fs.existsSync(file)) continue;

    let html = fs.readFileSync(file, 'utf8');
    if (html.includes('data-go-instant')) {
      continue;
    }

    const match = html.match(/content="0;url=([^"]+)"/i);
    if (!match?.[1]) continue;

    const dest = match[1];
    const snippet = `<script data-go-instant>location.replace(${JSON.stringify(dest)})</script>`;
    if (html.includes('<body>')) {
      html = html.replace('<body>', `<body>${snippet}`);
    } else {
      html = `${snippet}${html}`;
    }

    fs.writeFileSync(file, html);
    patched += 1;
  }

  return patched;
}
