import React from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import Head from "next/head";
import Image from "next/image";
import YouTube from "react-youtube";
import CallToActionBooking from "@/components/common/CallToAction/CallToActionBooking";
import { API_BASE_URL } from "../../lib/config";

const GET_TESTIMONIALS_PAGE = gql`
  query GetTestimonialsPage {
    testimonialsPage {
      data {
        attributes {
          Title
          Description
          TestimonialsRepeatable {
            id
            Name
            TestimonialText
            YoutubeVideoID
            ProfilePicture {
              data {
                attributes {
                  formats
                }
              }
            }
          }
        }
      }
    }
  }
`;

const TestimonialsPage = () => {
  const { data } = useStrapiData(GET_TESTIMONIALS_PAGE);

  const testimonialsData = data?.testimonialsPage?.data?.attributes;

  return (
    <div>
      <Head>
        <title>Depoimentos | Doggy Daycare</title>
        <meta
          name="description"
          content="Veja os depoimentos de clientes satisfeitos com os serviços incríveis da Doggy Daycare. Descubra por que somos a escolha perfeita para o cuidado do seu cão."
        />
        <style>{`
          iframe {
            width: 100%;
          }
        `}</style>
      </Head>

      <NavBar />

      <div className="px-[24px] lg:px-[48px] py-[72px] bg-[black]">
        <div className="overflow-hidden max-container">
          {testimonialsData ? (
            <div className="w-full overflow-hidden text-[black]">
              <div className="relative z-10 grid gap-[8px]">
                <h1
                  id="main-content"
                  className="text-[white] text-[1.5rem] font-bold uppercase"
                >
                  {testimonialsData.Title}
                </h1>
                <p className="text-white75 text-[1.125rem] font-bold">
                  {testimonialsData.Description}
                </p>
              </div>
              <ul className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-[12px] mt-[24px]">
                {testimonialsData.TestimonialsRepeatable.map(
                  (mapItem, itemIndex) => (
                    <li
                      className="w-full h-fit text-[white] bg-[black] rounded-[8px] grid gap-[24px]"
                      key={mapItem.id}
                    >
                      <div className="gradient-blue-red px-[4px] pb-[4px] rounded-b-[8px]">
                        <div className="px-[16px] pb-[16px] pt-[12px] grid gap-[12px] bg-[black] rounded-b-[8px]">
                          <h2 className="gradient-blue-red-test text-[1.25rem] font-bold flex items-center gap-[8px]">
                            <Image
                              aria-hidden={true}
                              className="border-solid border-crimsonRed border-[2px] w-[40px] h-[40px] block rounded-[100%] object-cover"
                              src={`${
                                API_BASE_URL +
                                mapItem.ProfilePicture.data.attributes.formats
                                  .small.url
                              }`}
                              alt={`Perfil do Usuario ${itemIndex + 1}`}
                              width={0}
                              height={0}
                              unoptimized
                            />
                            {mapItem.Name}
                          </h2>
                          <p className="">
                            <span className="text-primaryBlue text-[1.125rem]">
                              ❝
                            </span>
                            {mapItem.TestimonialText}
                            <span className="text-primaryBlue text-[1.125rem]">
                              ❞
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="gradient-blue-red px-[4px] pt-[4px] rounded-t-[8px] order-[-1]">
                        <div className="relative w-full h-[300px] object-cover rounded-t-[8px] overflow-hidden">
                          <YouTube
                            id={`myVideo${itemIndex}`}
                            className="w-full h-full object-cover bg-midnightBlack"
                            videoId={mapItem.YoutubeVideoID}
                            opts={{
                              playerVars: {
                                autoplay: 0,
                                controls: 1,
                              },
                            }}
                          />
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : (
            <div>
              <h1 className="w-fit rounded-[8px] text-skeletonLoading bg-skeletonLoading text-center font-bold text-[1.75rem]">
                Lorem ipsum dolor
              </h1>
              <p className="w-fit rounded-[8px] text-skeletonLoading bg-skeletonLoading text-center font-bold mt-[12px] mb-[36px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ex
                dicta numquam quisquam minus hic dolor nobis minima voluptas
                magnam.
              </p>
              <div className="md:columns-2 lg:columns-3">
                {Array.from({ length: 3 }, (_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="mb-[16px] p-[4px] break-inside-avoid rounded-[12px]"
                  >
                    <div className="flex flex-col rounded-[12px] gap-2 md:gap-3 bg-skeletonLoading p-[24px] text-[white] h-[400px]"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <CallToActionBooking />
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
