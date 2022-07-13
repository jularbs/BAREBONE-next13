import "./styles.scss";

import { useState, useEffect } from "react";

import { getLogoShowcaseList } from "actions/logoShowcase";
import { getLink } from "actions/media";

const LogoShowcase = () => {
  const [logoShowcaseList, setLogoShowcaseList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getLogoShowcaseList().then((data) => {
      setLoading(false);
      setLogoShowcaseList(data.data);
    });
  }, []);

  const showLogos = () => {
    return logoShowcaseList.map((item, key) => {
      return <img key={key} src={getLink(item.logo)} />;
    });
  };

  return (
    <>
      <div className="logo-showcase-container">{showLogos()}</div>
    </>
  );
};

export default LogoShowcase;
