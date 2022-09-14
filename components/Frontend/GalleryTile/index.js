import "./styles.scss";
import { useState, useEffect } from "react";

import { readOptions, readOption } from "actions/option";
import { getLink } from "actions/media";

import {
  OUR_STORY_GALLERY_TILES_1,
  OUR_STORY_GALLERY_TILES_2,
  OUR_STORY_GALLERY_TILES_3,
  OUR_STORY_GALLERY_TILES_4,
  OUR_STORY_GALLERY_TILES_5,
  OUR_STORY_GALLERY_TILES_6,
  OUR_STORY_GALLERY_DESCRIPTION,
} from "constants.js";

const GalleryTile = () => {
  const [optionIndex, setOptionIndex] = useState([
    OUR_STORY_GALLERY_TILES_1,
    OUR_STORY_GALLERY_TILES_2,
    OUR_STORY_GALLERY_TILES_3,
    OUR_STORY_GALLERY_TILES_4,
    OUR_STORY_GALLERY_TILES_5,
    OUR_STORY_GALLERY_TILES_6,
  ]);

  const [optionValues, setOptionValues] = useState([]);
  const [description, setDescription] = useState({});

  useEffect(() => {
    readOptions(optionIndex).then((data) => {
      setOptionValues(data.data);
    });

    readOption(OUR_STORY_GALLERY_DESCRIPTION).then((data) => {
      setDescription(data.data);
    });
  }, []);

  const getDisplayImage = (index) => {
    const filtered = optionValues.filter((item) => item.index == index);

    return filtered[0]?.media;
  };

  const showTiles = () => {
    return optionIndex.map((item, key) => {
      return (
        <div
          className={`tile-item ${key == 0 || key == 5 ? "span-2" : ""}`}
          key={key}
          style={{
            backgroundImage: `url(${
              getDisplayImage(item) ? getLink(getDisplayImage(item)) : ""
            })`,
          }}
        ></div>
      );
    });
  };

  return (
    <>
      <div className="gallery-tile-container">
        <div className="content-wrapper">{description.value}</div>
        <div className="tile-container">{showTiles()}</div>
      </div>
    </>
  );
};

export default GalleryTile;
