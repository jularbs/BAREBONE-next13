import "./styles.scss";

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
          className={`questionItem ${
            activeQuestion === item._id ? "active" : ""
          }`}
          key={key}
        >
          <div
            className="question"
            onClick={() => {
              if (activeQuestion !== item._id) {
                setActiveQuestion(item._id);
              } else {
                setActiveQuestion(null);
              }
            }}
          >
            <div>
              <div className="englishTranslation">{item.englishQuestion}</div>
              <div className="tagalogTranslation">{item.tagalogQuestion}</div>
            </div>
            <IoChevronDownOutline className="arrow" />
          </div>
          <div className="answer">
            <div>{item.englishAnswer}</div>
            <div className="tagalog">{item.tagalogAnswer}</div>
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
      <div className="workWithUsSection" ref={myRef}>
        <div className="faqs">
          <div className="topbar">
            <div className="searchContainer">
              <input
                type="text"
                className="searchWrapper"
                placeholder="Search"
              ></input>
              <FaSearch className="searchIcon" />
            </div>
          </div>

          <div className="questionsContainer">{showQuestions()}</div>
        </div>

        <div className="testimonials">
          <div className="header">What our employees say about us</div>
          <div className="testimonial-list-container">{showTestimonials()}</div>
        </div>

        <div className="ctaButtons">
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
