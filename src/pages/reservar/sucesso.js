import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import ConfettiComponent from "@/components/utils/ConfettiComponent";
import SuccessMessage from "@/components/utils/SuccessMessage";
import Head from "next/head";
import React from "react";

const sucesso = () => {
  return (
    <div>
      <Head>
        <title>Mensagem Enviada com Sucesso! | Doggy Daycare</title>
      </Head>

      <NavBar />

      <div className="overflow-hidden">
        <ConfettiComponent />

        <SuccessMessage />

        <Footer />
      </div>
    </div>
  );
};

export default sucesso;
