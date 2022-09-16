import "./styles.scss";
import { useState, useEffect } from "react";
import Link from "next/link";

import { getJobPostingList } from "actions/jobPosting";

const JobsSection = () => {
  const [jobPostingList, setJobPostingList] = useState([]);
  const [loading, setLoading] = useState({
    fetch: false,
  });

  useEffect(() => {
    setLoading({ ...loading, fetch: true });
    getJobPostingList().then((data) => {
      setLoading({ ...loading, fetch: false });
      setJobPostingList(data.data);
    });
  }, []);

  const showOpenings = () => {
    return jobPostingList.map((job, key) => {
      return (
        <div className="jobsItem">
          <div className="title">{job.position}</div>
          <div className="requirements">{job.requirements}</div>
          <div className="company">{job.company}</div>
          <div className="link">
            <a href={job.destinationURL} target="_blank" className="openingLink">
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
