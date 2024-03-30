import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Image from "next/image";
import { API_BASE_URL } from "../../../../../lib/config";

const GET_HISTORY = gql`
  query GetHistory {
    aboutPage {
      data {
        attributes {
          YourHistory {
            RepeatableFields {
              id
              Title
              Description
              Image {
                data {
                  attributes {
                    formats
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const History = ({ handleImageClick }) => {
  const { data } = useStrapiData(GET_HISTORY);

  const historyData =
    data?.aboutPage?.data?.attributes?.YourHistory?.RepeatableFields;

  return (
    <div className="mb-[72px]">
      <Image
        aria-hidden={true}
        className="w-full block scale-y-[1.1]"
        src="/wave.svg"
        alt="Onda"
        width="0"
        height="0"
        unoptimized
        priority={true}
      />

      {historyData ? (
        <div className="bg-midnightBlack px-[24px] lg:px-[48px]">
          <div className="max-container">
            <h2 className="visually-hidden">História da Doggy Daycare</h2>

            <ul className="py-[12%] sm:py-[8%] md:py-[4%] grid gap-12 text-[white]">
              {historyData.map((mapItem, itemIndex) => (
                <li
                  className={`grid gap-8 sm:max-w-[640px] sm:items-center sm:mx-auto sm:text-center lg:grid-cols-2 lg:text-start lg:!max-w-fit lg:mx-none`}
                  key={mapItem.id}
                >
                  <div
                    className={`flex flex-col gap-4 xl:gap-5 ${
                      itemIndex % 2 === 0 ? "md:order-[1]" : "md:order-[0]"
                    }`}
                  >
                    <h3
                      className={`font-bold text-[1.5rem]  ${
                        itemIndex % 2 === 0 ? "text-crimsonRed" : "text-skyBlue"
                      }`}
                    >
                      {mapItem.Title}
                    </h3>

                    <p className="">
                      {mapItem.Description[0].children[0].text}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden border-solid border-[4px] rounded-[12px] ${
                      itemIndex % 2 === 0
                        ? "border-crimsonRed"
                        : "border-skyBlue"
                    }`}
                  >
                    <Image
                      aria-hidden={true}
                      className={` block w-full h-full cursor-zoom-in hover:scale-[1.2] transition-all  `}
                      src={`${API_BASE_URL + mapItem.Image.data.attributes.formats.medium.url}`}
                      alt={`Illustração ${itemIndex}`}
                      width="0"
                      height="0"
                      unoptimized
                      onClick={() => handleImageClick(itemIndex)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="px-[24px] lg:px-[48px] flex flex-col gap-4 md:gap-8 bg-midnightBlack py-[48px]"
        >
          <div className=" flex flex-col gap-8 md:gap-12  max-container">
            {Array.from({ length: 3 }, (_, itemIndex) => (
              <div
                className={`flex flex-col gap-8 md:grid md:gap-8 md:items-center ${
                  itemIndex % 2 === 0
                    ? "md-grid-cols-2fr-1fr"
                    : "md-grid-cols-1fr-2fr"
                }`}
                key={itemIndex}
              >
                <div
                  className={`flex flex-col gap-3 md:order-1 xl:gap-4 ${
                    itemIndex % 2 === 0 ? "md:order-[1]" : "md:order-[0]"
                  }`}
                >
                  <h2 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.5rem] ">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </h2>

                  <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] ">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Similique est id voluptas laborum velit animi, rem commodi
                    exercitationem reprehenderit debitis, nam ab rerum magnam
                    placeat quasi optio ex facilis in?
                  </p>
                </div>

                {/* Image Skeleton */}
                <div className="h-[200px] w-[260px] mx-auto bg-skeletonLoading lg:w-full lg:h-full rounded-[12px]"></div>
              </div>
            ))}
          </div>
        </div>
      )}

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

export default History;
