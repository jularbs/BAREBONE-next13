import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";

import StoryCard from "components/Frontend/StoryCard/exp";

import { useRef, createRef } from "react";
import { getHistoryList } from "actions/history";
const HistoryPage = ({ historyList }) => {
  const refs = historyList.map((item) => createRef());

  const showHistories = () => {
    return historyList.map((item, key) => {
      return (
        <StoryCard
          key={key}
          data={item}
          timeline={historyList.map((item) => item.label)}
          ref={refs[key]}
          next={refs[key + 1]}
        />
      );
    });
  };
  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBasic
          next={refs[0]}
          // black
          blue
          data={{
            title: "our history",
            content:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient.",
            bgLocation: "/bg/our-leadership.png",
          }}
        />
        {showHistories()}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await getHistoryList();
  // Pass data to the page via props
  return {
    props: {
      historyList: res.data,
    },
  };
}

export default HistoryPage;
