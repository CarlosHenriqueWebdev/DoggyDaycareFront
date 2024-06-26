import React from "react";
import Link from "next/link";
import Image from "next/image";
import useDataFetching from "@/hooks/useDataFetching";
import NewSharedData from "@/components/utils/NewSharedData";
import { API_BASE_URL } from "../../../../lib/config";

const Footer = () => {
  const linksData = NewSharedData();

  const urlToFetch =
    API_BASE_URL + "/api/site-footer?populate[FooterSocials][populate][SocialsRepeatable][populate]=*";
  const { completeDataJSON: footerData } = useDataFetching(urlToFetch);

  return (
    <div className="z-[200] relative bg-[black] border-t-8 border-t-skyBlue border-solid">
      <div className="px-[24px] lg:px-[48px] pt-[8px] pb-[32px]">
        <div className="max-container flex flex-col text-[white] ">
          <div className="w-full flex flex-col">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="w-fit h-fit relative after:bg-[url(/logo-arc.png)] after:z-20 after:content-[''] after:absolute after:w-[73px] after:h-[20px] after:bg-no-repeat after:bg-contain after:mt-[-78px] after:right-[82px] after:block after:scale-y-[-1]">
                <Link className="block" href={"/"}>
                  <Image
                    className="block h-[50px] w-full"
                    src="/logo.webp"
                    alt="Logo e Botão da Homepage"
                    width="0"
                    height="0"
                    unoptimized
                    priority={true}
                  />
                </Link>
              </div>

              <ul className="flex items-center gap-2 mt-[16px] sm:mt-0">
                {footerData.data &&
                  footerData.data.attributes.FooterSocials.SocialsRepeatable.map(
                    (mapItem) => (
                      <li key={mapItem.id}>
                        <Link
                          className="block bg-[white] pt-[6px] pb-[6px] pr-1 pl-1 rounded-[4px] w-[32px] hover:brightness-[80%]"
                          href={mapItem.Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Abrir ${mapItem.ImageAlternativeTextForAccesibility} em uma nova página`}
                        >
                          <Image
                            className="w-full h-[20px]"
                            src={`${API_BASE_URL + mapItem.Icon.data.attributes.url}`}
                            alt={mapItem.ImageAlternativeTextForAccesibility}
                            width="0"
                            height="0"
                            unoptimized
                          />
                        </Link>
                      </li>
                    )
                  )}
              </ul>
            </div>

            <ul className="flex flex-col gap-1 justify-center items-center mt-[28px] pb-[16px] md:flex-row md:flex-wrap">
              {linksData.allLinks
                .reduce((acc, section) => acc.concat(section.links), [])
                .map((mapItem, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      className="block font-bold underline text-skyBlue p-4 text-[1.25rem] hover:text-primaryBlue"
                      href={mapItem.href}
                    >
                      {mapItem.text}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {!footerData.data && (
        <div className="w-full bg-midnightBlack p-[32px] text-center text-[white] font-bold">
          <p>
            © {new Date().getFullYear()} Doggy Daycare. Todos direitos
            reservados.
          </p>
        </div>
      )}

      {footerData.data && (
        <div className="w-full bg-midnightBlack p-[32px] text-center text-[white] font-bold">
          <p>
            © {new Date().getFullYear()}{" "}
            {
              footerData.data.attributes.FooterSocials.CopyrightText[0]
                .children[0].text
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Footer;
