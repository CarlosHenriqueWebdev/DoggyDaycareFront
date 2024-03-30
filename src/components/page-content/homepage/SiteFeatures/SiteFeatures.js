import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Image from "next/image";
import { API_BASE_URL } from "../../../../../lib/config";

const GET_SITE_FEATURES_DATA = gql`
  query GetSiteFeaturesData {
    contentMedia {
      data {
        attributes {
          SiteFeatures {
            FeaturesRepetable {
              id
              FeatureTitle
              FeatureDescription
              FeatureIcon {
                data {
                  attributes {
                    url
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

const SiteFeatures = () => {
  const { data } = useStrapiData(GET_SITE_FEATURES_DATA);
  const features = data?.contentMedia?.data?.attributes?.SiteFeatures?.FeaturesRepetable;

  return (
    <div className="px-[24px] lg:px-[48px]">
      {features ? (
        <div className="max-container">
          <h2 id="main-content" className="visually-hidden">
            Recursos Especiais do nosso Site
          </h2>

          <ul className=" gap-11 grid relative md:justify-items-center lg:grid-cols-3 lg:gap-7">
            <Image
              aria-hidden={true}
              className="!absolute w-full md:!w-[50%]"
              src="/dog-paws.webp"
              alt="Marcas de patas de cachorro"
              width="0"
              height="0"
              unoptimized
              priority={true}
            />

            {features.map((feature, itemIndex) => (
              <li
                className="grid justify-items-center text-center gap-2 z-[100] h-fit md:gap-3"
                key={feature.id}
              >
                <h3 className="text-primaryBlue text-[1.25rem] sm:text-[1.5rem] font-bold uppercase">
                  {feature.FeatureTitle}
                </h3>

                <div className="p-4 rounded-[100%] border-[3px] border-solid border-primaryBlue bg-midnightBlack">
                  <Image
                    aria-hidden={true}
                    className="h-[40px] w-[40px] sm:h-[48px] sm:w-[48px] xl:h-[60px] xl:w-[60px]"
                    src={`${API_BASE_URL + feature.FeatureIcon.data.attributes.url}`}
                    alt={`Icone ${itemIndex}`}
                    width="48"
                    height="48"
                    unoptimized
                  />
                </div>

                <p className="font-medium">{feature.FeatureDescription}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="  gap-11 grid relative md:justify-items-center lg:grid-cols-3 lg:gap-7"
        >
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="grid justify-items-center text-center gap-2 z-[100] h-fit md:gap-3"
            >
              <h3 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-2xl font-bold uppercase">
                Lorem ipsum dolor
              </h3>

              <div className="p-4 rounded-[100%] bg-midnightBlack">
                <div className="h-[48px] w-[48px] xl:h-[60px] xl:w-[60px]"></div>
              </div>

              <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] font-medium">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit officiis temporibus excepturi, doloremque quidem
                recusandae.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SiteFeatures;
