import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Quote = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/content-media?populate[QuoteDivider][populate]=*";
  const { completeDataJSON: contentData } = useDataFetching(urlToFetch);

  return (
    <>
      {contentData.data ? (
        <div className="mt-[72px]">
          <div
            style={{
              backgroundImage: `url(https://not-cool.onrender.com${contentData.data.attributes.QuoteDivider.BackgroundImage.data.attributes.url})`,
            }}
            className="bg-no-repeat bg-cover bg-center flex justify-center items-center relative bg-fixed border-solid border-lightBlue border-y-[6px]"
          >
            <div
              style={{
                backgroundColor: `rgba(0, 0, 0, 0.${contentData.data.attributes.QuoteDivider.GlassOverlayTransparency})`,
              }}
              className="w-[100%] h-[100%] px-[24px] lg:px-[48px]"
            >
              <blockquote
                aria-hidden="true"
                className="text-center text-shadow-black text-[1.5rem]  my-[12%] font-bold text-[white]"
              >
                {contentData.data.attributes.QuoteDivider.Quote}{" "}
              </blockquote>

              <Image
                aria-hidden={true}
                style={{
                  top: "100%",
                  left: "50%",
                  transform: "translate(-50%, -45%)",
                }}
                className="absolute w-[200px] md:w-[30%]"
                src="/trail-and-ball.svg"
                alt="Bolinha de tennis"
                width="0"
                height="0"
                unoptimized
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className=" bg-black25 mt-[72px] text-skeletonLoading bg-skeletonLoading rounded-[12px] flex justify-center items-center relative"
        >
          <h2 className="text-skeletonLoading bg-skeletonLoading text-center text-[1.5rem]  my-[12%] rounded-[12px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </h2>
        </div>
      )}
    </>
  );
};

export default Quote;
