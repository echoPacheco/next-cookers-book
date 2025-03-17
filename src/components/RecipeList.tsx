"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import RecipeType from "@/types/recipe";
import RecipeCard from "@/components/RecipeCard";

type RecipeListProps = {
  recipes: RecipeType[];
};

const RecipeList = ({ recipes }: RecipeListProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isClickPrevented, setIsClickPrevented] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    <div
      ref={carouselRef}
      className="no-scrollbar flex cursor-grab select-none gap-4 overflow-x-auto whitespace-nowrap py-4 active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      {recipes.map((recipe) => (
        <Link
          key={recipe._id.toString()}
          href={isClickPrevented ? "#" : `/recipe/${recipe._id}`}
          className="flex-shrink-0 text-gray-200 hover:text-white"
          onClick={(e) => isClickPrevented && e.preventDefault()}
        >
          <div className="w-[350px]">
            <RecipeCard recipe={recipe} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;
