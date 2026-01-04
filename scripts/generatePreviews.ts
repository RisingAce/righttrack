/**
 * Preview generator
 * -----------------
 * Usage:
 *   npm install
 *   npm run gen:previews
 *
 * What it does:
 * - Reads exercises from src/data/exercises.ts
 * - Renders 512x512 looping GIFs (and PNG thumb) into public/previews/
 * - Styles: dark premium card, subtle glows, stick-figure + equipment animation
 *
 * Notes:
 * - Adjust FRAME_COUNT / FRAME_DELAY_MS to tweak smoothness
 * - Unknown poses fall back to a generic pulsing preview
 * - Uses @napi-rs/canvas + gif-encoder-2 (Node 18+)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import GIFEncoder from 'gif-encoder-2'
import { createCanvas } from '@napi-rs/canvas'
import { exercises } from '../src/data/exercises.ts'

type Pose =
  | 'bench'
  | 'squat'
  | 'deadlift'
  | 'pulldown'
  | 'ohp'
  | 'row'
  | 'generic'

type ExercisePreview = {
  name: string
  pose: Pose
  accent?: 'blue' | 'green' | 'yellow'
  notes?: string
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const WIDTH = 512
const HEIGHT = 512
const FRAME_COUNT = 20
const FRAME_DELAY_MS = 70
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'previews')

const brand = {
  bgTop: '#060812',
  bgBottom: '#0a0e1c',
  card: 'rgba(14,19,36,0.78)',
  cardBorder: 'rgba(231,236,255,0.14)',
  cardInner: 'rgba(255,255,255,0.04)',
  glowBlue: 'rgba(96,165,250,0.18)',
  glowGreen: 'rgba(52,211,153,0.18)',
  text: '#e5e7eb',
  textMuted: '#9ca3af',
  textSubtle: '#6b7280',
  accent: '#6ee7b7',
  accent2: '#60a5fa',
}

type Context2D = ReturnType<typeof createCanvas>['getContext'] extends () => infer T ? T : never

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const ensureOutputDir = () => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }
}

const renderBackground = (ctx: any) => {
  const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT)
  grad.addColorStop(0, brand.bgTop)
  grad.addColorStop(1, brand.bgBottom)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  const radial = ctx.createRadialGradient(WIDTH * 0.15, HEIGHT * 0.05, 20, WIDTH * 0.15, HEIGHT * 0.05, 260)
  radial.addColorStop(0, brand.glowBlue)
  radial.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = radial
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  const radial2 = ctx.createRadialGradient(WIDTH * 0.9, HEIGHT * 0.1, 20, WIDTH * 0.9, HEIGHT * 0.1, 220)
  radial2.addColorStop(0, brand.glowGreen)
  radial2.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = radial2
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
}

const renderCard = (ctx: any) => {
  const m = 36
  const w = WIDTH - m * 2
  const h = HEIGHT - m * 2
  const r = 18

  ctx.fillStyle = brand.card
  ctx.strokeStyle = brand.cardBorder
  ctx.lineWidth = 2
  ctx.beginPath()
  roundRect(ctx, m, m, w, h, r)
  ctx.fill()
  ctx.stroke()

  ctx.save()
  ctx.shadowColor = brand.glowBlue
  ctx.shadowBlur = 24
  ctx.strokeStyle = brand.cardInner
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.restore()
}

const renderText = (ctx: any, name: string) => {
  ctx.fillStyle = brand.text
  ctx.font = 'bold 28px "DejaVu Sans", system-ui, sans-serif'
  const maxWidth = WIDTH - 72
  const fitName = fitText(ctx, name, maxWidth)
  ctx.fillText(fitName, 52, 76)

  ctx.fillStyle = brand.textMuted
  ctx.font = '18px "DejaVu Sans", system-ui, sans-serif'
  ctx.fillText('preview', 52, 104)

  ctx.fillStyle = brand.textSubtle
  ctx.font = '18px "DejaVu Sans", system-ui, sans-serif'
  ctx.fillText('Tap to view: technique preview', 52, HEIGHT - 52)
}

const poseRenderers: Record<Pose, (ctx: any, t: number, accent: string) => void> = {
  bench: renderBench,
  squat: renderSquat,
  deadlift: renderDeadlift,
  pulldown: renderPulldown,
  ohp: renderOHP,
  row: renderRow,
  generic: renderGeneric,
}

function renderBench(ctx: any, t: number, accent: string) {
  const phase = Math.sin(t * Math.PI * 2)
  const midY = HEIGHT * 0.6
  const barY = midY + phase * 8

  drawBench(ctx)
  drawRack(ctx)

  ctx.strokeStyle = accent
  ctx.lineWidth = 6
  line(ctx, WIDTH * 0.3, barY, WIDTH * 0.7, barY)
  joint(ctx, WIDTH * 0.3, barY, accent)
  joint(ctx, WIDTH * 0.7, barY, accent)

  const shoulderY = midY - 40
  line(ctx, WIDTH * 0.4, shoulderY, WIDTH * 0.6, shoulderY)
  joint(ctx, WIDTH * 0.4, shoulderY, accent)
  joint(ctx, WIDTH * 0.6, shoulderY, accent)

  drawArm(ctx, WIDTH * 0.4, shoulderY, WIDTH * 0.3, barY, accent, phase)
  drawArm(ctx, WIDTH * 0.6, shoulderY, WIDTH * 0.7, barY, accent, -phase)

  drawStickLower(ctx, WIDTH * 0.5, midY + 30, phase, accent)
}

function renderSquat(ctx: any, t: number, accent: string) {
  const phase = Math.sin(t * Math.PI * 2)
  const baseY = HEIGHT * 0.65 + phase * 12
  const shoulderY = baseY - 60

  line(ctx, WIDTH * 0.3, shoulderY, WIDTH * 0.7, shoulderY, accent, 6)
  drawRack(ctx)

  drawArm(ctx, WIDTH * 0.4, shoulderY, WIDTH * 0.35, shoulderY + 10, accent, phase)
  drawArm(ctx, WIDTH * 0.6, shoulderY, WIDTH * 0.65, shoulderY + 10, accent, -phase)

  drawStickLower(ctx, WIDTH * 0.5, baseY, phase, accent, true)
}

function renderDeadlift(ctx: any, t: number, accent: string) {
  const phase = Math.sin(t * Math.PI * 2)
  const hipY = HEIGHT * 0.6 + phase * 6
  const barY = HEIGHT * 0.75 - phase * 8

  line(ctx, WIDTH * 0.25, barY, WIDTH * 0.75, barY, accent, 6)
  joint(ctx, WIDTH * 0.25, barY, accent)
  joint(ctx, WIDTH * 0.75, barY, accent)

  drawArm(ctx, WIDTH * 0.45, hipY - 20, WIDTH * 0.45, barY, accent, phase, true)
  drawArm(ctx, WIDTH * 0.55, hipY - 20, WIDTH * 0.55, barY, accent, -phase, true)

  drawStickLower(ctx, WIDTH * 0.5, hipY + 10, phase, accent, false, true)
  line(ctx, WIDTH * 0.2, HEIGHT * 0.78, WIDTH * 0.8, HEIGHT * 0.78, '#0f172a', 8)
}

function renderPulldown(ctx: any, t: number, accent: string) {
  const phase = Math.sin(t * Math.PI * 2)
  const topY = HEIGHT * 0.22
  const barY = HEIGHT * 0.35 + phase * 12

  line(ctx, WIDTH * 0.5, topY, WIDTH * 0.5, barY, accent, 2)
  line(ctx, WIDTH * 0.35, barY, WIDTH * 0.65, barY, accent, 5)
  joint(ctx, WIDTH * 0.35, barY, accent)
  joint(ctx, WIDTH * 0.65, barY, accent)

  drawArm(ctx, WIDTH * 0.45, barY, WIDTH * 0.45, HEIGHT * 0.5, accent, -phase)
  drawArm(ctx, WIDTH * 0.55, barY, WIDTH * 0.55, HEIGHT * 0.5, accent, phase)

  drawStickLower(ctx, WIDTH * 0.5, HEIGHT * 0.55, phase, accent, false, true)
  line(ctx, WIDTH * 0.3, HEIGHT * 0.65, WIDTH * 0.7, HEIGHT * 0.65, '#0f172a', 10)
}

function renderOHP(ctx: any, t: number, accent: string) {
  const phase = Math.sin(t * Math.PI * 2)
  const barY = HEIGHT * 0.35 - phase * 10

  line(ctx, WIDTH * 0.35, barY, WIDTH * 0.65, barY, accent, 5)
  drawArm(ctx, WIDTH * 0.45, HEIGHT * 0.5, WIDTH * 0.45, barY, accent, phase)
  drawArm(ctx, WIDTH * 0.55, HEIGHT * 0.5, WIDTH * 0.55, barY, accent, -phase)
  line(ctx, WIDTH * 0.45, HEIGHT * 0.5, WIDTH * 0.55, HEIGHT * 0.5, accent, 4)
  drawStickLower(ctx, WIDTH * 0.5, HEIGHT * 0.6, phase, accent, true)
}

function renderRow(ctx: any, t: number, accent: string) {
  const phase = Math.sin(t * Math.PI * 2)
  const handleY = HEIGHT * 0.55 - phase * 10

  line(ctx, WIDTH * 0.3, handleY, WIDTH * 0.7, handleY, accent, 4)
  drawArm(ctx, WIDTH * 0.45, HEIGHT * 0.55, WIDTH * 0.45, handleY, accent, phase)
  drawArm(ctx, WIDTH * 0.55, HEIGHT * 0.55, WIDTH * 0.55, handleY, accent, -phase)
  drawStickLower(ctx, WIDTH * 0.5, HEIGHT * 0.6 + phase * 4, phase, accent, false, true)
  line(ctx, WIDTH * 0.25, HEIGHT * 0.62, WIDTH * 0.75, HEIGHT * 0.62, '#0f172a', 8)
}

function renderGeneric(ctx: any, t: number, accent: string) {
  const phase = Math.sin(t * Math.PI * 2)
  ctx.save()
  ctx.translate(WIDTH / 2, HEIGHT / 2)
  ctx.scale(1 + phase * 0.05, 1 + phase * 0.05)
  ctx.fillStyle = accent
  ctx.beginPath()
  ctx.arc(0, 0, 32, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function drawBench(ctx: any) {
  ctx.fillStyle = '#0f172a'
  roundRect(ctx, WIDTH * 0.25, HEIGHT * 0.55, WIDTH * 0.5, 14, 6)
  ctx.fill()
  line(ctx, WIDTH * 0.25, HEIGHT * 0.62, WIDTH * 0.3, HEIGHT * 0.62, '#111827', 4)
  line(ctx, WIDTH * 0.7, HEIGHT * 0.62, WIDTH * 0.75, HEIGHT * 0.62, '#111827', 4)
}

function drawRack(ctx: any) {
  line(ctx, WIDTH * 0.28, HEIGHT * 0.4, WIDTH * 0.28, HEIGHT * 0.62, '#111827', 3)
  line(ctx, WIDTH * 0.72, HEIGHT * 0.4, WIDTH * 0.72, HEIGHT * 0.62, '#111827', 3)
}

function drawArm(ctx: any, sx: number, sy: number, hx: number, hy: number, color: string, phase: number, straight = false) {
  const elbowX = (sx + hx) / 2 + (straight ? 0 : phase * 6)
  const elbowY = (sy + hy) / 2 + (straight ? 0 : 6)
  line(ctx, sx, sy, elbowX, elbowY, color, 4)
  joint(ctx, elbowX, elbowY, color)
  line(ctx, elbowX, elbowY, hx, hy, color, 4)
  joint(ctx, hx, hy, color)
}

function drawStickLower(ctx: any, hipX: number, hipY: number, phase: number, color: string, stanceWide = false, hinge = false) {
  const hipShiftY = hinge ? phase * 6 : 0
  const kneeOffset = stanceWide ? 32 : 24
  const footOffset = stanceWide ? 42 : 32
  const kneeY = hipY + 30 + hipShiftY
  const footY = hipY + 70 + hipShiftY

  line(ctx, hipX, hipY, hipX - kneeOffset, kneeY, color, 4)
  joint(ctx, hipX - kneeOffset, kneeY, color)
  line(ctx, hipX - kneeOffset, kneeY, hipX - footOffset, footY, color, 4)
  joint(ctx, hipX - footOffset, footY, color)

  line(ctx, hipX, hipY, hipX + kneeOffset, kneeY, color, 4)
  joint(ctx, hipX + kneeOffset, kneeY, color)
  line(ctx, hipX + kneeOffset, kneeY, hipX + footOffset, footY, color, 4)
  joint(ctx, hipX + footOffset, footY, color)
}

function line(ctx: any, x1: number, y1: number, x2: number, y2: number, color = brand.text, width = 3) {
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

function joint(ctx: any, x: number, y: number, color = brand.accent) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, 5, 0, Math.PI * 2)
  ctx.fill()
}

function roundRect(ctx: any, x: number, y: number, w: number, h: number, r: number) {
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function fitText(ctx: any, text: string, maxWidth: number) {
  if (ctx.measureText(text).width <= maxWidth) return text
  let truncated = text
  while (ctx.measureText(truncated + '…').width > maxWidth && truncated.length > 0) {
    truncated = truncated.slice(0, -1)
  }
  return truncated + '…'
}

async function renderExercise(ex: ExercisePreview) {
  const slug = slugify(ex.name)
  const gifPath = path.join(OUTPUT_DIR, `${slug}.gif`)
  const pngPath = path.join(OUTPUT_DIR, `${slug}.png`)
  const pose = poseRenderers[ex.pose] ? ex.pose : 'generic'
  const accent = ex.accent === 'yellow' ? '#facc15' : ex.accent === 'green' ? '#34d399' : brand.accent2

  const encoder = new GIFEncoder(WIDTH, HEIGHT)
  encoder.setRepeat(0)
  encoder.setDelay(FRAME_DELAY_MS)
  encoder.setQuality(12)

  const gifStream = fs.createWriteStream(gifPath)
  encoder.createReadStream().pipe(gifStream)
  encoder.start()

  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext('2d')

  for (let i = 0; i < FRAME_COUNT; i++) {
    const t = i / FRAME_COUNT
    renderBackground(ctx)
    renderCard(ctx)
    renderText(ctx, ex.name)
    poseRenderers[pose](ctx, t, accent)
    encoder.addFrame(ctx)

    if (i === 0) {
      const buf = canvas.toBuffer('image/png')
      fs.writeFileSync(pngPath, buf)
    }
  }

  encoder.finish()
  await streamToPromise(gifStream)
  console.log(`Generated ${gifPath}`)
}

const streamToPromise = (writable: NodeJS.WritableStream) =>
  new Promise<void>((resolve, reject) => {
    writable.on('finish', () => resolve())
    writable.on('error', reject)
  })

async function main() {
  ensureOutputDir()
  for (const ex of exercises) {
    await renderExercise(ex)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
