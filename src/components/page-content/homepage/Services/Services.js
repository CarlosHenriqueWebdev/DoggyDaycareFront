import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Image from "next/image";
import Button from "@/components/utils/Button";
import { API_BASE_URL } from "../../../../../lib/config";

const GET_SERVICES_DATA = gql`
  query GetServicesData {
    servicesCollections {
      data {
        id
        attributes {
          Title
          Description
          slug
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
    contentMedia {
      data {
        attributes {
          ServicesSection {
            SectionTitle
          }
        }
      }
    }
  }
`;

const Services = ({ handleImageClick }) => {
  const { data } = useStrapiData(GET_SERVICES_DATA);
  const servicesData = data?.servicesCollections?.data;
  const sectionTitle =
    data?.contentMedia?.data?.attributes?.ServicesSection?.SectionTitle;

  return (
    <div className="px-[24px] lg:px-[48px] mt-[72px]">
      <div className="max-container">
        {servicesData && sectionTitle ? (
          <div className="flex flex-col gap-4 md:gap-8">
            <h2 className="text-primaryBlue font-bold text-[1.25rem] sm:text-[1.5rem]">
              {sectionTitle}
            </h2>

            <hr
              aria-hidden="true"
              className="border-lightBlue border-t-[6px]"
            />

            <div className="flex flex-col gap-[60px] md:gap-12">
              {servicesData.map((service, itemIndex) => (
                <div key={service.id}>
                  <div
                    className={`flex flex-col gap-8 md:grid md:gap-8 md:items-center ${
                      itemIndex % 2 === 0
                        ? "md-grid-cols-2fr-1fr"
                        : "md-grid-cols-1fr-2fr"
                    }`}
                  >
                    <div
                      className={`flex flex-col gap-3 md:order-1 xl:gap-4 ${
                        itemIndex % 2 === 0 ? "md:order-[1]" : "md:order-[0]"
                      }`}
                    >
                      <h3 className="text-primaryBlue font-bold text-[1.125rem] sm:text-[1.25rem]">
                        {service.attributes.Title}
                      </h3>

                      <p className="font-medium ">
                        {service.attributes.Description[0].children[0].text}
                      </p>

                      <Button
                        pageHref={`/servicos/${service.attributes.slug}`}
                        buttonText="Veja mais sobre"
                        iconSrc="/paw-icon.svg"
                        altText="Pata de cachorro Icone"
                        buttonClassName="xl:mt-[24px]"
                      />
                    </div>

                    <div className="overflow-hidden rounded-[8px] border-solid border-primaryBlue border-[4px]">
                      <Image
                        aria-hidden={true}
                        className="w-full cursor-zoom-in hover:scale-[1.2] transition-all"
                        src={`${API_BASE_URL + service.attributes.Image.data.attributes.formats.small.url}`}
                        alt={`Illustração Serviço ${itemIndex}`}
                        width="0"
                        height="0"
                        unoptimized
                        onClick={() => handleImageClick(itemIndex + 2)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr
              aria-hidden="true"
              className="border-lightBlue border-t-[6px]"
            />
          </div>
        ) : (
          <div aria-hidden="true" className=" flex flex-col gap-4 md:gap-8">
            <h2 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.75rem]">
              Lorem ipsum dolor
            </h2>

            <div className="flex flex-col gap-8 md:gap-12">
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

                    {/* Button Skeleton */}
                    <div className="!w-[72%] mt-[24px] text-skeletonLoading bg-skeletonLoading rounded-[12px] h-[28px]"></div>
                  </div>

                  {/* Image Skeleton */}
                  <div className="h-[200px] w-[300px] mx-auto bg-skeletonLoading lg:w-full lg:h-full rounded-[12px]"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
