import styles from "./JobsSection.module.scss";
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
        <div className={styles["jobsItem"]}>
          <div className={styles["title"]}>{job.position}</div>
          <div className={styles["requirements"]}>{job.requirements}</div>
          <div className={styles["company"]}>{job.company}</div>
          <div className={styles["link"]}>
            <a href={job.destinationURL} target="_blank" className={styles["openingLink"]}>
              APPLY NOW
            </a>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className={styles["jobsSectionContainer"]}>
        <h1 className={styles["header"]}>Join our team!</h1>
        {/* Search Bar */}
        <div className={styles["searchContainer"]}>
          <input
            className={styles["searchWrapper"]}
            type="text"
            placeholder="Search for Job"
          />
        </div>
        <div className={styles["jobsContainer"]}>{showOpenings()}</div>
        <Link href="/work-with-us/internship">
          <div className={styles["internshipCTA"]}>APPLY FOR INTERNSHIP</div>
        </Link>
      </div>
    </>
  );
};

export default JobsSection;
