import styles from "./ValuesHero.module.scss";

import { useState, useEffect, forwardRef } from "react";
import { WHY_MBC_COMPANY_VALUES, WHY_MBC_CORE_VALUES } from "constants.js";
import { readOption } from "actions/option";
import { getLink } from "actions/media";

const ValuesHero = forwardRef(({ next }, myRef) => {
  const [companyValues, setCompanyValues] = useState({});
  const [coreValues, setCoreValues] = useState({});
  useEffect(() => {
    readOption(WHY_MBC_COMPANY_VALUES).then((data) => {
      console.log(data);
      if (data.data) setCompanyValues({ ...data.data });
    });
    readOption(WHY_MBC_CORE_VALUES).then((data) => {
      if (data.data) setCoreValues(data.data);
    });
  }, []);

  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className={styles["values-section-container"]} ref={myRef}>
        <div className={styles["title"]}>Why MBC?</div>
        <div className={styles["core"]}>
          <div
            className={styles["banner"]}
            style={{
              backgroundImage: `url(${
                companyValues.media ? getLink(companyValues.media) : ""
              })`,
            }}
          >
            <div className={styles["header"]}>Company Values</div>
            <p>{companyValues.value}</p>
          </div>
          <div className={styles["content"]}>
            <div className={styles["header"]}>our core values</div>
            <p>{coreValues.value}</p>
          </div>
        </div>
        {next && (
          <div className={styles["arrow-placement"]}>
            <div className="arrow-wrapper bg-black" onClick={scrollNext} />
          </div>
        )}
      </div>
    </>
  );
});

export default ValuesHero;
