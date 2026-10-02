// Markazlashtirilgan media path boshqaruvi.
// Vite `public/` papkasi uchun absolute path ishlatiladi: /media/...
// HECH QACHON "/public/media/..." yoki "./public/media/..." yozmang!

export const MEDIA_BASE = '/media'

/** Fayl nomidan to'liq public path yasaydi */
export function mediaPath(file) {
  if (!file) return ''
  if (file.startsWith(`${MEDIA_BASE}/`)) return file
  if (file.startsWith(`/public${MEDIA_BASE}/`)) return file.replace(`/public${MEDIA_BASE}/`, `${MEDIA_BASE}/`)
  if (file.startsWith(`./public${MEDIA_BASE}/`)) return file.replace(`./public${MEDIA_BASE}/`, `${MEDIA_BASE}/`)
  if (file.startsWith(`public${MEDIA_BASE}/`)) return `/${file}`
  if (!file.startsWith('/')) return `${MEDIA_BASE}/${file}`
  return file
}

/** Audio fayl uchun public path */
export function songPath(file) {
  return mediaPath(file)
}

/** Rasm fayl uchun public path */
export function imagePath(file) {
  return mediaPath(file)
}

/** Dev rejimda media holatini console'ga chiqaradi */
export function logMediaDiagnostics() {
  if (!import.meta.env.DEV) return
  console.groupCollapsed('[Media] Base path:', MEDIA_BASE)
  console.log('Audio URLlari /media/song_N.m4a formatida bo\'lishi kerak.')
  console.log('Rasm URLi /media/dilyorbek.jpg formatida bo\'lishi kerak.')
  console.log('Fayllar joylashuvi: public/media/')
  console.groupEnd()
}
