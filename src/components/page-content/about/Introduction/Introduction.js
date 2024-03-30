import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";

const GET_INTRODUCTION = gql`
  query GetIntroduction {
    aboutPage {
      data {
        attributes {
          Introduction {
            Title
            Description
          }
        }
      }
    }
  }
`;

const Introduction = () => {
  const { data } = useStrapiData(GET_INTRODUCTION);

  const introductionData = data?.aboutPage?.data?.attributes?.Introduction;

  return (
    <div className="px-[24px] lg:px-[48px] mb-[72px]">
      <div className="max-container">
        {introductionData ? (
          <>
            <div className="flex flex-col gap-4 xl:gap-5">
              <h2
                id="main-content"
                className="w-fit text-primaryBlue font-bold text-[1.50rem] sm:text-[1.75rem]"
              >
                {introductionData?.Title}
              </h2>

              <p className="font-medium text-[1rem]">
                {introductionData?.Description[0].children[0].text}
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
                  Excepturi nesciunt natus unde dolorem voluptas. Sit
                  architecto, facere.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Introduction;
