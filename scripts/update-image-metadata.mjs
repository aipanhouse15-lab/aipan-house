import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Read original JPEG/PNG/SVG dimensions without installing an image-processing dependency.
export function readImageSize(file) {
  const buffer = fs.readFileSync(file)
  if (/\.svg$/i.test(file)) {
    const svg = buffer.toString('utf8')
    const viewBox = svg.match(/\bviewBox=["']\s*([-\d.]+)[ ,]+([-\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)\s*["']/)
    const width = svg.match(/\bwidth=["']([\d.]+)(?:px)?["']/)
    const height = svg.match(/\bheight=["']([\d.]+)(?:px)?["']/)
    if (width && height) return { width: Number(width[1]), height: Number(height[1]) }
    if (viewBox) return { width: Number(viewBox[3]), height: Number(viewBox[4]) }
  } else if (buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
  } else if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    const frames = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf])
    let offset = 2
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) break
      while (buffer[offset] === 0xff) offset++
      const marker = buffer[offset++]
      if (marker === 0xd9 || marker === 0xda) break
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue
      if (offset + 2 > buffer.length) break
      const length = buffer.readUInt16BE(offset)
      if (frames.has(marker) && offset + 7 <= buffer.length) {
        return { width: buffer.readUInt16BE(offset + 5), height: buffer.readUInt16BE(offset + 3) }
      }
      if (length < 2) break
      offset += length
    }
  }
  throw new Error(`Cannot read image dimensions: ${file}`)
}

export function collectImageMetadata(root = process.cwd()) {
  const directory = path.join(root, 'public/images')
  return Object.fromEntries(fs.readdirSync(directory)
    .filter((name) => /\.(jpe?g|png|svg)$/i.test(name)).sort()
    .map((name) => [`/images/${name}`, readImageSize(path.join(directory, name))]))
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const metadata = collectImageMetadata()
  fs.writeFileSync('src/lib/image-metadata.json', JSON.stringify(metadata, null, 2) + '\n')
  console.log(`Recorded original dimensions for ${Object.keys(metadata).length} images.`)
}
