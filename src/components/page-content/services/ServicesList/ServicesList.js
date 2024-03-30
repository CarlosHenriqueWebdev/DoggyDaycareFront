import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Image from "next/image";
import Link from "next/link";
import { API_BASE_URL } from "../../../../../lib/config";

const GET_SERVICES_LIST_DATA = gql`
  query GetServicesListData {
    servicesCollections {
      data {
        id
        attributes {
          slug
          Title
          Description {
            children {
              text
            }
          }
          Image {
            data {
              attributes {
                formats {
                  small {
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

const ServicesList = () => {
  const { data } = useStrapiData(GET_SERVICES_LIST_DATA);
  const servicesData = data?.servicesCollections?.data;

  return (
    <div className="px-[24px] lg:px-[48px] mb-[72px]">
      <div className="max-container">
        {servicesData ? (
          <div>
            <h2 className="visually-hidden">
              Nossos Serviços de Cuidado para Cães
            </h2>

            <ul className="grid gap-x-[16px] gap-y-[32px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {servicesData.map((service, itemIndex) => (
                <li
                  key={service.id}
                  className="shadow-xl bg-[white] rounded-[12px]"
                >
                  <div className="overflow-hidden rounded-t-[12px]">
                    <Link
                      tabIndex="-1"
                      aria-hidden={true}
                      href={`/servicos/${service.attributes.slug}`}
                    >
                      <Image
                        className="w-full object-cover rounded-t-[12px] hover:scale-[1.2] transition-all"
                        src={`${API_BASE_URL + service.attributes.Image.data.attributes.formats.small.url}`}
                        alt={`Serviços Illustração ${itemIndex + 1}`}
                        width={0}
                        height={0}
                        unoptimized
                      />
                    </Link>
                  </div>
                  <div className="py-[24px] px-[16px] flex flex-col gap-[12px]">
                    <div className="flex flex-col gap-[8px]">
                      <h3 className="font-bold text-[black]">
                        {service.attributes.Title}
                      </h3>
                      <p className="text-limit text-black75">
                        {service.attributes.Description[0].children[0].text}
                      </p>
                    </div>
                    <Link
                      className="flex gap-2 items-center text-primaryBlue underline font-bold w-fit hover:brightness-[80%]"
                      href={`/servicos/${service.attributes.slug}`}
                    >
                      Leia mais sobre
                      <Image
                        aria-hidden={true}
                        className="w-[16px] h-[12px]"
                        src="right-arrow-icon.svg"
                        alt="Flecha Apontando para a Direita Icone"
                        width={0}
                        height={0}
                        unoptimized
                      />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div
              aria-hidden="true"
            >
              <ul className="grid gap-x-[16px] gap-y-[32px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => (
                  <li
                    key={index}
                    className="shadow-xl bg-black25 rounded-[12px]"
                  >
                    <div className="rounded-t-[12px]"></div>
                    <div className="py-[24px] px-[16px] flex flex-col gap-[12px]">
                      <div className="flex flex-col gap-[8px]">
                        <h2 className="text-skeletonLoading bg-skeletonLoading rounded-[8px]">
                          Lorem ipsum
                        </h2>
                        <p className="text-skeletonLoading bg-skeletonLoading rounded-[8px]">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Error illum voluptatibus harum quibusdam
                          excepturi necessitatibus? Eius doloribus labore aut
                          dicta optio, fugit est voluptatem soluta,
                          reprehenderit sit minima ab vitae.
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServicesList;
