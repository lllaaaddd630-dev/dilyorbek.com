Add your local media files here:

- dilyorbek.jpg — profile portrait
- song_1.m4a, song_2.m4a, song_3.m4a — the first three tracks
- song_4.m4a, song_5.m4a, ... — further tracks

Paths are never written by hand: `src/config/media.js` builds every `/media/...` URL, so only the file name goes here and in `src/data/songs.js`. Add one entry per track in `RAW_SONGS`:

    { id: 4, title: 'Yangi qo‘shiq', artist: 'Dilyorbek', file: 'song_4.m4a' }

If `title` is omitted, a fallback is derived from the file name (`song_4.m4a` → `Song 4`).

No remote image or audio URLs are used. The site works without these files: it shows a gradient avatar fallback, and the player surfaces a media error naming the missing path.
