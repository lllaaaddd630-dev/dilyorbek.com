// Audio yuklanish xatoliklarini aniqlash uchun yordamchilar.
// Faqat DEV rejimda console'ga yozadi (production build'da jim).

const MEDIA_ERROR_MESSAGES = {
  1: 'MEDIA_ERR_ABORTED — yuklash foydalanuvchi yoki kod tomonidan to\'xtatildi.',
  2: 'MEDIA_ERR_NETWORK — tarmoq xatoligi. Fayl serverdan yuklanmadi.',
  3: 'MEDIA_ERR_DECODE — fayl buzilgan yoki codec qo\'llab-quvvatlanmaydi.',
  4: 'MEDIA_ERR_SRC_NOT_SUPPORTED — fayl topilmadi yoki brauzer formatni qo\'llab-quvvatlamaydi.',
}

/** audio.error obyektidan o'qiladigan xabar qaytaradi */
export function describeAudioError(audio) {
  if (!audio) return 'Audio element mavjud emas.'
  if (!audio.error) return null
  const code = audio.error.code
  return MEDIA_ERROR_MESSAGES[code] || `Noma'lum media xatoligi (code ${code}).`
}

/** Audio xatoligini console'ga chiqaradi (faqat DEV) */
export function logAudioError({ url, error, audio, context = 'Audio' }) {
  if (!import.meta.env.DEV) return
  const reason = describeAudioError(audio) || error?.message || 'Noma\'lum sabab.'
  console.error(
    `[${context}] Audio failed to load: ${url}\n` +
      `Reason: ${reason}\n` +
      `Hint: Fayl mavjudligini tekshiring → public${url}`
  )
}

/** Brauzer audio supportini tekshiradi */
export function checkAudioSupport() {
  if (typeof document === 'undefined') return { ok: false, reason: 'Audio mavjud emas.' }
  const probe = document.createElement('audio')
  if (typeof probe.canPlayType !== 'function') return { ok: false, reason: 'canPlayType mavjud emas.' }
  return {
    ok: true,
    m4a: probe.canPlayType('audio/mp4; codecs="mp4a.40.2"'),
    mp3: probe.canPlayType('audio/mpeg'),
    wav: probe.canPlayType('audio/wav'),
    ogg: probe.canPlayType('audio/ogg'),
  }
}
