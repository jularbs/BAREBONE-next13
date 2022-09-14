import "./styles.scss";

import { useState, useEffect } from "react";

import { getBenefitList } from "actions/benefit";
import { getLink } from "actions/media";

import { readOption } from "actions/option";
import { BENEFIT_HEADER_TEXT, BENEFIT_SUB_TEXT } from "constants.js";

const BenefitsSection = () => {
  const [benefitList, setBenefitList] = useState([]);
  const [headerText, setHeaderText] = useState("");
  const [headerSubtext, setHeaderSubtext] = useState("");

  useEffect(() => {
    getBenefitList().then((data) => {
      setBenefitList(data.data);
    });

    readOption(BENEFIT_HEADER_TEXT).then((data) => {
      if (data.data) setHeaderText(data.data.value);
    });

    readOption(BENEFIT_SUB_TEXT).then((data) => {
      if (data.data) setHeaderSubtext(data.data.value);
    });
  }, []);

  const showBenefits = () => {
    return benefitList.map((item, key) => (
      <div className="gridItem" key={key}>
        <img
          className="mr-2"
          alt="icon"
          width="34px"
          height="auto"
          src={getLink(item.icon)}
        />
        {item.title}
      </div>
    ));
  };
  return (
    <>
      <div className="benefitsSectionContainer">
        <div className="header">{headerText}</div>
        <div className="subHeading">{headerSubtext}</div>
        <div className="content">{showBenefits()}</div>
      </div>
    </>
  );
};

export default BenefitsSection;
