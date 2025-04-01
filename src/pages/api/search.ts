import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchAnimeByGenre } from '../../utils/fetchAnime';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { genre } = req.query;

  if (!genre || typeof genre !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid genre parameter' });
  }

  try {
    const anime = await fetchAnimeByGenre(genre);
    res.status(200).json(anime);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch anime' });
  }
}
