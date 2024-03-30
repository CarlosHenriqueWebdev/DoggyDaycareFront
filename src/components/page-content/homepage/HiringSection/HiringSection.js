import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Button from "@/components/utils/Button";
import { API_BASE_URL } from "../../../../../lib/config";

const GET_HIRING_SECTION_DATA = gql`
  query GetHiringSectionData {
    contentMedia {
      data {
        attributes {
          JoinUs {
            BackgroundImage {
              data {
                attributes {
                  url
                }
              }
            }
            GlassOverlayTransparency
            Title
            Description
          }
        }
      }
    }
  }
`;

const HiringSection = () => {
  const { data } = useStrapiData(GET_HIRING_SECTION_DATA);
  const joinUsData = data?.contentMedia?.data?.attributes?.JoinUs;

  return (
    <div>
      {joinUsData ? (
        <div
          style={{
            backgroundImage: `url(${API_BASE_URL + joinUsData.BackgroundImage.data.attributes.url})`,
          }}
          className="bg-cover bg-center relative bg-fixed"
        >
          <div
            style={{
              backgroundColor: `rgba(0, 0, 0, 0.${joinUsData.GlassOverlayTransparency})`,
            }}
            className="px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-2 py-[72px] w-[100%] h-[100%] border-solid border-skyBlue border-t-[6px]"
          >
            <div className="flex flex-col gap-3 text-center sm:gap-[20px]">
              <h2 className="text-[1.25rem] sm:text-[1.5rem] text-skyBlue font-bold">
                {joinUsData.Title}
              </h2>
              <p className="text-[white] font-semibold max-w-[600px] mx-auto ">
                {joinUsData.Description[0].children[0].text}
              </p>
            </div>

            <div>
              <Button
                pageHref="/vagas"
                iconSrc="/double-paw-icon.svg"
                altText="Duas Patas Icone"
                buttonText="Junte-se a nós!"
                buttonClassName="mt-[24px] w-fit px-[32px] mx-auto !bg-blueForText border-navyBlue"
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="mt-[72px] text-skeletonLoading bg-black50 flex flex-col justify-center items-center relative gap-[16px] p-[32px]"
        >
          <h2 className="text-skeletonLoading bg-skeletonLoading text-center text-[1.5rem]  rounded-[8px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </h2>

          <p className="rounded-[8px] text-skeletonLoading bg-skeletonLoading font-semibold max-w-[600px] mx-auto ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            sint atque ad cumque quis maxime, voluptatibus exercitationem
            nostrum delectus ut modi asperiores repudiandae molestiae placeat
            non ipsa, ea nobis. Illo.
          </p>

          {/* Button Skeleton */}
          <div className="!w-[72%] mt-[24px] text-skeletonLoading bg-skeletonLoading rounded-[8px] max-w-[300px] h-[32px]"></div>
        </div>
      )}
    </div>
  );
};

export default HiringSection;
