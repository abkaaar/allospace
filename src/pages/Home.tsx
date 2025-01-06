import Footer from "@/components/Footer";
import Nav from "../components/Nav";
// import { Armchair, Blocks, Building, House, Theater } from "lucide-react";

// import SearchSection from "@/components/SearchSection";

import Hero from "../components/Hero";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { data } from "../data/data";
import SpaceCategorySection from "@/components/SpaceCategory";
import AllWorkspaces from "@/components/Allspaces";



const Home = () => {
  return (
    <>
      <Nav />

      <Swiper
        spaceBetween={30}
        speed={3000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper h-[80vh]"
      >
        {data.map(
          ({ id, colorDeep, mainText, subText, shadow, mobileShadow, img }) => (
            <SwiperSlide
              key={id}
              style={{
                backgroundImage: `url(${img})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              className=" w-full  flex flex-col justify-center items-center md:gap-10 gap-4 "
            >
              <Hero
                colorDeep={colorDeep}
                mainText={mainText}
                subText={subText}
                shadow={shadow}
                mobileShadow={mobileShadow}
              // img={img}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>

      {/*  */}
      {/* 
     
        <div className="banner flex items-center bg-[#00593F] px-5 sm:px-0 w-full py-12">
          <div>
            <div className="category w-full ">
              <div className="hidden md:flex flex-wrap gap-2 md:px-20 md:py-10">
                <Link to="/offices">
                  <button className="px-4 py-2 rounded-md border bg-[#00593F] hover:bg-[#1e6e56] text-white flex gap-6">
                    <Armchair />
                    Offices
                  </button>
                </Link>
                <Link to="/coworking-desks">
                  <button className="px-4 py-2 rounded-md bg-[#00593F] hover:bg-[#1e6e56] hover:ring-1 text-white flex gap-6">
                    <Blocks />
                    Co-working space
                  </button>
                </Link>
                <Link to="/event-spaces">
                  <button className="px-4 py-2 rounded-md bg-[#00593F] hover:bg-[#1e6e56] hover:ring-1 text-white flex gap-6">
                    <House />
                    Event space
                  </button>
                </Link>
                <Link to="/conference-rooms">
                  <button className="px-4 py-2 rounded-md bg-[#00593F] hover:bg-[#1e6e56] hover:ring-1 text-white flex gap-6">
                    <Building />
                    Conference rooms
                  </button>
                </Link>
                <Link to="/meeting-rooms">
                  <button className="px-4 py-2 rounded-md bg-[#00593F] hover:bg-[#1e6e56] hover:ring-1 text-white flex gap-2">
                    <Theater />
                    Meeting rooms
                  </button>
                </Link>
              </div>
            </div>
            <div className="banner flex flex-col gap-8  max-h-96 w-full sm:px-20 sm:py-10">
              <article className="text-white flex flex-col  gap-4">
                <h1 className="font-medium text-4xl sm:text-6xl">
                  Find your next work space
                </h1>
                <p className="font-normal text-lg sm:text-xl">
                  Search low prices on offices, meeting rooms, co-working space
                  and much more...
                </p>
              </article>
              <SearchSection />
            </div>
          </div>
          <div className="hidden lg:flex px-10">
           <img src="/Banner-Collage.png" alt="allo space banner" />
          </div>
        </div> */}
      <SpaceCategorySection />



      <div className="space-type mt-24 mb-24 lg:justify-center sm:px-20 px-10 lg:gap-8 bg-white">
        <h1 className="mb-18 text-center text-3xl font-medium">Featured Workspaces</h1>

        <div className="mt-6">
          <AllWorkspaces/>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
