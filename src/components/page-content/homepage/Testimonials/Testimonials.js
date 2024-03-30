import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/utils/Button";
import { API_BASE_URL } from "../../../../../lib/config";

const GET_TESTIMONIALS_DATA = gql`
  query GetTestimonialsData {
    contentMedia {
      data {
        attributes {
          Testimonials {
            Title
            Description
            Image {
              data {
                attributes {
                  formats
                }
              }
            }
            GlassOverlayTransparency
          }
        }
      }
    }
  }
`;

const Testimonials = ({ extraClassName, skeletonClassName, handleImageClick }) => {
  const { data } = useStrapiData(GET_TESTIMONIALS_DATA);
  const testimonials = data?.contentMedia?.data?.attributes?.Testimonials;

  return (
    <>
      {testimonials ? (
        <div className={`w-full mt-[72px] bg-[url(/pattern.webp)] bg-repeat text-[white] px-[24px] py-[72px] lg:px-[48px] ${extraClassName}`}>
          <div className={`max-container flex flex-col gap-9 lg:grid lg:grid-cols-2 lg:items-center`}>
            <div className="flex flex-col gap-4 xl:gap-5 sm:text-center sm:items-center lg:text-start lg:items-start">
              <h2 className="font-bold text-[1.25rem] sm:text-[1.5rem]">{testimonials.Title}</h2>
              <p className="font-semibold sm:max-w-[600px]">{testimonials.Description[0].children[0].text}</p>
              <Button
                pageHref="/depoimentos"
                iconSrc="/eye-icon.svg"
                altText="Olho Icone"
                buttonText="Veja a historia de nossos clientes"
                buttonClassName="!mt-[24px] !bg-blueForText border-navyBlue px-[28px] sm:w-fit sm:py-[16px] sm:px-[24px]"
              />
            </div>
            <Link tabIndex={-1} href={"/depoimentos"} className="block relative rounded-[12px] mx-auto sm:max-w-[600px] border-solid border-skyBlue border-[4px] xl:width-[88%] xl:max-w-[100%]">
              <Image
                aria-hidden={true}
                className="w-full rounded-[12px]"
                src={`${API_BASE_URL + testimonials.Image.data.attributes.formats.small.url}`}
                alt="Depoimentos Illustração"
                width="0"
                height="0"
                unoptimized
                onClick={() => handleImageClick(1)}
              />
              <div style={{ backgroundColor: `rgba(0, 0, 0, 0.${testimonials.GlassOverlayTransparency})` }} className="w-full h-full absolute top-0 rounded-[12px] bg-transparent-hover hover:scale-[1.2] transition-all"></div>
            </Link>
          </div>
        </div>
      ) : (
        <div aria-hidden="true" className={`bg-black25 mt-[72px] text-[white] flex flex-col py-[8%] gap-9 px-[24px] md:py-[4%] lg:px-[48px] lg:grid lg:grid-cols-2 lg:items-center ${skeletonClassName}`}>
          <div className="flex flex-col gap-4 xl:gap-5 sm:text-center sm:items-center lg:text-start lg:items-start">
            <h2 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] w-fit text-[1.75rem]">Lorem ipsum, dolor sit amet.</h2>
            <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px]  sm:max-w-[600px]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque pariatur quod tempore fugit! Corrupti aliquid minus necessitatibus.</p>
            <div className="!w-[72%] mt-[24px] text-skeletonLoading bg-skeletonLoading rounded-[12px] h-[28px]"></div>
          </div>
          <div className="h-[200px] w-full mx-auto bg-skeletonLoading lg:w-full lg:h-full rounded-[12px]"></div>
        </div>
      )}
    </>
  );
};

export default Testimonials;
