import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Image from "next/image";
import Button from "@/components/utils/Button";
import { API_BASE_URL } from "../../../../../lib/config";

const GET_LONG_TEXT_DATA = gql`
  query GetLongTextData {
    contentMedia {
      data {
        attributes {
          LongTextDescription {
            FirstText {
              Title
              Description
            }
            SecondText {
              Title
              Description
            }
            ThirdTextGroup {
              Title
              Description
              IllustrationImage {
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

const LongText = ({ handleImageClick }) => {
  const { data } = useStrapiData(GET_LONG_TEXT_DATA);
  const longTextData =
    data?.contentMedia?.data?.attributes?.LongTextDescription;

  return (
    <div className="px-[24px] lg:px-[48px] mt-[72px]">
      {longTextData ? (
        <div className="max-container">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2">
              <div className="flex flex-col gap-4 xl:gap-5">
                <h2 className="text-blueForText font-bold text-[1.25rem] sm:text-[1.5rem]">
                  {longTextData.FirstText.Title}
                </h2>
                <p className="text-[1rem]">
                  {longTextData.FirstText.Description[0].children[0].text}
                </p>
              </div>
              <div className="flex flex-col gap-4 xl:gap-5">
                <h2 className="text-blueForText font-bold text-[1.25rem] sm:text-[1.5rem]">
                  {longTextData.SecondText.Title}
                </h2>
                <p className="text-[1rem]">
                  {longTextData.SecondText.Description[0].children[0].text}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
              <div className="w-[272px] m-auto flex flex-col gap-1 text-center sm:w-[340px] lg:order-1 xl:w-[64%]">
                <Image
                  aria-hidden={true}
                  className="w-full cursor-zoom-in hover:scale-[1.2] transition-all"
                  src={`${
                    API_BASE_URL +
                    longTextData.ThirdTextGroup.IllustrationImage.data
                      .attributes.formats.small.url
                  }`}
                  alt="Ilustração"
                  width="0"
                  height="0"
                  unoptimized
                  onClick={() => handleImageClick(0)}
                />
              </div>
              <div className="mt-[12px] flex flex-col gap-[32px] lg:mt-[0px]">
                <div className="flex flex-col gap-4 xl:gap-5">
                  <h2 className="text-blueForText font-bold text-[1.25rem] sm:text-[1.5rem]">
                    {longTextData.ThirdTextGroup.Title}
                  </h2>
                  <p className="text-[1rem]">
                    {
                      longTextData.ThirdTextGroup.Description[0].children[0]
                        .text
                    }
                  </p>
                </div>
                <Button
                  pageHref="/sobre"
                  buttonText="Leia mais sobre nós"
                  iconSrc="/book-icon.svg"
                  altText="Livro Icone"
                  buttonClassName="!mt-[0px]"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div aria-hidden="true" className=" flex flex-col gap-12">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2">
            <div className="flex flex-col gap-4 xl:gap-5">
              <h2 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.25rem] sm:text-[1.5rem]">
                Lorem ipsum dolor sit amet.
              </h2>
              <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1rem]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloribus aliquid quisquam ad distinctio animi error delectus
                quae illo labore, saepe odio mollitia ipsum a, reprehenderit
                consectetur excepturi facere officia nihil.
              </p>
            </div>
            <div className="flex flex-col gap-4 xl:gap-5">
              <h2 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.25rem] sm:text-[1.5rem]">
                Lorem ipsum dolor sit amet.
              </h2>
              <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1rem]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloribus aliquid quisquam ad distinctio animi error delectus
                quae illo labore, saepe odio mollitia ipsum a, reprehenderit
                consectetur excepturi facere officia nihil.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LongText;
