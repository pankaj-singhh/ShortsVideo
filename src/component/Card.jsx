import { useRef, useState, useEffect } from "react";
import "./Card.css";
import { IoPlay, IoPause } from "react-icons/io5";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";
import { IoMdShareAlt } from "react-icons/io";

const Card = ({ title, description, videoUrl }) => {
  const [like, setLike] = useState(false);
  const [unlike, setUnlike] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLike = () => {
    setLike(!like);
    setUnlike(false);
  };

  const handleUnlike = () => {
    setLike(false);
    setUnlike(!unlike);
  };

  const videoRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Change this value as needed
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsPlaying(entry.isIntersecting);
      if (entry.isIntersecting) {
        playHandler();
      } else {
        pauseHandler();
      }
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const playHandler = () => {
    const video = videoRef.current;
    if (!video) return;

    video
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Error playing video:", error);
      });
  };

  const pauseHandler = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      playHandler();
    } else {
      pauseHandler();
    }
  };

  return (
    <div className="mt-1 relative lg:card">
      <div className="mindiv">
        <div className="relative">
          <video
            className="lg:rounded-2xl video"
            ref={videoRef}
            autoPlay={isPlaying}
            onClick={togglePlay}
            loop
          >
            <source src={videoUrl} />
          </video>

          <div className="overlay">
            {!isPlaying ? (
              <button className="play" onClick={playHandler}>
                <IoPlay />
              </button>
            ) : (
              <button className="pause" onClick={pauseHandler}>
                <IoPause />
              </button>
            )}
          </div>
          <div className="overlay manage">
            <p className="title">{title}</p>
            <p className="description">{description}</p>
          </div>
        </div>
        <div className="absolute right-0 top-56 lg:relative lg:mx-5">
          <button className="likebtn" onClick={handleLike}>
            <AiFillLike
              color={like && `blue`}
              className="bg-gray-300 text-5xl p-2 rounded-full"
            />
          </button>
          <p className="mb-5 text-white lg:text-black">Like</p>
          <button className="unlike " onClick={handleUnlike}>
            <AiFillDislike
              color={unlike && `blue`}
              className="bg-gray-300 text-5xl p-2 rounded-full"
            />
          </button>
          <p className="mb-5 text-white lg:text-black">Unlike</p>
          <button className="share ">
            <IoMdShareAlt className="bg-gray-300 text-5xl p-2 rounded-full" />
          </button>
          <p className="mb-5 text-white lg:text-black">Share</p>
          <button className="comments ">
            <BiSolidCommentDetail className="bg-gray-300 text-5xl p-2 rounded-full" />
          </button>
          <p className="mb-5 text-white lg:text-black">Comment</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
