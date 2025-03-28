"use client";

import CategoryType from "@/types/category";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchFilter = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isClickPrevented, setIsClickPrevented] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    name: searchParams.get("name") || "",
    category: searchParams.get("category") || "",
  });

  const handleSearch = useDebouncedCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");

        const categories = await response.json();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    handleSearch(key, value);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setIsClickPrevented(false);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;

    if (Math.abs(walk) > 5) setIsClickPrevented(true);

    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="relative w-96 lg:w-[640px]">
          <Image
            src="/icons/magnifying_glass.svg"
            alt="Search"
            width={20}
            height={20}
            className="absolute left-4 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            value={filters.name}
            placeholder="Search any recipe"
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full rounded-full border border-black py-2 pl-10 pr-4 text-dark_brown"
          />
        </div>
      </div>
      <div
        ref={carouselRef}
        className="no-scrollbar flex cursor-grab select-none gap-4 overflow-x-auto whitespace-nowrap pt-4 active:cursor-grabbing lg:gap-8"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        <Link
          href={`${pathname}?${(() => {
            const params = new URLSearchParams(searchParams);
            params.delete("category");
            return params.toString();
          })()}`}
          className="flex-shrink-0"
          onClick={(e) => isClickPrevented && e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          <div className="flex flex-col items-center">
            <Image
              src="/categories/default.svg"
              alt="All categories"
              width={50}
              height={50}
            />
            <p className="text-dark_brown">All</p>
          </div>
        </Link>
        {categories.map((category) => {
          const params = new URLSearchParams(searchParams);

          params.set("category", category.name);

          return (
            <Link
              key={category._id.toString()}
              href={`${pathname}?${params.toString()}`}
              className="flex-shrink-0"
              onClick={(e) => isClickPrevented && e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            >
              <div className="flex flex-col items-center">
                <Image
                  src={
                    category.img
                      ? `/categories/` + category.img
                      : "/categories/default.svg"
                  }
                  alt={category.name}
                  width={50}
                  height={50}
                />
                <p className="text-dark_brown">{category.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default SearchFilter;
