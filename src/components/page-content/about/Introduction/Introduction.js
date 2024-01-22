import useDataFetching from "@/hooks/useDataFetching";
import React from "react";

const Introduction = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/about-page?populate[Introduction][populate]=*";
  const { completeDataJSON: contentData } = useDataFetching(urlToFetch);

  return (
    <div className="px-[24px] lg:px-[48px] mb-[72px]">
      {contentData.data ? (
        <>
          <div className="flex flex-col gap-4 xl:gap-5 max-w-[800px]">
            <h2
              id="main-content"
              className="w-fit text-primaryBlue font-bold text-[1.75rem]"
            >
              {contentData.data.attributes.Introduction.Title}
            </h2>

            <p className="font-medium text-[1rem] ">
              {
                contentData.data.attributes.Introduction.Description[0]
                  .children[0].text
              }
            </p>
          </div>
        </>
      ) : (
        <>
          <div
            aria-hidden="true"
            className=" px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-7"
          >
            <div className="flex flex-col gap-[12px] text-center">
              <div className="flex justify-center relative py-3">
                <h2 className="w-fit text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.75rem] px-[24px] lg:px-[48px] ">
                  Lorem ipsum dolor sit
                </h2>
              </div>

              <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] px-[24px] md:mx-auto md:w-[80%] lg:px-[48px] ">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi nesciunt natus unde dolorem voluptas. Sit architecto,
                facere.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Introduction;
