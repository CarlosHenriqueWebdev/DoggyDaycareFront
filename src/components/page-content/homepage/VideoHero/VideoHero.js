import HeroTextBox from "@/components/utils/HeroTextBox";
import useDataFetching from "@/hooks/useDataFetching";
import React, { useEffect, useState } from "react";

const VideoHero = () => {
  const urlToFetch01 =
    "https://not-cool.onrender.com/api/content-media?populate[HeroSection][populate][HeroVideosFormats][populate]=*";
  const { completeDataJSON: contentData01 } = useDataFetching(urlToFetch01);

  const urlToFetch02 =
    "https://not-cool.onrender.com/api/content-media?populate[HeroSection][populate]=*";
  const { completeDataJSON: contentData02 } = useDataFetching(urlToFetch02);

  return (
    <>
      {contentData01.data && contentData02.data ? (
        <div className="mb-[72px]">
          <div className="relative border-b-[6px] border-solid border-skyBlue">
            <video
              autoPlay
              muted
              loop
              className="w-full object-cover h-[70vh] bg-midnightBlack"
            >
              <source
                src={`https://not-cool.onrender.com${contentData01?.data.attributes.HeroSection.HeroVideosFormats.MP4VideoForTheHeroSection.data.attributes.url}`}
                type="video/mp4"
              />
              <source
                src={`https://not-cool.onrender.com${contentData01?.data.attributes.HeroSection.HeroVideosFormats.WebmVideoForTheHeroSection.data.attributes.url}`}
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>

            <HeroTextBox
              title={
                contentData02.data.attributes.HeroSection.HeroTextVideo.Title
              }
              description={
                contentData02.data.attributes.HeroSection.HeroTextVideo
                  .Description
              }
            />
          </div>
        </div>
      ) : (
        <div aria-hidden="true" className="relative">
          <div className="mb-[72px] bg-black75 h-[70vh]">
            <div
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -60%)",
              }}
              className="absolute text-skeletonLoading text-center flex flex-col gap-[12px] bg-skeletonLoading rounded-[8px] border-solid border-skeletonLoading border-[2px] p-[16px] select-none"
            >
              <h1 className="text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem] text-skeletonLoading">
                Lorem ipsum
              </h1>

              <p className="hidden lg:block text-[1rem] text-skeletonLoading">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Sapiente tempore perferendis consectetur unde ad velit nisi
                necessitatibus
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoHero;
