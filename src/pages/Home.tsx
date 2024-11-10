import Footer from "@/components/Footer";
import Nav from "../components/Nav";
// import { Armchair, Blocks, Building, House, Theater } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
// import SearchSection from "@/components/SearchSection";

import Hero from "../components/Hero";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { data } from "../data/data";

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
                <Link to="/spaces/offices">
                  <button className="px-4 py-2 rounded-md border bg-[#00593F] hover:bg-[#1e6e56] text-white flex gap-6">
                    <Armchair />
                    Offices
                  </button>
                </Link>
                <Link to="/spaces/coworking-desks">
                  <button className="px-4 py-2 rounded-md bg-[#00593F] hover:bg-[#1e6e56] hover:ring-1 text-white flex gap-6">
                    <Blocks />
                    Co-working space
                  </button>
                </Link>
                <Link to="/spaces/event-spaces">
                  <button className="px-4 py-2 rounded-md bg-[#00593F] hover:bg-[#1e6e56] hover:ring-1 text-white flex gap-6">
                    <House />
                    Event space
                  </button>
                </Link>
                <Link to="/spaces/conference-rooms">
                  <button className="px-4 py-2 rounded-md bg-[#00593F] hover:bg-[#1e6e56] hover:ring-1 text-white flex gap-6">
                    <Building />
                    Conference rooms
                  </button>
                </Link>
                <Link to="/spaces/meeting-rooms">
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

      <div className="space-type mt-24 mb-24 lg:justify-center sm:px-20 lg:gap-8 bg-white">
       <h1 className="mb-18 text-center text-3xl font-medium">Categories</h1>
       <div className="flex flex-col mt-10 p-8">
       <h2 className="font-bold text-center lg:text-start mb-6 ">Book on demand</h2>

       <div className="type flex flex-col mb-16">
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <Link to="/spaces/meeting-rooms">
              <Card className="meeting flex flex-col justify-center items-center py-8 w-72 border rounded-md hover:shadow-2xl">
                <article className="py-3 px-4 font-medium text-base">
            <h2 className="font-medium">Meeting rooms</h2>
                </article>
                <img
                  src="/illustrations/business_chat.svg"
                  width={136}
                  className="rounded-e-md"
                />
              </Card>
            </Link>
            <Link to="/spaces/coworking-desks">
            <Card className="meeting flex flex-col justify-center items-center py-8 w-72 border rounded-md hover:shadow-2xl">
                <article className="py-3 px-4 font-medium text-base">
            <h2 className="font-medium">Coworking spaces</h2>
                </article>
                <img
                  src="/illustrations/co-working.svg"
                  width={100}
                  className="rounded-e-md"
                />
              </Card>
            </Link>
       
            <Link to="/spaces/event-spaces">
            <Card className="meeting flex flex-col justify-center items-center py-8 w-72 border rounded-md hover:shadow-2xl">
                <article className="py-3 px-4 font-medium text-base">
            <h2 className="font-medium">Event spaces</h2>
                </article>
                <img
                  src="/illustrations/conversation.svg"
                  width={90}
                  className="rounded-e-md"
                />
              </Card>
            </Link>

            <Link to="/spaces/offices">
            <Card className="meeting flex flex-col justify-center items-center py-8 w-72 border rounded-md hover:shadow-2xl">
                <article className="py-3 px-4 font-medium text-base">
            <h2 className="font-medium">Offices</h2>
                </article>
                <img
                  src="/illustrations/designer.svg"
                  width={100}
                  className="rounded-e-md"
                />
              </Card>
            </Link>
          </div>
        </div>
        <div className="term flex flex-col  mt-16 sm:mt-0">
          <h2 className="font-bold text-center lg:text-start mb-6 ">Rent longer-term</h2>
         <div className="flex gap-4 flex-wrap justify-center lg:justify-start ">
         <Card className="meeting flex flex-col justify-center items-center py-8 w-72 border rounded-md hover:shadow-2xl">
                <article className="py-3 px-4 font-medium text-base">
            <h2 className="font-medium">Full-term offices</h2>
                </article>
                <img
                  src="/illustrations/office.svg"
                  width={100}
                  className="rounded-e-md"
                />
              </Card>
              <Card className="meeting flex flex-col justify-center items-center py-8 w-72 border rounded-md hover:shadow-2xl">
                <article className="py-3 px-4 font-medium text-base">
            <h2 className="font-medium">Part-time offices</h2>
                </article>
                <img
                  src="/illustrations/voice_control.svg"
                  width={100}
                  className="rounded-e-md"
                />
              </Card>
         </div>
        </div>
       </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
