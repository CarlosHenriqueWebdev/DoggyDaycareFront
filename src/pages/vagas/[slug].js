import NavBar from "@/components/common/NavBar/NavBar";
import React from "react";
import Footer from "@/components/common/Footer/Footer";
import IndividualPositionDesign from "@/components/page-content/open-positions/MainContent/IndividualPositionDesign";

const OpenPosition = () => {
  return (
    <div className="overflow-hidden">
      <NavBar />

      <div className="overflow-hidden">
        <IndividualPositionDesign />

        <Footer />
      </div>
    </div>
  );
};

export default OpenPosition;
