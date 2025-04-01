'use client';

import { useState } from 'react';

export default function Home() {
  const [genre, setGenre] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    console.log('Searching for:', genre);
    try {
      const res = await fetch(`/api/search?genre=${genre}`);
      const data = await res.json();
  
      if (!res.ok) {
        console.error('API returned error:', data);
        return;
      }
  
      console.log('Fetched data:', data);
      setResults(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };
  

  return (
    <div className="p-6">
      <input
        className="border p-2 mr-2"
        placeholder="Enter genre (e.g. Action)"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSearch}>
        Search
      </button>

      <div className="mt-6 grid gap-4">
        {results.map((anime: any) => (
          <div key={anime.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{anime.title.romaji}</h2>
            <img src={anime.coverImage.large} alt={anime.title.romaji} className="w-32" />
            <p className="text-sm">{anime.description?.slice(0, 200)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
