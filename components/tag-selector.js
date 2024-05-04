"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function TagSelector({
  name,
  classes,
  description,
  refImage,
  selectedTags,
  setSelectedTags,
}) {
  const tagCheckbox = useRef();
  const [showHoverCard, setShowHoverCard] = useState(false);

  let timeOut;

  function onMouseOverHandler() {
    timeOut = setTimeout(() => {
      setShowHoverCard(true);
    }, 1000);
    return timeOut;
  }
  function onMouseOutHandler() {
    setShowHoverCard(false);
    clearTimeout(timeOut);
  }

  function onClickHandler() {
    clearTimeout(timeOut); // Bandaid solution to mobile click bug
    if (!tagCheckbox.current.checked) {
      setSelectedTags([...selectedTags, name]);
      tagCheckbox.current.checked = true;
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== name));
      tagCheckbox.current.checked = false;
    }
  }

  return (
    <div className="relative group">
      <div
        className={`${
          showHoverCard
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        } ease-out duration-200 p-4 rounded-lg flex flex-col justify-center items-stretch gap-4 bg-white shadow-lg size-min absolute top-8 left-1/2 transform -translate-x-1/2 z-20`}
      >
        <div className="aspect-video rounded-lg w-48 overflow-hidden bg-slate-200 relative">
          {refImage && (
            <Image
              src={refImage}
              alt={`${name} thumbnail example`}
              className="object-cover"
              fill
            />
          )}
        </div>
        <p className="text-xs">{description}</p>
      </div>
      <button
        className={classes}
        type="button"
        onClick={onClickHandler}
        onMouseOver={onMouseOverHandler}
        onMouseOut={onMouseOutHandler}
      >
        {name}
      </button>
      <input className="hidden" type="checkbox" ref={tagCheckbox} />
    </div>
  );
}
