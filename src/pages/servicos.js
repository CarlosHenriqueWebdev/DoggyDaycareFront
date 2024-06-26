import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import Testimonials from "@/components/page-content/homepage/Testimonials/Testimonials";
import Introduction from "@/components/page-content/services/Introduction/Introduction";
import ServicesHero from "@/components/page-content/services/ServicesHero/ServicesHero";
import ServicesList from "@/components/page-content/services/ServicesList/ServicesList";
import React from "react";
import Head from "next/head";
import useCheckFetch from "@/hooks/useCheckFetch";
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import ServerDown from "@/components/common/ServerDown/ServerDown";
import { API_BASE_URL } from "../../lib/config";

const Servicos = () => {
  const apiUrl = API_BASE_URL + "/api/services-page?populate=*";
  const { loading, error } = useCheckFetch(apiUrl);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ServerDown />;
  }

  return (
    <div className="bg-[#F5F5F5]">
      <Head>
        <title>Serviços | Creche para Cães</title>
        <meta
          name="description"
          content="Descubra os serviços oferecidos na nossa Creche para Cães e proporcione ao seu pet uma experiência incrível. Conheça nossos cuidados, atividades e mimos para os amigões de quatro patas."
        />
      </Head>

      <NavBar />

      <div className="overflow-hidden">
        <ServicesHero />

        <Introduction />

        <ServicesList />

        <Testimonials extraClassName="border-t-[6px] border-solid border-skyBlue" />

        <Footer />
      </div>
    </div>
  );
};

export default Servicos;
