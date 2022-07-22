import "./styles.scss";

import { Fa500Px, FaAddressCard, FaGlasses, FaSearch } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";

import { useState, useEffect } from "react";
import Link from "next/link";

import { getFAQbyLocation } from "actions/faq";
import { WORK_WITH_US_FAQ } from "constants.js";

import TestimonialCard from "components/Frontend/TestimonialCard";
import { getTestimonialByLocation } from "actions/testimonial";

const WorkWithUsSection = () => {
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
      <div className="workWithUsSection">
        <div className="title">Why MBC?</div>
        <div className="core">
          <div className="banner">
            <div className="header">Company Values</div>
            <ul>
              <li>Teamwork</li>
              <li>Integrity</li>
              <li>Creativity</li>
              <li>Loyalty</li>
              <li>Leadership</li>
              <li>Dedication</li>
            </ul>
          </div>
          <div className="content">
            <div className="header">our core values</div>
            <p>
              In the spirit of entrepreneurship and innovation, we nurture a
              corporate culture that encourages and empowers organization
              members from all levels to make decisions, act proactively, and
              provide feedback on how to improve our policies and processes.{" "}
            </p>
            <p>
              We recognize that our people are our most important asset and so
              we nurture a meritocratic environment that emphasizes the value of
              leadership, career growth, teamwork, dedication, and loyalty.
            </p>
            <p>
              We build strong, lasting relationships with business partners that
              share our vision and values and our commitment to being a socially
              and environmentally-responsible corporate citizen in every
              community that we serve.
            </p>
          </div>
        </div>

        <div className="benefits">
          <div className="header">MBC Benefits</div>
          <div className="subHeading">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. A small river
            named Duden flows by their place and supplies.
          </div>

          <div className="content">
            <div className="gridItem">
              <Fa500Px className="icon" />
              Personal Medical
            </div>
            <div className="gridItem">
              <FaAddressCard className="icon" />
              Life Insurance
            </div>
            <div className="gridItem">
              <FaGlasses className="icon" />
              Optical Allowance
            </div>
            <div className="gridItem">
              <FaGlasses className="icon" />
              Optical Allowance
            </div>
            <div className="gridItem">
              <FaGlasses className="icon" />
              Optical Allowance
            </div>
            <div className="gridItem">
              <FaGlasses className="icon" />
              Optical Allowance
            </div>
          </div>
        </div>

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
};

export default WorkWithUsSection;
