import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Image from "next/image";

const GET_BENEFITS = gql`
  query GetBenefits {
    openPositionsPage {
      data {
        attributes {
          Benefits {
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

const Benefits = () => {
  const { data: contentData } = useStrapiData(GET_BENEFITS);

  return (
    <div className="my-[72px]">
      <Image
        aria-hidden={true}
        className="w-full block scale-y-[1.3]"
        src="/wave.svg"
        alt="Onda"
        width="0"
        height="0"
        unoptimized
        priority={true}
      />

      <div className="py-[72px] bg-midnightBlack text-[rgb(138,117,117)] px-[24px] lg:px-[48px]">
        <div className="max-container">
          {contentData?.openPositionsPage?.data ? (
            <div className="grid gap-[24px]">
              <h2 className="text-skyBlue font-bold text-[1.5rem] sm:text-[1.75rem]">
                {contentData.openPositionsPage.data.attributes.Benefits.Title}
              </h2>

              <ul
                className={`grid gap-8 sm:items-center sm:mx-auto sm:grid-cols-2 lg:!max-w-fit lg:mx-none`}
              >
                {contentData.openPositionsPage.data.attributes.Benefits.RepeatableFields.map(
                  (mapItem) => (
                    <li
                      className={`flex flex-col gap-3 xl:gap-4`}
                      key={mapItem.id}
                    >
                      <h3
                        className={`text-[white] font-bold text-[1.25rem] sm:text-[1.375rem]`}
                      >
                        {mapItem.Title}
                      </h3>

                      <p className="text-white75 font-medium ">
                        {mapItem.Description[0].children[0].text}
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : (
            <>
              <div aria-hidden="true" className="grid gap-8 bg-midnightBlack">
                <h1 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.5rem]  w-fit">
                  Lorem ipsum
                </h1>

                <div className="gap-8 md:gap-12 grid md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 8 }, (_, itemIndex) => (
                    <div
                      className={`flex flex-col gap-8 md:grid md:gap-8 md:items-center`}
                      key={itemIndex}
                    >
                      <div
                        className={`flex flex-col gap-3 md:order-1 xl:gap-4`}
                      >
                        <h2 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.5rem] ">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit.
                        </h2>

                        <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] ">
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Similique est id voluptas laborum velit animi,
                          rem commodi exercitationem reprehenderit debitis, nam
                          ab rerum magnam placeat quasi optio ex facilis in?
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Image
        aria-hidden={true}
        className="w-full block scale-y-[-1.02]"
        src="/wave.svg"
        alt="Onda"
        width="0"
        height="0"
        unoptimized
        priority={true}
      />
    </div>
  );
};

export default Benefits;
