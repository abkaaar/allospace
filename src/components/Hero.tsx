import React from 'react';

interface HeroProps {
  colorDeep: string;
  mainText: string;
  shadow?: string;
  mobileShadow?: string;
  subText: string;
}

const Hero: React.FC<HeroProps> = ({ colorDeep, mainText, subText }) => {
  return (
    <main className=" h-full flex flex-col justify-center px-4 z-10 relative overflow-hidden md:px-16">
      <div className="flex flex-col gap-4 lg:w-2/3 justify-center lg:items-start lg:text-left w-full items-center text-center mb-5 md:mb-0">
        <h1 className="md:text-7xl text-4xl mx-auto lg:mx-0 font-bold leading-tight text-white">
          Find and book your next <span style={{ color: colorDeep }}>{mainText}</span> space.
        </h1>
        <p className="leading-normal md:text-2xl text-lg text-white font-normal">{subText}</p>
      </div>

      {/* <div className="lg:w-3/5 w-full lg:-mt-6 relative">
        <img src={img} loading="eager" alt="hero image" className="w-3/5 mx-auto" width="500" height="300" />
      </div> */}
    </main>
  );
};

export default Hero;