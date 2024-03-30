import React, { useState } from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import CountUp from "react-countup";
import { Waypoint } from "react-waypoint";
import { API_BASE_URL } from "../../../../../lib/config";

const GET_NUMBER_COUNTER_DATA = gql`
  query GetNumberCounterData {
    contentMedia {
      data {
        attributes {
          NumberCounter {
            CounterBackgroundImage {
              data {
                attributes {
                  url
                }
              }
            }
            GlassOverlayTransparency
            NumberCounterRepetable {
              id
              DurationInSeconds
              CounterAmount
              CounterSubtitle
            }
          }
        }
      }
    }
  }
`;

const NumberCounter = () => {
  const { data } = useStrapiData(GET_NUMBER_COUNTER_DATA);
  const numberCounterData = data?.contentMedia?.data?.attributes?.NumberCounter;

  const [startAnimation, setStartAnimation] = useState(false);

  const handleEnter = () => {
    setStartAnimation(true);
  };

  return (
    <>
      {numberCounterData ? (
        <div
          style={{
            backgroundImage: `url(${
              API_BASE_URL +
              numberCounterData.CounterBackgroundImage.data.attributes.url
            })`,
          }}
          className="bg-cover bg-center relative bg-fixed"
        >
          <h2 className="visually-hidden">Estatísticas do Nosso Sucesso</h2>

          <div
            style={{
              backgroundColor: `rgba(0, 0, 0, 0.${numberCounterData.GlassOverlayTransparency})`,
            }}
            className="mt-[72px] md:py-[4%] py-[12%] w-[100%] h-[100%] border-solid border-crimsonRed border-y-[6px]"
          >
            <div className="px-[24px] lg:px-[48px] ">
              <ul className="max-container flex flex-col gap-2 items-center justify-center md:gap-[16px] lg:grid lg:grid-cols-3">
                {numberCounterData.NumberCounterRepetable.map((mapItem) => (
                  <li
                    key={mapItem.id}
                    className="w-full text-center p-4 border-4 border-solid border-deepMaroon bg-midnightBlack"
                  >
                    <Waypoint onEnter={handleEnter} />

                    <h3 className="flex gap-1 flex-col">
                      <CountUp
                        className="text-crimsonRed font-black text-[1.25rem] sm:text-[1.5rem]"
                        duration={mapItem.DurationInSeconds}
                        end={mapItem.CounterAmount}
                        start={startAnimation}
                      />

                      <span className="font-semibold text-white75 ">
                        {mapItem.CounterSubtitle}
                      </span>
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="bg-skeletonLoading relative bg-fixed"
        >
          <div className="px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-2 items-center justify-center py-[12%] w-[100%] h-[100%] md:gap-[16px] md:py-[4%] lg:grid lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="w-full flex gap-1 flex-col items-center p-4 bg-white50 rounded-[12px]"
              >
                <span className="text-skeletonLoading bg-skeletonLoading rounded-[12px] w-fit font-black text-[1.5rem] ">
                  Lorem
                </span>

                <span className="text-skeletonLoading bg-skeletonLoading rounded-[12px] w-fit ">
                  Lorem ipsum
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NumberCounter;
