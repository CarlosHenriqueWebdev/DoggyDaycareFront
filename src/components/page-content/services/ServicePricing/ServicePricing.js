import Button from "@/components/utils/Button";
import Image from "next/image";
import React, { useState } from "react";

const ServicePricing = ({ contentData03 }) => {
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
    <div className="px-[24px] lg:px-[48px] mb-[72px]">
      {contentData03.data && (
        <div className="max-container flex flex-col gap-[24px]">
          <div>
            <h2 className="w-fit text-[black] font-bold text-[1.25rem] sm:text-[1.5rem]">
              Preços:
            </h2>
          </div>

          <div>
            <div className="flex flex-col shadow-xl">
              <ul
                aria-hidden={true}
                className="rounded-t-[8px] bg-midnightBlack font-semibold text-[white] grid grid-cols-test justify-items-start overflow-x-auto"
              >
                <li className="rounded-t-[8px] px-[24px] py-[16px] w-full text-start border-solid border-black25 border-[1px]">
                  Nome
                </li>

                <li className="rounded-t-[8px] px-[24px] py-[16px] w-full text-start border-solid border-black25 border-[1px]">
                  Preço Geral
                </li>

                <li className="rounded-t-[8px] px-[24px] py-[16px] w-full text-start border-solid border-black25 border-[1px]">
                  Descrição
                </li>
              </ul>

              <div className="overflow-x-auto">
                {contentData03.data?.map((mapItem) => (
                  <div key={mapItem.id}>
                    {mapItem.attributes.Pricing.TableItems.map(
                      (mapItem) => (
                        <div key={mapItem.id}>
                          <div
                            className={`grid grid-cols-test items-center text-[white] bg-blueForText`}
                          >
                            <div
                              className={`flex justify-start items-center h-full text-shadow-black-light px-[24px] py-[16px] w-full text-start border-solid border-black25 border-[1px]`}
                            >
                              {mapItem.Name}
                            </div>

                            <div
                              aria-label="Reais"
                              className="flex justify-start items-center h-full text-shadow-black-light px-[24px] py-[16px] w-full text-start border-solid border-black25 border-[1px]"
                            >
                              {mapItem.Price}
                            </div>

                            <div className="flex justify-start items-center h-full">
                              <button
                                aria-label="Descrição"
                                className={`h-full px-[24px] py-[16px] w-full text-start border-solid border-black25 border-[1px]`}
                                aria-expanded={openQuestions.includes(
                                  mapItem.id
                                )}
                                onClick={() => toggleQuestion(mapItem.id)}
                              >
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
                            </div>
                          </div>

                          <div
                            className={`transition-max-height max-h-0 overflow-hidden ${
                              openQuestions.includes(mapItem.id)
                                ? "!max-h-[500px] bg-navyBlue text-[white]"
                                : "bg-navyBlue text-[white]"
                            }`}
                            aria-hidden={!openQuestions.includes(mapItem.id)}
                          >
                            <p className="w-full text-left pl-[16px] pr-[16px] pt-[12px] pb-[12px]">
                              {mapItem.Description}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>

              <div className="w-full h-[48px] rounded-b-[8px] bg-midnightBlack font-semibold text-[white]"></div>
            </div>
          </div>

          <Button
            pageHref="/formulario-reservar"
            buttonText="Reservar Agora"
            iconSrc="/calendar-icon.svg"
            altText="Calendario Icone"
            buttonClassName="!mt-[0px] max-w-[340px] !bg-primaryBlue"
          />
        </div>
      )}
    </div>
  );
};

export default ServicePricing;
