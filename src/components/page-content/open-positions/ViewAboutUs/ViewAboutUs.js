import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import KenBurnsSlideshow from "./KenBurnsImages";
import Button from "@/components/utils/Button";
import Image from "next/image";

const GET_ABOUT_US = gql`
  query GetAboutUs {
    openPositionsPage {
      data {
        attributes {
          SeeAboutUs {
            Title
            Description
          }
        }
      }
    }
  }
`;

const ViewAboutUs = () => {
  const { data: contentData } = useStrapiData(GET_ABOUT_US);

  return (
    <div className="px-[24px] lg:px-[48px] py-[72px]">
      <div className="max-container">
        {contentData ? (
          <div className="grid gap-12 text-[white]">
            <div
              className={`relative grid gap-8 items-center sm:max-w-[640px] sm:mx-auto lg:grid-cols-2 lg:gap-[48px] lg:!max-w-fit lg:mx-none`}
            >
              <div className={`flex flex-col gap-4 xl:gap-5`}>
                <h2
                  className={`text-skyBlue font-black text-[1.325rem] sm:text-[1.5rem]`}
                >
                  {
                    contentData.openPositionsPage.data.attributes.SeeAboutUs
                      .Title
                  }
                </h2>

                <p className="text-[black] font-medium ">
                  {
                    contentData.openPositionsPage.data.attributes.SeeAboutUs
                      .Description[0].children[0].text
                  }
                </p>

                <Button
                  pageHref="/sobre"
                  iconSrc="/book-icon.svg"
                  altText="Livro Icone"
                  buttonText="Conheça Nossa História"
                  buttonClassName="!mt-[24px] px-[28px] sm:w-fit sm:py-[16px] sm:px-[24px] bg-primaryBlue"
                />
              </div>

              <div className="order-[-1]">
                <KenBurnsSlideshow />
              </div>

              <Image
                aria-hidden={true}
                className="!absolute w-full -z-20 sm:px-[48px]"
                src="/swirl.svg"
                alt="Marcas de patas de cachorro"
                width="0"
                height="0"
                unoptimized
                priority={true}
              />
            </div>
          </div>
        ) : (
          <>
            <div aria-hidden="true" className="grid gap-12">
              <div
                className={`grid gap-8 items-center sm:max-w-[640px] sm:mx-auto lg:grid-cols-2 lg:gap-[48px] lg:!max-w-fit lg:mx-none`}
              >
                <div className={`flex flex-col gap-4 xl:gap-5`}>
                  <h1
                    className={`text-skeletonLoading bg-skeletonLoading  rounded-[8px] text-[1.5rem] `}
                  >
                    Lorem ipsum
                  </h1>

                  <p className="text-skeletonLoading bg-skeletonLoading  rounded-[8px] ">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Aut nemo, voluptate beatae accusantium qui rem eligendi id
                    sapiente impedit?
                  </p>

                  {/* Button Skeleton */}
                  <div className="!w-[40%] mt-[24px] text-skeletonLoading bg-skeletonLoading h-[36px] rounded-[8px]"></div>
                </div>

                <div className="order-[-1]">
                  <div className="w-[100%] h-[440px] overflow-hidden bg-skeletonLoading rounded-[800px]"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewAboutUs;
