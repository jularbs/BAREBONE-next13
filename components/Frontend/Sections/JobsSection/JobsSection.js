import "./styles.scss";
import { useState } from "react";
import Link from "next/link";

const JobsSection = () => {
  const [openings, setOpening] = useState([
    {
      title: "Sales Executive",
      requirements: "At Least 1 Year Experience",
      company: "MBC",
      link: "https://jobstreet.com",
    },
    {
      title: "Reporter",
      requirements: "At Least 1 Year Experience, Degree in Journalism",
      company: "DZRH",
      link: "https://jobstreet.com",
    },
    {
      title: "Radio DJ",
      requirements: "At Least 3 Years Experience",
      company: "Love Radio",
      link: "https://jobstreet.com",
    },
  ]);

  const showOpenings = () => {
    return openings.map((opening, key) => {
      return (
        <div className="jobsItem">
          <div className="title">{opening.title}</div>
          <div className="requirements">{opening.requirements}</div>
          <div className="company">{opening.company}</div>
          <div className="link">
            <a href={opening.link} className="openingLink">
              APPLY NOW
            </a>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <div className="jobsSectionContainer">
        <h1 className="header">Join our team!</h1>
        {/* Search Bar */}
        <div className="searchContainer">
          <input
            className="searchWrapper"
            type="text"
            placeholder="Search for Job"
          />
        </div>
        <div className="jobsContainer">{showOpenings()}</div>
        <Link href="/work-with-us/internship">
          <div className="internshipCTA">APPLY FOR INTERNSHIP</div>
        </Link>
      </div>
    </>
  );
};

export default JobsSection;
