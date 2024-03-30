import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Button from "@/components/utils/Button";

const GET_CALL_TO_ACTION_CONTACT = gql`
  query GetCallToActionContact {
    openPositionsPage {
      data {
        attributes {
          CallToActionContact {
            Title
            Description
          }
        }
      }
    }
  }
`;

const CallToActionContact = ({ extraClassName }) => {
  const { data } = useStrapiData(GET_CALL_TO_ACTION_CONTACT);

  const ctaData = data?.openPositionsPage?.data?.attributes?.CallToActionContact;

  return (
    <>
      {ctaData ? (
        <>
          <div
            className={`bg-[url('/pattern-black.png')] text-[black] flex flex-col py-[72px] gap-9 px-[24px] lg:px-[48px] border-solid border-[black] border-t-[4px] ${extraClassName}`}
          >
            <div className="max-container w-full flex flex-col gap-4 xl:gap-5">
              <h2 className="font-bold text-[1.5rem] sm:text-[1.75rem]">
                {ctaData.Title}
              </h2>

              <p
                className={`font-bold sm:max-w-[600px] md:w-[600px] ${extraClassName}`}
              >
                {ctaData.Description[0].children[0].text}
              </p>

              <Button
                pageHref="/contato"
                iconSrc="/phone-icon.svg"
                altText="Telefóne Icone"
                buttonText="Enviar Mensagem"
                buttonClassName={`!mt-[24px] px-[28px] sm:w-fit sm:py-[16px] sm:px-[24px] !bg-midnightBlack border-navyBlue ${extraClassName}`}
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

export default CallToActionContact;
