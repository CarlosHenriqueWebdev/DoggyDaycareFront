// KenBurnsSlideshow.js

import useDataFetching from "@/hooks/useDataFetching";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { API_BASE_URL } from "../../../../../lib/config";

const KenBurnsSlideshow = () => {
  const urlToFetch =
  API_BASE_URL + "/api/open-positions-page?populate[SeeAboutUs][populate]=*";
  const { completeDataJSON: contentData } = useDataFetching(urlToFetch);

  // Use the fetched image URLs if available
  const images =
    contentData.data &&
    contentData.data.attributes.SeeAboutUs.ImageKenBurns.data &&
    contentData.data.attributes.SeeAboutUs.ImageKenBurns.data.map(
      (mapItem) => `${API_BASE_URL + mapItem.attributes.url}`
    );

  const getRandomDirection = () => {
    const directions = [
      "scale(1.2) translate(5%, 5%)",
      "scale(1.2) translate(-5%, -5%)",
      "scale(1.2) translate(0, 0)",
    ];
    return directions[Math.floor(Math.random() * directions.length)];
  };

  const [index, setIndex] = useState(0);

  const props = useSpring({
    from: { transform: getRandomDirection() },
    to: { transform: "scale(1) translate(0, 0)" },
    reset: true,
    config: { duration: 5000 },
    onRest: () => setIndex((index + 1) % (images?.length || 1)), // Added a safeguard here
  });

  return (
    <>
      {contentData.data ? (
        <div className="blob-shape relative w-[100%] h-[440px] overflow-hidden border-solid border-[black] border-[4px] rounded-[800px]">
          <div>
            {images?.map((image, i) => (
              <animated.img
                aria-hidden={true}
                key={i}
                src={`${image}`} // Assuming your images are in the 'public/images' folder
                alt={`Ken Burns Illustração ${i}`}
                className="w-full h-full absolute object-cover"
                style={{
                  zIndex: i === index ? 1 : 0,
                  ...props,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default KenBurnsSlideshow;
