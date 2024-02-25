import "./Shorts.css";
import dummyData from "../constants/DummyData";
import Card from "./Card";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { useState } from "react";

const Shorts = () => {
  const [shortIndex, setShortIndex] = useState(0);
  const scrollUp = () => {
    if (shortIndex > 0) {
      const distanceToScroll = window.innerHeight;
      window.scrollBy(0, -distanceToScroll);
      setShortIndex(shortIndex - 1);
    }
  };

  const scrollDown = () => {
    if (shortIndex < dummyData.length - 1) {
      const distanceToScroll = window.innerHeight;
      window.scrollBy(0, distanceToScroll);
      setShortIndex(shortIndex + 1);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setShortIndex(0);
    }
  };
  return (
    <div className="shorts">
      <div className=" swipe-container">
        <button
          onClick={scrollUp}
          disabled={shortIndex === 0 && true}
          className={
            shortIndex === 0
              ? `opacity-0`
              : "bg-gray-300 text-gray-800 p-1 hidden lg:flex"
          }
        >
          <IoIosArrowRoundUp className="text-3xl" />
        </button>

        <button
          onClick={scrollDown}
          className="bg-gray-300 text-gray-800 p-1 hidden lg:flex"
        >
          <IoIosArrowRoundDown className="text-3xl" />
        </button>
      </div>

      {dummyData.map((data, index) => (
        <Card key={index} {...data} />
      ))}
    </div>
  );
};

export default Shorts;
