import useDataFetching from "@/hooks/useDataFetching";
import { API_BASE_URL } from "../../../lib/config";

const NewSharedData = () => {
  const urlToFetch01 = `${API_BASE_URL}/api/services-collections?populate=*`;
  const { completeDataJSON: contentData01 } = useDataFetching(urlToFetch01);

  const urlToFetch02 = `${API_BASE_URL}/api/open-positions?populate=*`;
  const { completeDataJSON: contentData02 } = useDataFetching(urlToFetch02);

  return {
    allLinks: [
      {
        title: "Páginas Principais",
        links: [
          {
            text: "Home",
            href: "/",
          },
          {
            text: "Sobre",
            href: "/sobre",
          },
          {
            text: "Serviços",
            href: "/servicos",
            sublinks: contentData01.data?.map((mapItem) => ({
              text: mapItem.attributes.Title,
              href: `/servicos/${mapItem.attributes.slug}`,
            })),
          },
          {
            text: "Contato",
            href: "/contato",
          },
          {
            text: "Vagas",
            href: "/vagas",
            sublinks: contentData02.data?.map((mapItem) => ({
              text: mapItem.attributes.JobTitle,
              href: `/vagas/${mapItem.attributes.slug}`,
            })),
          },
          {
            text: "Reservar",
            href: "/reservar",
          },
          {
            text: "Localizações",
            href: "/mapa",
          },
        ],
      },
      {
        title: "Informação / Extras",
        links: [
          {
            text: "Depoimentos",
            href: "/depoimentos",
          },
          {
            text: "Perguntas Frequentes",
            href: "/perguntas-frequentes",
          },
          {
            text: "Política de Privacidade",
            href: "/politica-de-privacidade",
          },
          {
            text: "Termos e Condições",
            href: "/termos-e-condicoes",
          },
          {
            text: "Mapa do Site",
            href: "/mapa-do-site",
          },
        ],
      },
    ],
  };
};

export default NewSharedData;
