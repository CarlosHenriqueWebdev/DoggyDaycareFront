import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Button from "@/components/utils/Button";

const GET_CALL_TO_ACTION_BOOKING = gql`
  query GetCallToActionBooking {
    aboutPage {
      data {
        attributes {
          CallToAction {
            Title
            Description
          }
        }
      }
    }
  }
`;

const CallToActionBooking = () => {
  const { data } = useStrapiData(GET_CALL_TO_ACTION_BOOKING);

  const ctaData = data?.aboutPage?.data?.attributes?.CallToAction;

  return (
    <>
      {ctaData ? (
        <>
          <div className="bg-[url(/pattern.webp)] bg-repeat text-[white] flex flex-col py-[72px] gap-9 px-[24px] lg:px-[48px] lg:items-center border-solid border-[black] border-t-[4px]">
            <div className="max-container flex flex-col gap-4 xl:gap-5 md:text-center md:items-center">
              <h2 className="w-full font-bold text-[1.5rem] sm:text-[1.75rem]">
                {ctaData.Title}
              </h2>

              <p className="font-semibold  sm:max-w-[600px] md:mx-auto">
                {ctaData.Description[0].children[0].text}
              </p>

              <Button
                pageHref="/mapa"
                iconSrc="/map-icon.svg"
                altText="Mapa Icone"
                buttonText="Encontrar Localizações Próximas"
                buttonClassName="!mt-[24px] px-[28px] sm:w-fit sm:py-[16px] sm:px-[24px] md:mx-auto"
              />
            </div>
          </div>
        </>
      ) : (
        <div
          aria-hidden="true"
          className="text-skeletonLoading bg-black50 flex flex-col justify-center items-center relative gap-[16px] p-[32px]"
        >
          <h1 className="text-skeletonLoading bg-skeletonLoading text-center text-[1.5rem]  rounded-[8px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </h1>

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
    </>
  );
};

export default CallToActionBooking;
