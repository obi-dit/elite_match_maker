"use client";

import { useEffect, useRef, useState } from "react";

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-20 px-6 md:px-20 bg-gray-100 text-center transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h2 className="text-4xl font-extrabold mb-4 text-gray-900">
        Experience the Journey to Love
      </h2>

      {/* Replace with your own video file or YouTube embed */}
      <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-lg">
        {/* Option 1: self-hosted video */}
        {/* <video controls className="w-full h-full object-cover">
          <source
            src="https://player.cloudinary.com/embed/?cloud_name=dy4yhk3im&public_id=MicrosoftTeams-video_1_hgh0hx&profile=cld-default"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video> */}

        {/* Option 2: YouTube Embed */}
        <iframe
          className="w-full h-full"
          src="https://player.cloudinary.com/embed/?cloud_name=dy4yhk3im&public_id=MicrosoftTeams-video_1_hgh0hx&profile=cld-default"
          title="Introduction Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default VideoSection;
