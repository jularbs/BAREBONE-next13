import styles from "./WorkWithUsSection.module.scss";

import { Fa500Px, FaAddressCard, FaGlasses, FaSearch } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";

import { useState, useEffect, forwardRef } from "react";
import Link from "next/link";

import { getFAQbyLocation } from "actions/faq";
import { WORK_WITH_US_FAQ } from "constants.js";

import TestimonialCard from "components/Frontend/TestimonialCard";
import { getTestimonialByLocation } from "actions/testimonial";

const WorkWithUsSection = forwardRef(({}, myRef) => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [testimonialList, setTestimonialList] = useState([]);
  
  useEffect(() => {
    getTestimonialByLocation(WORK_WITH_US_FAQ).then((data) => {
      console.log(data);
      setTestimonialList(data.data);
    });
    getFAQbyLocation(WORK_WITH_US_FAQ).then((data) => {
      setFaqs(data.data);
    });
  }, []);

  const showQuestions = () =>
    faqs.map((item, key) => {
      return (
        <div
          className={`${styles["questionItem"]} ${
            activeQuestion === item._id ? styles.active : ""
          }`}
          key={key}
        >
          <div
            className={styles["question"]}
            onClick={() => {
              if (activeQuestion !== item._id) {
                setActiveQuestion(item._id);
              } else {
                setActiveQuestion(null);
              }
            }}
          >
            <div>
              <div className={styles["englishTranslation"]}>{item.englishQuestion}</div>
              <div className={styles["tagalogTranslation"]}>{item.tagalogQuestion}</div>
            </div>
            <IoChevronDownOutline className={styles["arrow"]} />
          </div>
          <div className={styles["answer"]}>
            <div>{item.englishAnswer}</div>
            <div className={styles["tagalog"]}>{item.tagalogAnswer}</div>
          </div>
        </div>
      );
    });

  const showTestimonials = () => {
    return testimonialList.map((item, key) => {
      return <TestimonialCard data={item} />;
    });
  };

  return (
    <>
      <div className={styles["workWithUsSection"]} ref={myRef}>
        <div className={styles["faqs"]}>
          <div className={styles["topbar"]}>
            <div className={styles["searchContainer"]}>
              <input
                type="text"
                className={styles["searchWrapper"]}
                placeholder="Search"
              ></input>
              <FaSearch className={styles["searchIcon"]} />
            </div>
          </div>

          <div className={styles["questionsContainer"]}>{showQuestions()}</div>
        </div>

        <div className={styles["testimonials"]}>
          <div className={styles["header"]}>What our employees say about us</div>
          <div className={styles["testimonial-list-container"]}>{showTestimonials()}</div>
        </div>

        <div className={styles["ctaButtons"]}>
          <Link href="work-with-us/careers">
            <button>search job postings</button>
          </Link>
          <Link href="work-with-us/internship">
            <button>apply for internship</button>
          </Link>
        </div>
      </div>
    </>
  );
});

export default WorkWithUsSection;
