import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import HeroSection from "@/components/common/HeroSection/HeroSection";

const GET_SERVICES_HERO_DATA = gql`
  query GetServicesHeroData {
    servicesPage {
      data {
        attributes {
          HeroBaseUtils {
            BackgroundImage {
              data {
                attributes {
                  url
                }
              }
            }
            BackgroundPosition
            BackgroundOverlay
            HeroText {
              Title
              Description
            }
          }
        }
      }
    }
  }
`;

const ServicesHero = () => {
  const { data } = useStrapiData(GET_SERVICES_HERO_DATA);
  const heroData = data?.servicesPage?.data?.attributes?.HeroBaseUtils;

  return (
    <>
      {heroData ? (
        <HeroSection
          extraClassName="after:!bg-none"
          backgroundImage={`${heroData.BackgroundImage.data.attributes.url}`}
          backgroundPosition={heroData.BackgroundPosition}
          backgroundOverlay={heroData.BackgroundOverlay}
          title={heroData.HeroText.Title}
          description={heroData.HeroText.Description}
        />
      ) : (
        <div aria-hidden="true" className="relative">
          <div className="mb-[72px] bg-black75 h-[70vh]">
            <div
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -60%)",
              }}
              className="absolute text-skeletonLoading text-center flex flex-col gap-[12px] bg-skeletonLoading rounded-[8px] border-solid border-skeletonLoading border-[2px] p-[16px] select-none"
            >
              <h1 className="text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem] text-skeletonLoading">
                Lorem ipsum
              </h1>
              <p className="hidden lg:block text-[1rem] text-skeletonLoading">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Sapiente tempore perferendis consectetur unde ad velit nisi
                necessitatibus
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesHero;
