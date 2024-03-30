import React from "react";

const HeroTextBox = ({ title, description }) => {
  return (
    <div
      className="px-[24px] lg:px-[48px] absolute w-full"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="px-[24px] py-[16px] w-fit max-container shadow-2xl font-black  text-[white] text-center flex flex-col gap-[12px] bg-[black] rounded-[8px] border-solid border-skyBlue border-[2px] select-none">
        <h1 className="text-[1.5rem] text-primaryBlue">{title}</h1>

        <p className="hidden lg:block text-[1rem] gradient-blue-red-test">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeroTextBox;
