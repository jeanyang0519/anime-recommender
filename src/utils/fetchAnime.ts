const ANILIST_API = "https://graphql.anilist.co";

export async function fetchAnimeByGenres(genres: string[]): Promise<any[]> {
  const query = `
    query ($genres: [String]) {
      Page(perPage: 10) {
        media(genre_in: $genres, type: ANIME, sort: POPULARITY_DESC) {
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
    }
  `;

  const response = await fetch(ANILIST_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { genres }
    })
  });

  const json = await response.json();
  return json.data?.Page?.media || [];
}
