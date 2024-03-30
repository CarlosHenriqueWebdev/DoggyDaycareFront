import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";

const GET_WHY_CHOOSE_US = gql`
  query GetWhyChooseUs {
    aboutPage {
      data {
        attributes {
          WhyUs {
            Title
            RepeatableFields {
              id
              Title
              Description
            }
          }
        }
      }
    }
  }
`;

const WhyChooseUs = () => {
  const { data } = useStrapiData(GET_WHY_CHOOSE_US);

  const whyUsData = data?.aboutPage?.data?.attributes?.WhyUs;

  return (
    <div className="px-[24px] lg:px-[48px] mb-[72px]">
      {whyUsData ? (
        <div className="max-container">
          <h2 className="text-primaryBlue font-bold text-[1.5rem]  sm:text-[1.75rem] mb-[36px]">
            {whyUsData?.Title}
          </h2>

          <ul className="grid gap-[16px]">
            {whyUsData?.RepeatableFields?.map((mapItem) => (
              <li
                key={mapItem.id}
                className="gradient-blue-red p-[4px] break-inside-avoid rounded-[12px]"
              >
                <div className="flex flex-col rounded-[12px] gap-2 md:gap-3 bg-[black] p-[24px] text-[white]">
                  <h3 className="text-skyBlue text-[1.25rem] font-bold w-full">
                    {mapItem.Title}
                  </h3>
                  <p className="text-[white] ">
                    {mapItem.Description[0].children[0].text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div aria-hidden="true" className="px-[24px] lg:px-[48px] mb-[124px]">
          <h2 className="w-fit rounded-[8px] text-skeletonLoading bg-skeletonLoading text-center font-bold text-[1.75rem] mb-[36px] mx-auto">
            Lorem ipsum dolor
          </h2>

          <div className="md:columns-2 lg:columns-3">
            {Array.from({ length: 6 }, (_, itemIndex) => (
              <div
                key={itemIndex}
                className="mb-[16px] p-[4px] break-inside-avoid rounded-[12px]"
              >
                <div className="flex flex-col rounded-[12px] gap-2 md:gap-3 bg-black50 p-[24px] text-[white]">
                  <h3 className="w-fit rounded-[8px] text-skeletonLoading bg-skeletonLoading text-[1.5rem] font-bold ">
                    Lorem ipsum
                  </h3>

                  <p className="rounded-[8px] text-skeletonLoading bg-skeletonLoading font-medium ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Error natus, harum quasi voluptatibus ea a facere voluptates
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WhyChooseUs;
