import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Image from "next/image";
import { API_BASE_URL } from "../../../../../lib/config";

const GET_QUOTE_DATA = gql`
  query GetQuoteData {
    contentMedia {
      data {
        attributes {
          QuoteDivider {
            BackgroundImage {
              data {
                attributes {
                  url
                }
              }
            }
            GlassOverlayTransparency
            Quote
          }
        }
      }
    }
  }
`;

const Quote = () => {
  const { data } = useStrapiData(GET_QUOTE_DATA);
  const quoteData = data?.contentMedia?.data?.attributes?.QuoteDivider;

  return (
    <>
      {quoteData ? (
        <div className="mt-[72px]">
          <div
            style={{
              backgroundImage: `url(${
                API_BASE_URL + quoteData.BackgroundImage.data.attributes.url
              })`,
            }}
            className="bg-no-repeat bg-cover bg-center flex justify-center items-center relative bg-fixed border-solid border-lightBlue border-y-[6px]"
          >
            <div
              style={{
                backgroundColor: `rgba(0, 0, 0, 0.${quoteData.GlassOverlayTransparency})`,
              }}
              className="w-[100%] h-[100%] px-[24px] lg:px-[48px]"
            >
              <div className="max-container">
                <blockquote
                  aria-hidden="true"
                  className="text-center text-shadow-black text-[1.25rem] sm:text-[1.5rem] py-[72px] font-bold text-[white]"
                >
                  {quoteData.Quote}{" "}
                </blockquote>

                <Image
                  aria-hidden={true}
                  style={{
                    top: "100%",
                    left: "50%",
                    transform: "translate(-50%, -45%)",
                  }}
                  className="absolute w-[200px] md:w-[300px]"
                  src="/trail-and-ball.svg"
                  alt="Bolinha de tennis"
                  width="0"
                  height="0"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className=" bg-black25 mt-[72px] text-skeletonLoading bg-skeletonLoading rounded-[12px] flex justify-center items-center relative"
        >
          <h2 className="text-skeletonLoading bg-skeletonLoading text-center text-[1.5rem]  my-[12%] rounded-[12px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </h2>
        </div>
      )}
    </>
  );
};

export default Quote;
