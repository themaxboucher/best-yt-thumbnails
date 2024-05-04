"use client";

import writeThumbnailDoc from "@/actions/writeThumbnailDoc";
import Tag from "@/components/tag";
import Button from "@/components/ui/button";
import ButtonGroup from "@/components/ui/button-group";
import Input from "@/components/ui/input";
import { tags } from "@/data/tags";
import { fetchYouTubeData } from "@/data/youtube";
import abbreviateNumber from "@/helper-functions/abbreviateNumber";
import getYouTubeVideoId from "@/helper-functions/getYouTubeVideoId";
import isValidYouTubeURL from "@/helper-functions/isValidYouTubeURL";
import timeAgo from "@/helper-functions/timeAgo";
import Image from "next/image";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { HiCalendar } from "react-icons/hi";
import { IoMdArrowRoundForward } from "react-icons/io";

export default function SubmitForm() {
  const [URL, setURL] = useState(""); // Not sure if nessecary
  const [thumbnailData, setThumbnailData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidURL, setIsValidURL] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function onChangeHandler(e) {
    setURL(e.target.value);
    if (e.target.value === "") {
      setIsValidURL(true);
    } else if (isValidYouTubeURL(e.target.value)) {
      setIsValidURL(true);
      setIsLoading(true);
      const videoID = getYouTubeVideoId(e.target.value);
      const thumbnailObj = await fetchYouTubeData(videoID);
      setIsLoading(false);
      if (!thumbnailObj) {
        setIsValidURL(false);
        return;
      }
      setThumbnailData(thumbnailObj);
    } else {
      setIsValidURL(false);
    }
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (!isValidURL || !thumbnailData) {
      alert("Please add a valid YouTube video URL.");
      return;
    }
    if (selectedTags.length === 0) {
      alert("Please select at least one tag.");
      return;
    }
    const submitData = thumbnailData;
    submitData.tags = selectedTags;
    // Remove data from the object that should be called from the YouTube API every time
    delete submitData.channel;
    delete submitData.video.viewCount;
    writeThumbnailDoc(submitData);
    setSelectedTags([]);
    setThumbnailData(null);
    setIsSubmitted(true);
  }

  return (
    <>
      {!isSubmitted ? (
        <section className="mx-auto w-full max-w-[80rem] px-10 py-16 flex flex-col justify-start items-center gap-8">
          <div className="grid grid-cols-2 w-full auto-rows-auto gap-12">
            <div
              className={`space-y-4 ease-out duration-300 ${
                isLoading && "animate-pulse"
              } ${
                thumbnailData && (!isValidURL || URL === "") && "opacity-50"
              }`}
            >
              <div className="overflow-hidden rounded-xl">
                {thumbnailData ? (
                  <Image
                    className="aspect-video object-cover"
                    src={thumbnailData.thumbnails.standard.url}
                    alt={thumbnailData.video.title}
                    width={thumbnailData.thumbnails.standard.width}
                    height={thumbnailData.thumbnails.standard.height}
                  />
                ) : (
                  <div className="aspect-video object-cover bg-slate-200 flex justify-center items-center"></div>
                )}
              </div>
              {thumbnailData ? (
                <p className="text-slate-900 font-medium text-lg">
                  {thumbnailData.video.title}
                </p>
              ) : (
                <div className="bg-slate-200 my-2 h-5 w-[80%] rounded-lg"></div>
              )}
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                  <div className="size-10 rounded-full relative overflow-hidden">
                    {thumbnailData ? (
                      <Image
                        src={thumbnailData.channel.thumbnails.maxres.url}
                        alt={thumbnailData.channel.title}
                        fill
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 size-full bg-slate-200"></div>
                    )}
                  </div>
                  <div>
                    {thumbnailData ? (
                      <p className="text-slate-900 text-sm font-medium">
                        {thumbnailData.channel.title}
                      </p>
                    ) : (
                      <div className="bg-slate-200 my-2 h-3 w-20 rounded-lg"></div>
                    )}

                    {thumbnailData ? (
                      <p className="text-xs">
                        {abbreviateNumber(
                          thumbnailData.channel.subscriberCount
                        )}{" "}
                        subscribers
                      </p>
                    ) : (
                      <div className="bg-slate-200 my-2 h-2 w-16 rounded-lg"></div>
                    )}
                  </div>
                </div>

                <div className="flex justify-start items-center gap-5 text-sm font-medium text-slate-600">
                  {thumbnailData ? (
                    <div
                      className="flex justify-center items-center gap-1"
                      title={`${abbreviateNumber(
                        thumbnailData.video.viewCount
                      )} views`}
                    >
                      <AiFillEye className="size-4" />
                      {abbreviateNumber(thumbnailData.video.viewCount)}
                    </div>
                  ) : (
                    <div className="bg-slate-200 my-2 h-4 w-10 rounded-lg"></div>
                  )}
                  {thumbnailData ? (
                    <div
                      className="flex justify-center items-center gap-1"
                      title={`Published ${timeAgo(
                        thumbnailData.video.publishedAt
                      )}`}
                    >
                      <HiCalendar className="size-4" />
                      {timeAgo(thumbnailData.video.publishedAt)}
                    </div>
                  ) : (
                    <div className="bg-slate-200 my-2 h-4 w-10 rounded-lg"></div>
                  )}
                </div>
              </div>
            </div>
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
                <Button>
                  Submit thumbnail
                  <IoMdArrowRoundForward />
                </Button>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <>
          <main className="mx-auto w-full max-w-[80rem] px-10 py-16 flex flex-col justify-start items-center gap-3 h-screen">
            <div className="space-y-3 max-w-lg text-center">
              <h1>Success!</h1>
              <p>
                The thumbnail you submitted has been sent for review and will be
                published shortly if it meets our submission guidelines.
              </p>
              <ButtonGroup>
                <Button onClick={() => setIsSubmitted(false)}>
                  Submit another thumbnail
                </Button>
                <Button path="/" secondary>
                  Explore thumbnails
                </Button>
              </ButtonGroup>
            </div>
          </main>
        </>
      )}
    </>
  );
}