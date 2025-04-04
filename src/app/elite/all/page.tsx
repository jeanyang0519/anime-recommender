"use client";

import Link from "next/link";
import { jeansList } from "../../data/jeansList";
import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function EliteFullList() {
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [showTierDropdown, setShowTierDropdown] = useState(false);

  const tierRef = useRef<HTMLDivElement>(null);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const tagRef = useRef<HTMLDivElement>(null);

  const filteredList = jeansList.filter((anime) => {
    const inSelectedTag =
      selectedTags.length === 0 ||
      (anime.tags && selectedTags.some((tag) => anime.tags.includes(tag)));

    const inSelectedTier =
      selectedTiers.length === 0 ||
      (anime.tier && selectedTiers.includes(anime.tier));

    return (
      (selectedTiers.length === 0 || selectedTiers.includes(anime.tier)) &&
      (selectedTags.length === 0 ||
        (anime.tags && selectedTags.some((tag) => anime.tags.includes(tag))))
    );
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tierRef.current && !tierRef.current.contains(event.target as Node)) {
        setShowTierDropdown(false);
      }
      if (tagRef.current && !tagRef.current.contains(event.target as Node)) {
        setShowTagDropdown(false);
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
            onClick={() => setShowTierDropdown((prev) => !prev)}
            className="filter-btn"
          >
            Tier{" "}
            {selectedTiers.length > 0 && (
              <span className="count" style={{ fontSize: "9px" }}>
                {selectedTiers.length}
              </span>
            )}
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                showTierDropdown ? "rotate-180" : ""
              }`}
            />
          </button>
          {showTierDropdown && (
            <div className="dropdown w-48">
              <div className="flex flex-col">
                <label className="dropdown-label">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={
                      selectedTiers.length ===
                      [...new Set(jeansList.map((a) => a.tier).filter(Boolean))]
                        .length
                    }
                    onChange={(e) => {
                      const allTiers = [
                        ...new Set(
                          jeansList.map((a) => a.tier).filter(Boolean),
                        ),
                      ];
                      setSelectedTiers(e.target.checked ? allTiers : []);
                    }}
                  />
                  Select All
                </label>
                {[...new Set(jeansList.map((a) => a.tier).filter(Boolean))].map(
                  (tier, i) => (
                    <label key={i} className="dropdown-label">
                      <input
                        type="checkbox"
                        value={tier}
                        checked={selectedTiers.includes(tier)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setSelectedTiers((prev) =>
                            checked
                              ? [...prev, tier]
                              : prev.filter((t) => t !== tier),
                          );
                        }}
                        className="mr-2"
                      />
                      {tier}
                    </label>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tag Filter */}
        <div className="relative" ref={tagRef}>
          <button
            onClick={() => setShowTagDropdown((prev) => !prev)}
            className="filter-btn"
          >
            Tags{" "}
            {selectedTags.length > 0 && (
              <span className="count" style={{ fontSize: "9px" }}>
                {selectedTags.length}
              </span>
            )}
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                showTagDropdown ? "rotate-180" : ""
              }`}
            />
          </button>
          {showTagDropdown && (
            <div className="dropdown w-52">
              <div className="flex flex-col">
                <label className="dropdown-label">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={
                      selectedTags.length ===
                      [...new Set(jeansList.flatMap((a) => a.tags || []))]
                        .length
                    }
                    onChange={(e) => {
                      const allTags = [
                        ...new Set(jeansList.flatMap((a) => a.tags || [])),
                      ];
                      setSelectedTags(e.target.checked ? allTags : []);
                    }}
                  />
                  Select All
                </label>
                {[...new Set(jeansList.flatMap((a) => a.tags || []))].map(
                  (cat, i) => (
                    <label key={i} className="dropdown-label">
                      <input
                        type="checkbox"
                        value={cat}
                        checked={selectedTags.includes(cat)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setSelectedTags((prev) =>
                            checked
                              ? [...prev, cat]
                              : prev.filter((c) => c !== cat),
                          );
                        }}
                        className="mr-2"
                      />
                      {cat}
                    </label>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Clear Filter */}
        <button
          onClick={() => {
            setSelectedTags([]);
            setSelectedTiers([]);
          }}
          className="filter-btn"
        >
          Clear Filter
        </button>
      </div>

      <div className=" flex flex-col w-full max-w-6xl gap-4">
        <div className="hidden lg:grid grid-cols-[1fr_170px_2fr_1fr_50px_1fr] gap-6 px-6 text-left font-semibold text-gray-600 mb-2">
          <div>Title</div>
          <div>Image</div>
          <div>Description</div>
          <div>Note</div>
          <div>Tier</div>
          <div>Tags</div>
        </div>
        {filteredList.length === 0 ? (
          <p className="text-black  px-6 mt-4">
            No results found with the selected filters. Try changing them up!
          </p>
        ) : (
          filteredList.map((anime, index) => (
            <div
              key={index}
              className="grid grid-cols-1 grid grid-cols-[1fr_170px_2fr_1fr_50px_1fr] gap-6 p-6 rounded-xl text-left"
            >
              {/* Title */}
              <div className="font-bold text-lg">
                {anime.title.english}
                {anime.title.native && (
                  <div className="text-sm">({anime.title.native})</div>
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
              <div className="text-sm">{anime.description}</div>

              {/* Note */}
              <div className="text-sm italic">{anime.note || "—"}</div>

              {/* Tier */}
              <div className="text-sm">{anime.tier || "—"}</div>

                {/* Tags */}
              <div className="text-sm flex flex-wrap gap-1">
                {(anime.tags || []).map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedTags((prev) =>
                        prev.includes(tag)
                          ? prev.filter((t) => t !== tag)
                          : [...prev, tag],
                      );
                    }}
                    className={`text-xs px-2 py-1 rounded-full transition-colors cursor-pointer
        ${
          selectedTags.includes(tag)
            ? "bg-yellow-400 text-black"
            : "bg-yellow-100 text-black"
        }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
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
