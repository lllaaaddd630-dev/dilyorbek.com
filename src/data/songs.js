import { songPath } from '../config/media'

/**
 * 🎵 QO'SHIQ QO'SHISH:
 *   1) faylni public/media/ ichiga tashlang (song_4.m4a, song_5.m4a ...)
 *   2) quyidagi massivga yangi obyekt qo'shing.
 *
 * `src` maydoni avtomatik /media/... formatiga keltiriladi.
 */

/** Fayl nomidan fallback title yasaydi: "song_4.m4a" -> "Song 4" */
export function deriveTitleFromFile(file) {
  if (!file) return 'Unknown Song'
  const base = file.split('/').pop().replace(/\.[^.]+$/, '')
  const numbered = base.match(/^song[_\-\s]*(\d+)$/i)
  if (numbered) return `Song ${numbered[1]}`
  return base.replace(/[_\-]+/g, ' ').replace(/\s+/g, ' ').trim().replace(/\b\w/g, character => character.toUpperCase())
}

const RAW_SONGS = [
  { id: 1, title: 'SHOXRUX - CHILPARCHIN', artist: 'Dilyorbek’s favorites', file: 'song_1.m4a' },
  { id: 2, title: 'JAHONGIR OTAJONOV - SOGINDIM', artist: 'Dilyorbek’s favorites', file: 'song_2.m4a' },
  { id: 3, title: 'TOHIR SODIQOV - SOGINDIM', artist: 'Dilyorbek’s favorites', file: 'song_3.m4a' },
]

/** To'liq normalizatsiya qilingan songs ro'yxati */
export const songs = RAW_SONGS.map(song => {
  const src = songPath(song.file || song.src || song.audio)
  return {
    id: song.id,
    title: song.title || deriveTitleFromFile(song.file || src),
    artist: song.artist || 'Dilyorbek',
    src,
  }
})

export default songs
