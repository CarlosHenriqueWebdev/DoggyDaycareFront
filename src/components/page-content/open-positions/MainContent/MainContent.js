import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Image from "next/image";
import Link from "next/link";

const GET_MAIN_CONTENT = gql`
  query GetMainContent {
    openPositionsPage {
      data {
        attributes {
          MainContent {
            Title
          }
        }
      }
    }
  }
`;

const GET_OPEN_POSITIONS = gql`
  query GetOpenPositions {
    openPositions {
      data {
        id
        attributes {
          JobTitle
          publishedAt
          EmploymentType
          Experience
          JobLocation
          slug
        }
      }
    }
  }
`;

const MainContent = () => {
  const { data: dataContent } = useStrapiData(GET_MAIN_CONTENT);
  const { data: dataPositions } = useStrapiData(GET_OPEN_POSITIONS);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  return (
    <div className="px-[24px] lg:px-[48px]">
      <div className="max-container">
        {dataContent && dataPositions ? (
          <div className="flex flex-col gap-[48px]">
            <div className="relative flex flex-col gap-[16px]">
              <h2
                id="main-content"
                className="text-primaryBlue font-bold text-[1.5rem] sm:text-[1.75rem]"
              >
                {
                  dataContent.openPositionsPage.data.attributes.MainContent
                    .Title
                }
              </h2>

              <p className="max-w-[600px] font-medium text-[1rem] ">
                Vendo{" "}
                <span className="font-bold">
                  {dataPositions.openPositions.data.length} Posições Disponiveis
                </span>{" "}
                em todos Locais.
              </p>

              <Image
                aria-hidden={true}
                className="!absolute w-full md:!w-[50%] scale-y-[-1] -z-20 sm:px-[48px]"
                src="/dog-paws.webp"
                alt="Marcas de patas de cachorro"
                width="0"
                height="0"
                unoptimized
                priority={true}
              />
            </div>

            <ul className="grid gap-[16px]">
              {dataPositions.openPositions.data
                .slice()
                .sort(
                  (itemA, itemB) =>
                    new Date(itemB.attributes.publishedAt) -
                    new Date(itemA.attributes.publishedAt)
                )
                .map((mapItem) => (
                  <li key={mapItem.id}>
                    <Link
                      className="hover-effect flex flex-col gap-[24px] p-[24px] rounded-[8px] border-[3px] border-solid border-primaryBlue shadow-2xl bg-[white] hover:bg-midnightBlack hover:text-[white]"
                      href={`/vagas/${mapItem.attributes.slug}`}
                      aria-label={`Veja Detalhes sobre o Trabalho: ${mapItem.attributes.JobTitle}`}
                    >
                      <div className="flex flex-col gap-[8px]">
                        <h3 className="text-[1.125rem] font-medium">
                          {mapItem.attributes.JobTitle}
                        </h3>

                        <p className="text-black75 text-[12px] font-bold">
                          Postado em:{" "}
                          <span className="font-normal">
                            {formatDate(mapItem.attributes.publishedAt)}
                          </span>
                        </p>

                        <p className="text-black75 text-[12px] font-bold">
                          Tipo de Trabalho:{" "}
                          <span className="font-normal">
                            {mapItem.attributes.EmploymentType}
                          </span>
                        </p>

                        <p className="text-black75 text-[12px] font-bold">
                          Experiencia:{" "}
                          <span className="font-normal">
                            {mapItem.attributes.Experience}
                          </span>
                        </p>
                      </div>

                      <span className="hover-continuation uppercase text-[1rem] py-[6px] px-[16px] bg-skyBlue rounded-[8px] text-[white] font-bold text-center max-w-[300px] border-solid border-skyBlue border-[2px]">
                        {mapItem.attributes.JobLocation}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <>
            <div aria-hidden="true" className="mt-[72px] flex flex-col gap-7">
              <div className="flex flex-col gap-[12px] text-center">
                <div className="flex justify-center relative py-3">
                  <h1 className="w-fit text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.75rem] px-[24px] lg:px-[48px] ">
                    Lorem ipsum dolor sit
                  </h1>
                </div>

                <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] px-[24px] md:mx-auto md:w-[80%] lg:px-[48px] ">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Excepturi nesciunt natus unde dolorem voluptas. Sit
                  architecto, facere.
                </p>
              </div>
            </div>

            <div className="px-[24px] lg:px-[48px] grid gap-[16px] mt-[32px] text-skeletonLoading">
              {Array.from({ length: 8 }, (_, itemIndex) => (
                <div key={itemIndex}>
                  <div className="flex flex-col gap-[24px] p-[24px] rounded-[8px] bg-black25">
                    <div className="flex flex-col gap-[8px]">
                      <h3 className="w-fit  rounded-[8px]  bg-skeletonLoading text-[1.125rem] font-medium">
                        Lorem, ipsum dolor sit
                      </h3>

                      <p className="w-fit  rounded-[8px]  bg-skeletonLoading text-[12px]">
                        Lorem ipsum dolor
                      </p>

                      <p className="w-fit  rounded-[8px]  bg-skeletonLoading text-[12px]">
                        Lorem ipsum dolor
                      </p>

                      <p className="w-fit  rounded-[8px]  bg-skeletonLoading text-[12px]">
                        Lorem ipsum dolor
                      </p>
                    </div>

                    <span className="w-fit bg-skeletonLoading text-[1rem] py-[6px] px-[16px] rounded-[8px] text-[white]text-center max-w-[300px]">
                      Lorem ipsum dolor
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainContent;
