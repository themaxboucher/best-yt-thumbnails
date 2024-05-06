"use client";

import writeThumbnailDoc from "@/actions/writeThumbnailDoc";
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

export default function SubmitForm() {
  const [URL, setURL] = useState(""); // Not sure if nessecary
  const [thumbnailData, setThumbnailData] = useState(null);
  const [isLoadingChange, setIsLoadingChange] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isValidURL, setIsValidURL] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function onChangeHandler(e) {
    setURL(e.target.value);
    if (e.target.value === "") {
      setIsValidURL(true);
    } else if (isValidYouTubeURL(e.target.value)) {
      setIsValidURL(true);
      setIsLoadingChange(true);
      const videoID = getYouTubeVideoId(e.target.value);
      const thumbnailObj = await fetchYouTubeData(videoID);
      setIsLoadingChange(false);
      if (!thumbnailObj) {
        setIsValidURL(false);
        return;
      }
      setThumbnailData(thumbnailObj);
    } else {
      setIsValidURL(false);
    }
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    if (!isValidURL || !thumbnailData) {
      alert("Please add a valid YouTube video URL.");
      return;
    }
    if (selectedTags.length === 0) {
      alert("Please select at least one tag.");
      return;
    }
    setIsLoadingSubmit(true);

    // Modify thumbnail data object
    const submitData = thumbnailData;
    submitData.tags = selectedTags;
    // TODO: remove unessecary data from the object
    //delete submitData.channel;
    //delete submitData.video.viewCount;

    const success = await writeThumbnailDoc(submitData);

    if (success) {
      setSelectedTags([]);
      setThumbnailData(null);
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
        <section className="mx-auto w-full max-w-[80rem] px-10 py-16 flex flex-col justify-start items-center gap-8">
          <div className="grid grid-cols-2 w-full auto-rows-auto gap-12">
            <SubmitPreview
              isLoadingChange={isLoadingChange}
              isValidURL={isValidURL}
              thumbnailData={thumbnailData}
            />

            <div>
              <form onSubmit={onSubmitHandler} className="space-y-8">
                <div className="space-y-3">
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
                    invalid={!isValidURL}
                    tabIndex="1"
                  />
                </div>
                <div className="space-y-3">
                  <label>
                    2. Select all tags which apply to the thumbnail.
                  </label>
                  <div className="flex justify-start items-start gap-2 flex-wrap">
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
              </form>
            </div>
          </div>
        </section>
      ) : (
        <SubmitFormSuccess setIsSubmitted={setIsSubmitted} />
      )}
    </>
  );
}
