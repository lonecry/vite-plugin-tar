# vite-plugin-tar

A Vite plugin to automatically create tar.gz archives of your build output.

## Features

- 📦 Automatically creates tar.gz archives after build
- 🎨 Customizable archive name and output path
- ⚡ Configurable compression level
- 🛠️ Easy to use with simple configuration

## Installation

```bash
npm install vite-plugin-targz --save-dev
```

## Usage

Add the plugin to your `vite.config.js` or `vite.config.ts`:

```javascript
import { defineConfig } from 'vite'
import vitePluginTargz from 'vite-plugin-targz'

export default defineConfig({
  plugins: [
      vitePluginTargz({
      // Optional configuration
      fileName: 'my-app', // Default: 'dist'
      outputPath: './archives', // Default: build output directory's parent
      folderPath: './custom-build-folder', // Default: vite's build.outDir
      compressionLevel: 9, // Default: 9 (highest)
      enabled: true // Default: true
    })
  ]
})
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `fileName` | `string` | `'dist'` | Name of the tar.gz archive (without extension) |
| `outputPath` | `string` | Parent of build output directory | Directory where the archive will be saved |
| `folderPath` | `string` | Vite's build.outDir | Folder to be archived |
| `compressionLevel` | `number` | `9` | Gzip compression level (1-9) |
| `enabled` | `boolean` | `true` | Whether to enable the plugin |

## License

MIT
