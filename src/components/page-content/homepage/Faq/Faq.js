import React, { useState } from "react";
import { gql } from "@apollo/client";
import useStrapiData from "@/hooks/useStrapiData";
import Image from "next/image";
import Link from "next/link";

const GET_FAQ_DATA = gql`
  query GetFaqData {
    contentMedia {
      data {
        attributes {
          FrequentlyAskedQuestions {
            SectionTitle
            QuestionsAndAnswers {
              id
              Question
              Answer
            }
            ContactUsText
            ContactUsLinkOutlinedText
          }
        }
      }
    }
  }
`;

const Faq = () => {
  const { data } = useStrapiData(GET_FAQ_DATA);
  const faqData =
    data?.contentMedia?.data?.attributes?.FrequentlyAskedQuestions;

  // State to manage visibility of all answers
  const [openQuestions, setOpenQuestions] = useState([]);

  const toggleQuestion = (id) => {
    setOpenQuestions((previousOpenQuestions) =>
      previousOpenQuestions.includes(id)
        ? previousOpenQuestions.filter((previousId) => previousId !== id)
        : [...previousOpenQuestions, id]
    );
  };

  return (
    <div className="px-[24px] lg:px-[48px] mt-[72px] mb-[72px]">
      <div className="max-container">
        {faqData ? (
          <div className="flex flex-col gap-4">
            <h2 className="text-primaryBlue font-bold text-[1.25rem] sm:text-[1.5rem]">
              {faqData.SectionTitle}
            </h2>

            <hr aria-hidden="true" className="border-black25" />

            <ul className="flex flex-col gap-2">
              {faqData.QuestionsAndAnswers.map((mapItem) => (
                <li key={mapItem.id}>
                  <button
                    aria-expanded={openQuestions.includes(mapItem.id)}
                    className={`text-shadow-black-light bg-primaryBlue text-[white] font-bold  w-full text-left pl-[16px] pr-[16px] pt-[12px] pb-[12px] flex flex-row gap-3 items-center justify-between hover:text-white90 `}
                    onClick={() => toggleQuestion(mapItem.id)}
                  >
                    {mapItem.Question}

                    {openQuestions.includes(mapItem.id) ? (
                      <Image
                        aria-hidden="true"
                        className="w-[16px] xl:w-[18px]"
                        src="/minus-icon.svg"
                        alt="Icone Menos"
                        width="0"
                        height="0"
                        unoptimized
                      />
                    ) : (
                      <Image
                        aria-hidden="true"
                        className="w-[16px] xl:w-[18px]"
                        src="/plus-icon.svg"
                        alt="Icone Mais"
                        width="0"
                        height="0"
                        unoptimized
                      />
                    )}
                  </button>

                  <div
                    className={`transition-max-height max-h-0 overflow-hidden ${
                      openQuestions.includes(mapItem.id)
                        ? "!max-h-[500px] bg-navyBlue text-[white]"
                        : "bg-navyBlue text-[white]"
                    }`}
                    aria-hidden={!openQuestions.includes(mapItem.id)}
                  >
                    <p className="w-full text-left pl-[16px] pr-[16px] pt-[12px] pb-[12px]">
                      {mapItem.Answer}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <hr aria-hidden="true" className="border-black25" />

            <div className="font-bold ">
              <p className="flex gap-[4px] flex-col md:flex-row">
                {faqData.ContactUsText}
                {"  "}
                <Link
                  className="text-primaryBlue hover:underline"
                  href="/contato"
                >
                  {faqData.ContactUsLinkOutlinedText}
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div aria-hidden="true" className="flex flex-col gap-4">
            <h2 className="w-fit text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.75rem]">
              Lorem ipsum dolor sit amet consectetur
            </h2>

            <hr aria-hidden="true" className="border-skeletonLoading" />

            <ul className="flex flex-col gap-2">
              {Array.from({ length: 3 }, (_, itemIndex) => (
                <li key={itemIndex}>
                  <div
                    className={`text-skeletonLoading bg-skeletonLoading rounded-[12px] w-full text-left pl-[16px] pr-[16px] pt-[12px] pb-[12px] flex flex-row gap-3 items-center `}
                  >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit
                  </div>
                </li>
              ))}
            </ul>

            <hr aria-hidden="true" className="border-black25" />

            <p className="w-fit text-skeletonLoading bg-skeletonLoading rounded-[12px] ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem
              necessitatibus aut accusantium totam quibusdam ut provident sed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faq;
