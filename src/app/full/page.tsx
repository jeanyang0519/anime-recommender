"use client";

import Link from "next/link";
import { jeansList } from "../data/jeansList";
import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getTagColor, darkenColor } from "../../utils/getTagColor";

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
    <div className="min-h-screen p-8 flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold">📚 Jean’s Anime List</h1>
      <p className="text-lg mb-8">Curated with love and care </p>
      <div className="filter-container">
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
                <label className="dropdown-label border-b border-gray-100">
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
                <label className="dropdown-label border-b border-gray-100">
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
        <div className="relative">
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
      </div>

      <div className="flex flex-col w-full max-w-6xl rounded-md ">
        <div className="hidden md:grid grid-cols-[1fr_150px_2fr_1fr_60px_1fr] gap-4 px-4 py-2 text-left font-semibold text-gray-600">
          <div>Title</div>
          <div>Image</div>
          <div>Description</div>
          <div>Jean's Note</div>
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
              className="grid md:grid-cols-[1fr_150px_2fr_1fr_60px_1fr] grid-cols-1 gap-4 px-4 py-4 border-t border-gray-300 hover:bg-gray-100"
            >
              {/* Title */}
              <div className="font-bold text-lg">
                {anime.title.english}
                {anime.title.native && (
                  <div className="text-sm">({anime.title.native})</div>
                )}
              </div>

              {/* Image */}
              <div className="flex">
                <img
                  src={anime.coverImage?.large || "/images/skip-and-loafer.jpg"}
                  alt={anime.title.english}
                  className="w-30 rounded-lg"
                />
              </div>

              {/* Description */}
              <div className="text-sm leading-relaxed">{anime.description}</div>

              {/* Note */}
              <div className="text-sm">
                <div className="block md:hidden font-semibold">
                  Jean's Note:
                </div>
                {anime.note || "—"}
              </div>

              {/* Tier */}
              <div className="text-sm">
                <div className="block md:hidden font-semibold">Tier:</div>
                {anime.tier || "—"}
              </div>

              {/* Tags */}
              <div className="text-sm">
                {(anime.tags || []).map((tag, i) => {
                  const baseColor = getTagColor(tag);
                  const borderColor = darkenColor(baseColor, 15);
                  const backgroundColor = selectedTags.includes(tag)
                    ? darkenColor(baseColor, 10)
                    : baseColor;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedTags((prev) =>
                          prev.includes(tag)
                            ? prev.filter((t) => t !== tag)
                            : [...prev, tag],
                        );
                      }}
                      title={`Filter by ${tag}`}
                      className="text-xs px-2 py-1 mr-1 mb-1 rounded-full transition-colors cursor-pointer w-fit max-w-full"
                      style={{
                        backgroundColor,
                        border: `2px solid ${borderColor}`,
                        opacity:
                          selectedTags.length === 0 ||
                          selectedTags.includes(tag)
                            ? 1
                            : 0.4,
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
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
