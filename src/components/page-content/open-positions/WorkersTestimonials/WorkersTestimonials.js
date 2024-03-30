import { useState, useEffect } from "react";
import Head from "next/head";
import YouTube from "react-youtube";
import Image from "next/image";
import useStrapiData from "@/hooks/useStrapiData";
import { API_BASE_URL } from "../../../../../lib/config";
import { gql } from "@apollo/client";

const GET_WORKERS_TESTIMONIALS = gql`
  query GetWorkersTestimonials {
    openPositionsPage {
      data {
        attributes {
          WokersTestimonials {
            BackgroundImage {
              data {
                attributes {
                  formats
                }
              }
            }
            BackgroundPosition
            YoutubeVideoID
          }
        }
      }
    }
  }
`;

const WorkersTestimonials = () => {
  const { data } = useStrapiData(GET_WORKERS_TESTIMONIALS);
  const testimonialsData =
    data?.openPositionsPage?.data?.attributes?.WokersTestimonials;

  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [adBlockerDetected, setAdBlockerDetected] = useState(false);

  useEffect(() => {
    if (!player) return;

    const checkAdBlocker = () => {
      if (player.getPlayerState() === -1) {
        setAdBlockerDetected(true);
      }
    };

    const interval = setInterval(checkAdBlocker, 1000);
    return () => clearInterval(interval);
  }, [player]);

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const playVideo = () => {
    if (player) {
      const playerState = player.getPlayerState();

      if (playerState !== window.YT.PlayerState.PLAYING) {
        player.playVideo();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div>
      <Head>
        <style>{`
          iframe {
            width: 100%;
            height: 70vh;
          }
        `}</style>
      </Head>
      {testimonialsData ? (
        <div className="mt-[72px]">
          <div
            style={{
              backgroundImage: `url(${
                API_BASE_URL +
                testimonialsData.BackgroundImage.data.attributes.formats.small
                  .url
              })`,
              backgroundPosition: testimonialsData.BackgroundPosition,
            }}
            className={`bg-midnightBlack bg-no-repeat bg-cover border-solid border-[black] border-t-[4px] ${
              isPlaying ? "hidden" : "block"
            }`}
          >
            <div
              style={{
                backgroundColor: `rgba(0, 0, 0, 0.7)`,
              }}
              className="flex flex-col gap-2 items-center justify-center w-[100%] h-[70vh]"
            >
              <button className="hover-effect01" onClick={playVideo}>
                <h2 className="text-[white] text-center font-bold text-[1.5rem] sm:text-[1.75rem]">
                  <span className="text-crimsonRed">Escute</span> dos nossos{" "}
                  <br aria-hidden="true" />{" "}
                  <span className="text-skyBlue">Trabalhadores</span>!
                </h2>

                <Image
                  aria-hidden={true}
                  className="block h-[80px] w-full"
                  src={`/play-button.svg`}
                  alt="Botão de Video Play"
                  width="0"
                  height="0"
                  unoptimized
                />
              </button>
            </div>
          </div>

          <div
            className={`video-container w-full ${
              !isPlaying ? "!hidden" : "!block"
            }`}
          >
            {adBlockerDetected ? (
              <p>Ad blocker detected. Please disable it to watch the video.</p>
            ) : (
              <YouTube
                videoId={testimonialsData.YoutubeVideoID}
                opts={{
                  playerVars: {
                    autoplay: 0,
                    controls: 1,
                  },
                }}
                onReady={onReady}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          <div aria-hidden="true">
            <div className="bg-skeletonLoading h-[70vh]"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkersTestimonials;
