"use client";

import createThumbnailDoc from "@/actions/createThumbnailDoc";
import Tag from "@/components/tag";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { tags } from "@/data/tags";
import { fetchYouTubeData } from "@/data/youtube";
import getYouTubeVideoId from "@/helper-functions/getYouTubeVideoId";
import isValidYouTubeURL from "@/helper-functions/isValidYouTubeURL";
import { useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { CgSpinner } from "react-icons/cg";
import SubmitFormSuccess from "./submit-form-success";
import SubmitPreview from "./submit-preview";

export default function SubmitForm(userId) {
  const [URL, setURL] = useState(""); // Not sure if nessecary
  const [thumbPreviewData, setThumbPreviewData] = useState(null);
  const [thumbSubmitData, setThumbSubmitData] = useState(null);
  const [isLoadingChange, setIsLoadingChange] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isValidInput, setIsValidInput] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function onChangeHandler(e) {
    setURL(e.target.value);
    if (e.target.value === "") {
      setIsValidInput(true);
    } else if (isValidYouTubeURL(e.target.value)) {
      setIsValidInput(true);
      setIsLoadingChange(true);
      const videoId = getYouTubeVideoId(e.target.value);
      const ytData = await fetchYouTubeData(videoId);
      setIsLoadingChange(false);
      if (!ytData) {
        setIsValidInput(false);
      } else {
        setThumbPreviewData(ytData.dynamic);
        setThumbSubmitData(ytData.submit);
      }
    } else {
      setIsValidInput(false);
    }
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    if (!isValidInput || !thumbPreviewData || !thumbSubmitData) {
      alert("Please add a valid YouTube video URL.");
      return;
    }
    if (selectedTags.length === 0) {
      alert("Please select at least one tag.");
      return;
    }
    // FIX: Prevent users from trying to submit an already submitted thumbnail
    setIsLoadingSubmit(true);

    // Modify thumbnail data object to be submitted
    const finalSubmitObj = thumbSubmitData;
    finalSubmitObj.versions.current.tags = selectedTags; // Add selected tags
    finalSubmitObj.meta.submittedBy = userId; // Add id of the submitting user
    // Add the timestamp of when it gets submitted (will be done in the createThumbnailDoc function)

    const submitId = finalSubmitObj.video.id;

    const success = await createThumbnailDoc(finalSubmitObj, submitId);

    if (success) {
      setSelectedTags([]);
      setThumbPreviewData(null);
      setIsSubmitted(true);
      setIsLoadingSubmit(false);
    } else {
      alert(
        "There was an error when submiting your thumbnail Please try again later."
      );
      setIsLoadingSubmit(false);
    }
  }

  return (
    <>
      {!isSubmitted ? (
        <form
          onSubmit={onSubmitHandler}
          className="grid grid-cols-1 sm:grid-cols-2 w-full auto-rows-min gap-8 sm:gap-x-12 sm:gap-y-8 overflow-hidden"
        >
          <div className="space-y-3 sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2 sm:row-span-1 h-min">
            <label htmlFor="video-url">
              1. Enter the URL of the video with the thumbnail you want to
              submit.
            </label>
            <Input
              type="url"
              name="URL"
              id="video-url"
              value={URL}
              onChange={onChangeHandler}
              placeholder="YouTube video URL"
              required
              invalid={!isValidInput}
              tabIndex="1"
            />
          </div>
          <div className="sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-3 sm:row-span-2 mb-4 sm:mb-0 h-min">
            <SubmitPreview
              isLoadingChange={isLoadingChange}
              isValidURL={isValidInput}
              thumbnailData={thumbPreviewData}
            />
          </div>
          <div className="space-y-6 sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:row-end-3 h-min">
            <div className="space-y-3 md:col-span-2 md:row-span-2">
              <label>2. Select all tags which apply to the thumbnail.</label>
              <div className="flex justify-start items-start gap-2 flex-wrap w-full">
                {tags.map((tag, index) => (
                  <li key={index} className="list-none">
                    <Tag
                      {...tag}
                      select
                      setSelectedTags={setSelectedTags}
                      selectedTags={selectedTags}
                    />
                  </li>
                ))}
              </div>
            </div>
            <Button disabled={isLoadingSubmit}>
              Submit thumbnail
              {!isLoadingSubmit ? (
                <IoMdArrowRoundForward className="size-4" />
              ) : (
                <CgSpinner className=" size-4 animate-spin" />
              )}
            </Button>
          </div>
        </form>
      ) : (
        <SubmitFormSuccess setIsSubmitted={setIsSubmitted} />
      )}
    </>
  );
}
