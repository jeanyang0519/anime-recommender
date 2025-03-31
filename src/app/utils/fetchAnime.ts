// utils/fetchAnime.ts
const ANILIST_API = 'https://graphql.anilist.co';

export async function fetchAnimeByGenre(genre: string) {
  const query = `query ($genre: String) {
    Page(perPage: 10) {
      media(genre_in: [$genre], type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        description(asHtml: false)
      }
    }
  }`;

  const response = await fetch(ANILIST_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { genre },
    }),
  });

  const data = await response.json();
  return data.data.Page.media;
}
