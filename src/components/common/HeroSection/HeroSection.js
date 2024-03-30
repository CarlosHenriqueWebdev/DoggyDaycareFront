import React from "react";
import HeroTextBox from "../../utils/HeroTextBox";
import { API_BASE_URL } from "../../../../lib/config";

const HeroSection = ({
  backgroundImage,
  backgroundPosition,
  backgroundOverlay,
  title,
  description,
  extraClassName,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${API_BASE_URL + backgroundImage})`,
        backgroundPosition: `${backgroundPosition}`,
      }}
      className={`bg-cover mb-[72px] h-full bg-midnightBlack w-full bg-no-repeat relative border-b-[6px] border-solid border-skyBlue ${extraClassName}`}
    >
      <div
        style={{
          backgroundColor: `rgba(0, 0, 0, 0.${backgroundOverlay})`,
        }}
        className="h-[70vh] flex justify-center items-center"
      >
        <HeroTextBox title={title} description={description} />
      </div>
    </div>
  );
};

export default HeroSection;
