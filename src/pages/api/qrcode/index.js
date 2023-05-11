import { generateQrCode } from '@/src/backend/services/qrcode.js'

export default async function qrcode(req, res) {
  const teste = await generateQrCode()
  res.status(200).json(teste)
}