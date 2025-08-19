import React, { useEffect, useRef } from 'react'
import Searchtutorial from './Search_tutorial.mp4';

const SearchTutorial = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div>
      <section className="m-10">
        {/* <button onClick={handlePlay} className="p-2 bg-blue-500 text-white rounded">
          Play Tutorial
        </button> */}
      </section>
      <div className="m-20 flex justify-center">
      <video ref={videoRef} autoPlay muted controls className="w-full h-[500px] rounded-lg">
  <source src={Searchtutorial} type="video/mp4" />
  Your browser does not support the video tag.
</video>
      </div>
    </div>
  );
};

export default SearchTutorial
