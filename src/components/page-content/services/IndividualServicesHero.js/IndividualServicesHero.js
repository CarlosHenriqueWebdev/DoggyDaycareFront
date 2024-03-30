
import React from "react";
import { API_BASE_URL } from "../../../../../lib/config";

const IndividualServicesHero = ({ contentData01 }) => {
  return (
    <>
      {contentData01.data && (
        <>
          {contentData01.data?.map((mapItem) => (
            <div
              key={mapItem.id}
              style={{
                backgroundImage: `url(${API_BASE_URL + mapItem.attributes.Image.data.attributes.url})`,
                backgroundPosition: `${mapItem.attributes.BackgroundPosition}`,
              }}
              className={`hero-shadow bg-cover mb-[72px] bg-skeletonLoading w-full bg-no-repeat relative border-b-[6px] border-solid border-skyBlue h-[70vh]`}
            ></div>
          ))}
        </>
      )}
    </>
  );
};

export default IndividualServicesHero;
