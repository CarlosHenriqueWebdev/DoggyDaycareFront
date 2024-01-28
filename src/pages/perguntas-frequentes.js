import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import Faq from "@/components/page-content/homepage/Faq/Faq";
import Head from "next/head";
import React from "react";

const FaqPage = () => {
  return (
    <div>
      <Head>
        <title>Perguntas Frequentes | Doggy Daycare</title>
        <meta
          name="description"
          content="Encontre respostas para suas dúvidas mais frequentes sobre os serviços da Doggy Daycare. Saiba mais sobre nossas práticas, políticas e como proporcionamos o melhor cuidado para seus animais de estimação."
        />
      </Head>

      <NavBar />

      <div className="overflow-hidden">
        <Faq />

        <Footer />
      </div>
    </div>
  );
};

export default FaqPage;
