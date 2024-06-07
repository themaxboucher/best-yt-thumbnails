"use client";

import Tag from "./tag";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

export default function TagSlider({ tags, isUserLists }) {
  const [showLeftArrow, setShowleftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const sliderRef = useRef(null);
  const parentRef = useRef(null);

  // Check if the list of tags is scrollable
  useEffect(() => {
    const checkIsScrollable = () => {
      if (parentRef.current && sliderRef.current) {
        const parentWidth = parentRef.current.clientWidth;
        const sliderWidth = sliderRef.current.clientWidth;

        if (sliderWidth >= parentWidth) {
          setShowRightArrow(true);
        } else {
          setShowRightArrow(false);
        }
      }
    };

    checkIsScrollable();

    window.addEventListener("resize", checkIsScrollable);
    return () => {
      window.removeEventListener("resize", checkIsScrollable);
    };
  }, []);

  function scrollHandler(event) {
    const slider = event.target;
    if (slider.scrollLeft === 0) {
      setShowleftArrow(false);
    } else if (
      Math.abs(slider.scrollLeft - (slider.scrollWidth - slider.clientWidth)) <=
      1
    ) {
      setShowRightArrow(false);
    } else {
      setShowRightArrow(true);
      setShowleftArrow(true);
    }
  }

  function scrollLeftHandler() {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 600;
  }

  function scrollRightHandler() {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 600;
  }

  return (
    <div
      className="overflow-hidden flex justify-between items-center relative w-full"
      ref={parentRef}
    >
      <div
        id="slider"
        className="flex justify-start items-center gap-[0.35rem] no-scrollbar overflow-x-scroll scroll-smooth h-full"
        onScroll={scrollHandler}
        ref={sliderRef}
      >
        {tags.map((tag, index) => (
          <li
            key={index}
            className="list-none h-full flex justify-center items-center"
          >
            <Tag {...tag} big isUserList={isUserLists} />
          </li>
        ))}
      </div>
      {showRightArrow && (
        <a
          onClick={scrollRightHandler}
          className="text-slate-950 hover:text-slate-900 ease-out duration-300 cursor-pointer absolute right-0 top-0 bottom-0 h-full w-8 flex justify-end items-center bg-gradient-to-r from-transparent to-white to-50%"
        >
          <IoChevronForward />
        </a>
      )}
      {showLeftArrow && (
        <a
          onClick={scrollLeftHandler}
          className="text-slate-950 hover:text-slate-900 ease-out duration-300 cursor-pointer absolute left-0 top-0 bottom-0 h-full w-8 flex justify-start items-center bg-gradient-to-l from-transparent to-white to-50%"
        >
          <IoChevronBack />
        </a>
      )}
    </div>
  );
}
