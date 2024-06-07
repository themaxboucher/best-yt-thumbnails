"use client";

import { useRef } from "react";

export default function TagSelector({
  name,
  classes,
  selectedTags,
  setSelectedTags,
}) {
  const tagCheckbox = useRef();

  function onClickHandler() {
    if (!tagCheckbox.current.checked) {
      setSelectedTags([...selectedTags, name]);
      tagCheckbox.current.checked = true;
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== name));
      tagCheckbox.current.checked = false;
    }
  }

  return (
    <div>
      <button className={classes} type="button" onClick={onClickHandler}>
        {name}
      </button>
      <input className="hidden" type="checkbox" ref={tagCheckbox} />
    </div>
  );
}
