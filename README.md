# apex-legends-cheats

This site is built with [Astro](https://astro.build/) 7.

## Requirements

- **Node.js** `>= 22.12.0` (see `package.json` → `engines`)

## Install

From the project root:

```powershell
npm install
```

If `npm install` fails with **`UNABLE_TO_VERIFY_LEAF_SIGNATURE`**, Node may not trust your system certificate store. Retry in the same PowerShell session:

```powershell
$env:NODE_OPTIONS = "--use-system-ca"
npm install
```

If you see **`EPERM`** errors under `node_modules` while the folder lives under **OneDrive**, sync/locks can block npm. Move the repo to a non-synced path (for example `C:\dev\...`) or pause OneDrive sync during install.

## Run (localhost)

```powershell
npm run dev
```

Open the URL Astro prints (often **http://127.0.0.1:4321/**). If that port is busy, Astro picks the next one (for example **4322**).

Optional: bind explicitly:

```powershell
npm run dev -- --host 127.0.0.1 --port 4321
```

## Production preview (after build)

```powershell
npm run build
npm run preview
```

`preview` serves the built site (see `package.json` scripts).
