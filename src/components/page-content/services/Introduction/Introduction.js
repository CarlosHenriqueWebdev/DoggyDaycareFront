import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";

const GET_INTRODUCTION_DATA = gql`
  query GetIntroductionData {
    servicesPage {
      Introduction {
        Title
        Description {
          children {
            text
          }
        }
      }
    }
  }
`;

const Introduction = () => {
  const { data } = useStrapiData(GET_INTRODUCTION_DATA);
  const introductionData = data?.servicesPage?.Introduction;

  return (
    <div className="px-[24px] lg:px-[48px] mb-[72px]">
      {introductionData && (
        <>
          <div className="flex flex-col gap-4 xl:gap-5">
            <h2
              id="main-content"
              className="w-fit text-primaryBlue font-bold text-[1.75rem]"
            >
              {introductionData.Title}
            </h2>

            <p className="max-w-[800px] font-medium text-[1rem] ">
              {introductionData.Description[0].children[0].text}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Introduction;
