import "./styles.scss";

import { Fa500Px, FaAddressCard, FaGlasses, FaSearch } from "react-icons/fa";
import { IoCaretDown, IoChevronDownOutline } from "react-icons/io5";

import { useState } from "react";
import Link from "next/link";

const WorkWithUsSection = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  const sampleQuestions = [
    {
      _id: 1,
      englishTranslation: "How do I apply for a job vacancy?",
      tagalogTranslation: "Paano mag-apply ng trabaho?",
      answer:
        " Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. A small river named Duden flows by their place and supplies.",
    },
    {
      _id: 2,
      englishTranslation:
        "Can I apply even if there is no active job vacancy that I am qualified with?",
      tagalogTranslation:
        "Pwede ba akong mag-apply kahit wala pang bakanteng posisyon?",
      answer:
        " Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. A small river named Duden flows by their place and supplies.",
    },
    {
      _id: 3,
      englishTranslation:
        "Can I apply even if there is no active job vacancy that I am qualified with?",
      tagalogTranslation:
        "Pwede ba akong mag-apply kahit wala pang bakanteng posisyon?",
      answer:
        " Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. A small river named Duden flows by their place and supplies.",
    },
    {
      _id: 4,
      englishTranslation:
        "Can I apply even if there is no active job vacancy that I am qualified with?",
      tagalogTranslation:
        "Pwede ba akong mag-apply kahit wala pang bakanteng posisyon?",
      answer:
        " Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. A small river named Duden flows by their place and supplies.",
    },
  ];

  const showQuestions = () =>
    sampleQuestions.map((item, key) => {
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
              <div className="englishTranslation">
                {item.englishTranslation}
              </div>
              <div className="tagalogTranslation">
                {item.tagalogTranslation}
              </div>
            </div>
            <IoChevronDownOutline className="arrow" />
          </div>
          <div className="answer">{item.answer}</div>
        </div>
      );
    });

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
