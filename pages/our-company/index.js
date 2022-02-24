import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";

import StoryCard from "components/Frontend/StoryCard/exp";

import { useRef } from "react";

function HistoryPage() {
  const timeline1 = useRef(null);
  const timeline2 = useRef(null);
  const timeline3 = useRef(null);
  const timeline4 = useRef(null);
  const timeline5 = useRef(null);
  const timeline6 = useRef(null);
  const timeline7 = useRef(null);
  const timeline8 = useRef(null);

  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBasic
          next={timeline1}
          // black
          blue
          data={{
            title: "our history",
            content:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient.",
            bgLocation: "/bg/our-leadership.png",
          }}
        />
        <StoryCard
          ref={timeline1}
          next={timeline4}
          data={{
            bgLocation:
              "https://images.unsplash.com/photo-1578593139775-971441c3c518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2690&q=80",
            title: "RH goes on air",
            label: "1930's",
            excerpt:
              "Manila Broadcasting Company traces its roots back to “the Voice of the Philippines” – KZRH, the oldest radio station in the Philippines which first went on the air back in June 15, 1939. \n\n Formerly owned and operated by H.E. Heacock, KZRH was then a 1,000 watt radio station along Escolta, the bustling financial district of pre-war Manila. KZRH was so successful that within after less than two years operation, it opened a sister station in Cebu City – DYRC.",
          }}
          timeline={{
            current: "1930's",
            nextLabel: "1940's",
            futures: ["1950's - 1960's", "1970's", "1980's"],
          }}
        />
        {/* <StoryCard
          ref={timeline2}
          next={timeline3}
          data={{
            bgLocation:
              "https://images.unsplash.com/photo-1578593139775-971441c3c518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2690&q=80",
            imgLocation: "/logos/yes-logo-old.svg",
            title: "RH goes on air",
            label: "1940's",
            excerpt:
              "Manila Broadcasting Company traces its roots back to “the Voice of the Philippines” – KZRH, the oldest radio station in the Philippines which first went on the air back in June 15, 1939. \n\n Formerly owned and operated by H.E. Heacock, KZRH was then a 1,000 watt radio station along Escolta, the bustling financial district of pre-war Manila. KZRH was so successful that within after less than two years operation, it opened a sister station in Cebu City – DYRC.",
          }}
          timeline={{
            before: ["1930's"],
            current: "1940's",
            nextLabel: "1950's - 1960's",
            futures: ["1970's", "1980's"],
          }}
        />
        <StoryCard
          ref={timeline3}
          next={timeline4}
          data={{
            bgLocation:
              "https://images.unsplash.com/photo-1578593139775-971441c3c518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2690&q=80",
            imgLocation: "/logos/yes-logo-old.svg",
            title: "RH goes on air",
            label: "1950's - 1960's",
            excerpt:
              "Manila Broadcasting Company traces its roots back to “the Voice of the Philippines” – KZRH, the oldest radio station in the Philippines which first went on the air back in June 15, 1939. \n\n Formerly owned and operated by H.E. Heacock, KZRH was then a 1,000 watt radio station along Escolta, the bustling financial district of pre-war Manila. KZRH was so successful that within after less than two years operation, it opened a sister station in Cebu City – DYRC.",
          }}
          timeline={{
            before: ["1940's"],
            current: "1950's - 1960's",
            nextLabel: "1970's",
            futures: ["1980's", "1990's"],
          }}
        /> */}
        <StoryCard
          ref={timeline4}
          next={timeline8}
          data={{
            bgLocation:
              "https://images.unsplash.com/photo-1578593139775-971441c3c518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2690&q=80",
            imgLocation: "/logos/yes-logo-old.svg",
            title: "Expanding into the FM Band",
            label: "1970's",
            excerpt:
              "Manila Broadcasting Company traces its roots back to “the Voice of the Philippines” – KZRH, the oldest radio station in the Philippines which first went on the air back in June 15, 1939. \n\n Formerly owned and operated by H.E. Heacock, KZRH was then a 1,000 watt radio station along Escolta, the bustling financial district of pre-war Manila. KZRH was so successful that within after less than two years operation, it opened a sister station in Cebu City – DYRC.",
          }}
          timeline={{
            before: ["1950's - 1960's"],
            current: "1970's",
            nextLabel: "1980's",
            futures: ["1990's", "2000's"],
          }}
        />
        {/* <StoryCard
          ref={timeline5}
          next={timeline6}
          data={{
            bgLocation:
              "https://images.unsplash.com/photo-1578593139775-971441c3c518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2690&q=80",
            imgLocation: "/logos/yes-logo-old.svg",
            title: "RH goes on air",
            label: "1980's",
            excerpt:
              "Manila Broadcasting Company traces its roots back to “the Voice of the Philippines” – KZRH, the oldest radio station in the Philippines which first went on the air back in June 15, 1939. \n\n Formerly owned and operated by H.E. Heacock, KZRH was then a 1,000 watt radio station along Escolta, the bustling financial district of pre-war Manila. KZRH was so successful that within after less than two years operation, it opened a sister station in Cebu City – DYRC.",
          }}
          timeline={{
            before: ["1970's"],
            current: "1980's",
            nextLabel: "1990's",
            futures: ["2000's", "PRESENT"],
          }}
        />
        <StoryCard
          ref={timeline6}
          next={timeline7}
          data={{
            bgLocation:
              "https://images.unsplash.com/photo-1578593139775-971441c3c518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2690&q=80",
            imgLocation: "/logos/yes-logo-old.svg",
            title: "RH goes on air",
            label: "1990's",
            excerpt:
              "Manila Broadcasting Company traces its roots back to “the Voice of the Philippines” – KZRH, the oldest radio station in the Philippines which first went on the air back in June 15, 1939. \n\n Formerly owned and operated by H.E. Heacock, KZRH was then a 1,000 watt radio station along Escolta, the bustling financial district of pre-war Manila. KZRH was so successful that within after less than two years operation, it opened a sister station in Cebu City – DYRC.",
          }}
          timeline={{
            before: ["1970's", "1980's"],
            current: "1990's",
            nextLabel: "2000's",
            futures: ["PRESENT"],
          }}
        />
        <StoryCard
          ref={timeline7}
          next={timeline8}
          data={{
            bgLocation:
              "https://images.unsplash.com/photo-1578593139775-971441c3c518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2690&q=80",
            imgLocation: "/logos/yes-logo-old.svg",
            title: "RH goes on air",
            label: "2000's",
            excerpt:
              "Manila Broadcasting Company traces its roots back to “the Voice of the Philippines” – KZRH, the oldest radio station in the Philippines which first went on the air back in June 15, 1939. \n\n Formerly owned and operated by H.E. Heacock, KZRH was then a 1,000 watt radio station along Escolta, the bustling financial district of pre-war Manila. KZRH was so successful that within after less than two years operation, it opened a sister station in Cebu City – DYRC.",
          }}
          timeline={{
            before: ["1970's", "1980's", "1990's"],
            current: "2000's",
            nextLabel: "PRESENT",
          }}
        /> */}
        <StoryCard
          ref={timeline8}
          data={{
            bgLocation:
              "https://images.unsplash.com/photo-1578593139775-971441c3c518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2690&q=80",
            imgLocation: "/logos/mbc-portait.png",
            title: "MBC Media Group",
            label: "PRESENT",
            excerpt:
              "Manila Broadcasting Company traces its roots back to “the Voice of the Philippines” – KZRH, the oldest radio station in the Philippines which first went on the air back in June 15, 1939. \n\n Formerly owned and operated by H.E. Heacock, KZRH was then a 1,000 watt radio station along Escolta, the bustling financial district of pre-war Manila. KZRH was so successful that within after less than two years operation, it opened a sister station in Cebu City – DYRC.",
          }}
          timeline={{
            current: "PRESENT",
            before: ["1980's", "1990's", "2000's"],
          }}
        />
      </div>
    </>
  );
}

export default HistoryPage;
