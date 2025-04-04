"use client";

import Link from "next/link";
import { jeansList } from "../../data/jeansList";
import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";


export default function EliteFullList() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [showTierDropdown, setShowTierDropdown] = useState(false);
const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

const tierRef = useRef<HTMLDivElement>(null);
const categoryRef = useRef<HTMLDivElement>(null);


useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      tierRef.current &&
      !tierRef.current.contains(event.target as Node)
    ) {
      setShowTierDropdown(false);
    }
    if (
      categoryRef.current &&
      !categoryRef.current.contains(event.target as Node)
    ) {
      setShowCategoryDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <div className="min-h-screen p-8 text-center flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold">📚 Jean’s Anime List</h1>
      <p className="text-lg mb-8">Curated with love and care </p>
      <div className="flex flex-wrap justify-start items-center gap-4 mb-4 w-full max-w-6xl px-6">
  {/* Tier Filter */}
  <div className="relative" ref={tierRef}>
    <button
      onClick={() => setShowTierDropdown(prev => !prev)}
      className="btn-yellow text-sm px-4 py-2 flex items-center gap-2"
    >
      Tier {selectedTiers.length > 0 && `(${selectedTiers.length})`}
      <ChevronDownIcon
        className={`w-4 h-4 transition-transform ${
          showTierDropdown ? "rotate-180" : ""
        }`}
      />
    </button>
    {showTierDropdown && (
      <div className="absolute z-10 mt-2 bg-white text-black rounded shadow-md p-2 w-40">
        {[...new Set(jeansList.map(a => a.tier).filter(Boolean))].map((tier, i) => (
          <label key={i} className="block text-sm">
            <input
              type="checkbox"
              value={tier}
              checked={selectedTiers.includes(tier)}
              onChange={(e) => {
                const checked = e.target.checked;
                setSelectedTiers(prev =>
                  checked ? [...prev, tier] : prev.filter(t => t !== tier)
                );
              }}
              className="mr-2"
            />
            {tier}
          </label>
        ))}
      </div>
    )}
  </div>

  {/* Category Filter */}
  <div className="relative" ref={categoryRef}>
    <button
      onClick={() => setShowCategoryDropdown(prev => !prev)}
      className="btn-yellow text-sm px-4 py-2 flex items-center gap-2"
    >
      Category {selectedCategories.length > 0 && `(${selectedCategories.length})`}
      <ChevronDownIcon
        className={`w-4 h-4 transition-transform ${
          showCategoryDropdown ? "rotate-180" : ""
        }`}
      />
    </button>
    {showCategoryDropdown && (
      <div className="absolute z-10 mt-2 bg-white text-black rounded shadow-md p-2 w-48">
        {[...new Set(jeansList.flatMap(a => a.category || []))].map((cat, i) => (
          <label key={i} className="block text-sm">
            <input
              type="checkbox"
              value={cat}
              checked={selectedCategories.includes(cat)}
              onChange={(e) => {
                const checked = e.target.checked;
                setSelectedCategories(prev =>
                  checked ? [...prev, cat] : prev.filter(c => c !== cat)
                );
              }}
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>
    )}
  </div>

  {/* Clear Filter */}
  <button
    onClick={() => {
      setSelectedCategories([]);
      setSelectedTiers([]);
    }}
    className="btn-yellow text-sm px-4 py-2"
  >
    Clear Filter
  </button>
</div>


      <div className=" flex flex-col w-full max-w-6xl gap-4">
        <div className="hidden lg:grid grid-cols-[1fr_170px_2fr_1fr_50px] gap-6 px-6 text-left font-semibold text-gray-600 mb-2">
          <div>Title</div>
          <div>Image</div>
          <div>Description</div>
          <div>Note</div>
          <div>Tier</div>
        </div>
        {jeansList
          .filter((anime) => {
            const inSelectedCategory =
              selectedCategories.length === 0 ||
              (anime.category &&
                selectedCategories.some((cat) => anime.category.includes(cat)));

            const inSelectedTier =
              selectedTiers.length === 0 ||
              (anime.tier && selectedTiers.includes(anime.tier));

            return inSelectedCategory && inSelectedTier;
          })
          .map((anime, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-[1fr_170px_2fr_1fr_50px] gap-6 p-6  rounded-xl text-left"
            >
              {/* Title */}
              <div className="font-bold text-lg">
                {anime.title.english}
                {anime.title.native && (
                  <div className="text-sm ">({anime.title.native})</div>
                )}
              </div>

              {/* Image */}
              <div>
                <img
                  src={anime.coverImage?.large || "/images/skip-and-loafer.jpg"}
                  alt={anime.title.english}
                  className="w-30 rounded-lg"
                />
              </div>

              {/* Description */}
              <div className="text-sm ">{anime.description}</div>

              {/* Note */}
              <div className="text-sm  italic">{anime.note || "—"}</div>
              {/* Tier */}
              <div className="text-sm  ">{anime.tier || "—"}</div>
            </div>
          ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link href="/elite" className="btn-yellow w-full sm:w-auto">
          ⬅️ Back to Elite Picks
        </Link>
        <Link href="/" className="btn-yellow w-full sm:w-auto">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
