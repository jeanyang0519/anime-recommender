const ANILIST_API = "https://graphql.anilist.co";

export async function fetchAnimeBySearch(query: string): Promise<any[]> {
  const gqlQuery = `
    query ($search: String) {
      Page(perPage: 10) {
        media(search: $search, type: ANIME) {
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

  const res = await fetch(ANILIST_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: gqlQuery,
      variables: { search: query }
    })
  });

  const json = await res.json();
  return json.data?.Page?.media || [];
}
