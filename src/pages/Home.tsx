import Footer from "@/components/Footer";
import Nav from "../components/Nav";
// import { Armchair, Blocks, Building, House, Theater } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CiAlarmOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdOutlineWifi } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { ImagesArr } from "@/constants/images";
import ScrollAnimation from "react-animate-on-scroll";
// import SearchSection from "@/components/SearchSection";

import Hero from "../components/Hero";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { data } from "../data/data";
import MeetingRooms from "./MeetingRooms";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useHorizontalScroll } from "@/hooks/use-scroll";
import FAQ from "@/components/Faq";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Home = () => {
  let navigate = useNavigate();
  return (
    <>
      <Nav type="search" />
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

      <div className="space-type mt-24 mb-24 lg:justify-center sm:px-20 lg:gap-8 bg-white">
        <h1 className="mb-18 text-center text-3xl font-medium">Categories</h1>
        <div className="flex flex-col mt-10 p-8">
          <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut" animateOnce>
            <h2 className="font-bold text-center lg:text-start mb-6 ">
              Book on demand
            </h2>
          </ScrollAnimation>

          <div className="type flex flex-col mb-16">
            <div className="flex flex-wrap justify-center lg:justify-start">
              <Link to="/offices">
                <div className="flex flex-row w-full max-sm:flex-col">
                  <div className="flex w-[150%] max-sm:w-[80%] self-center">
                    <LazyLoadImage
                      src="/offices/coworking2.jpg"
                      width={"10%"}
                      height={"20%"}
                      alt="co-working space"
                      className="rounded-sm z-50 absolute mt-5 border-white border-2 left-10 max-sm:left-[10%]"
                    />
                    <ScrollAnimation
                      animateIn="fadeIn"
                      animateOut="fadeOut"
                      className="relative flex"
                      animateOnce
                    >
                      <LazyLoadImage
                        src="/offices/coworking1.jpg"
                        width={"90%"}
                        height={"100%"}
                        className="rounded-sm relative"
                        alt="co-working space"
                      />
                    </ScrollAnimation>

                    <LazyLoadImage
                      src="/offices/coworking3.jpg"
                      width={"10%"}
                      height={"20%"}
                      alt="co-working space"
                      className="rounded-sm absolute border-white border-4 place-self-end ml-[40%] max-sm:hidden"
                    />
                  </div>
                  <div className="flex flex-col h-[100%] w-[80%] max-sm:self-center mt-10">
                    <ScrollAnimation
                      animateIn="fadeInRight"
                      animateOut="fadeOutRight"
                      duration={1}
                      animateOnce
                    >
                      <h3 className="font-bold text-xl sm:text-lg">
                        AlloSpace connects you to the best working environments
                      </h3>
                      <h3 className="font-normal text-sm sm:text-sm mt-1">
                        Find co-working spaces that provide the best office
                        experience for individuals and teams
                      </h3>
                    </ScrollAnimation>
                    <div className="flex flex-row mt-5 items-center">
                      <ScrollAnimation
                        animateIn="bounceInRight"
                        animateOut="fadeOutRight"
                        duration={1}
                        animateOnce
                        className="flex flex-row"
                      >
                        <div className=" flex items-center justify-center w-8 h-8 bg-green-500 rounded">
                          <CiAlarmOn size={20} className="self-center" />
                        </div>
                        <div className="flex flex-col ml-5">
                          <h1 className="font-bold ">Open 24 hours</h1>
                          <h2 className="text-sm">
                            Access co-working spaces available around the clock,
                            effortlessly!
                          </h2>
                        </div>
                      </ScrollAnimation>
                    </div>
                    <div className="flex flex-row mt-5 items-center">
                      <ScrollAnimation
                        animateIn="bounceInRight"
                        animateOut="fadeOutRight"
                        animateOnce
                        duration={1}
                        className="flex flex-row"
                      >
                        <div className=" flex items-center justify-center w-15 h-8 bg-green-500 rounded">
                          <MdOutlineWifi size={25} className="self-center" />
                        </div>
                        <div className="flex flex-col ml-5">
                          <h1 className="font-bold ">Office pecks</h1>
                          <h2 className="text-sm">
                            Book and schedule offices with top of the line
                            equipment to handle the needs of your team and
                            business
                          </h2>
                        </div>
                      </ScrollAnimation>
                    </div>
                    <div className="flex flex-row mt-5 items-center">
                      <ScrollAnimation
                        animateIn="bounceInRight"
                        animateOut="fadeOutRight"
                        duration={1}
                        animateOnce
                        className="flex flex-row"
                      >
                        <div className=" flex items-center justify-center w-10 h-8 bg-green-500 rounded">
                          <FaHandshake size={20} className="self-center" />
                        </div>
                        <div className="flex flex-col ml-5">
                          <h1 className="font-bold ">Enjoy flexibility</h1>
                          <h2 className="text-sm">
                            Plan flexible schedules that are convenient for you
                            and your team
                          </h2>
                        </div>
                      </ScrollAnimation>
                    </div>
                    <ScrollAnimation
                      animateIn="bounceInUp"
                      animateOnce
                      duration={1}
                      className=" flex justify-center"
                    >
                      <Link to="/offices">
                        <Button className="mt-5 w-[100%]">
                          <h1>Book offices now!</h1>
                        </Button>
                      </Link>
                    </ScrollAnimation>
                  </div>
                </div>
              </Link>
              {/* <Link to="/coworking-desks"> */}
              <div className="flex flex-col w-full mt-[15%]">
                <div className="flex w-[100%] flex-col">
                  <h2 className="font-bold text-center lg:text-start mb-6 ">
                    Book Co-working spaces with ease
                  </h2>
                  <div className="flex flex-row">
                    <ScrollAnimation
                      animateOnce
                      animateIn="fadeIn"
                      animateOut="fadeOut"
                      duration={1.5}
                    >
                      <LazyLoadImage
                        src="/offices/coworking1.jpg"
                        width={"100%"}
                        height={"100%"}
                        className="rounded-sm"
                        alt="co-working space"
                      />
                    </ScrollAnimation>

                    <div className="flex flex-row  w-[100%] justify-between ml-5">
                      <LazyLoadImage
                        src="/offices/coworking2.jpg"
                        width={"15%"}
                        height={"10%"}
                        className="flex absolute mt-5 rounded-3xl"
                        alt="co-working space"
                      />
                      <LazyLoadImage
                        src="/offices/coworking2.jpg"
                        width={"15%"}
                        height={"10%"}
                        className="flex absolute mt-[20%] ml-[10%] rounded-3xl"
                        alt="co-working space"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col h-[100%] w-[100%] items-center mt-20">
                  <ScrollAnimation
                    animateOnce
                    animateIn="fadeIn"
                    animateOut="fadeOut"
                    duration={1.5}
                  >
                    <h3 className="font-bold text-xl sm:text-lg">
                      AlloSpace connects you to the best working environments
                    </h3>
                    <h3 className="font-normal text-sm sm:text-sm mt-1">
                      Find co-working spaces that provide the best office
                      experience for individuals and teams
                    </h3>
                  </ScrollAnimation>
                  <ScrollAnimation
                    animateOnce
                    animateIn="bounceInLeft"
                    animateOut="bounceOutLeft"
                    duration={1.2}
                  >
                    <div className="flex flex-row mt-5 items-center">
                      <div className=" flex items-center justify-center w-8 h-8 bg-green-500 rounded">
                        <CiAlarmOn size={20} className="self-center" />
                      </div>
                      <div className="flex flex-col ml-5">
                        <h1 className="font-bold ">Open 24 hours</h1>
                        <h2 className="text-sm">
                          Access co-working spaces available around the clock,
                          effortlessly!
                        </h2>
                      </div>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation
                    animateOnce
                    animateIn="bounceInRight"
                    animateOut="bounceOutRight"
                    duration={1.2}
                  >
                    <div className="flex flex-row mt-5 items-center">
                      <div className=" flex items-center justify-center w-15 h-8 bg-green-500 rounded">
                        <MdOutlineWifi size={25} className="self-center" />
                      </div>
                      <div className="flex flex-col ml-5">
                        <h1 className="font-bold ">Office pecks</h1>
                        <h2 className="text-sm">
                          Book and schedule offices with top of the line
                          equipment to handle the needs of your team and
                          business
                        </h2>
                      </div>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation
                    animateOnce
                    animateIn="bounceInLeft"
                    animateOut="bounceOutLeft"
                    duration={1.2}
                  >
                    <div className="flex flex-row mt-5 items-center">
                      <div className=" flex items-center justify-center w-10 h-8 bg-green-500 rounded">
                        <FaHandshake size={20} className="self-center" />
                      </div>
                      <div className="flex flex-col ml-5">
                        <h1 className="font-bold ">Enjoy flexibility</h1>
                        <h2 className="text-sm">
                          Plan flexible schedules that are convenient for you
                          and your team
                        </h2>
                      </div>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation
                    animateOnce
                    animateIn="slideInLeft"
                    animateOut="slideOutLeft"
                    duration={1.2}
                    className=" flex justify-center"
                  >
                    <Link to="/offices">
                      <Button className="mt-5">
                        <h1>Book co-working spaces!</h1>
                      </Button>
                    </Link>
                  </ScrollAnimation>
                </div>
              </div>

              {/* <Link to="/event-spaces"></Link>

              <Link to="/offices"></Link> */}
            </div>
          </div>
          <div className="term flex flex-col mt-16 mb-[10%] sm:mt-0">
            <ScrollAnimation animateIn="fadeIn" animateOnce>
              <h2 className="font-bold text-center lg:text-start mb-6 ">
                Rent longer-term
              </h2>
            </ScrollAnimation>
            <ScrollAnimation
              animateIn="fadeInDown"
              animateOnce
              animateOut="fadeOutUp"
            >
              <h3 className="mb-5 font-normal">
                Looking for a reliable, long-term office solution? Our diverse
                range of flexible office spaces are designed to grow with your
                business. Whether you need a modern open plan or a private
                suite, we offer prime locations with top-tier amenities to suit
                your needs. Explore our listings and secure your next office
                today!
              </h3>
            </ScrollAnimation>

            <div
              className="flex flex-row  gap-3  overflow-x-scroll whitespace-nowrap"
              ref={useHorizontalScroll()}
            >
              {ImagesArr.map((item) => {
                return (
                  <>
                    <LazyLoadImage
                      src={item.img}
                      width={"25%"}
                      className="rounded-md hover:w-[30%] h-[25%] cursor-pointer"
                      alt="co-working space"
                      onClick={() => navigate("/offices")}
                    />
                  </>
                );
              })}
            </div>
            <ScrollAnimation
              animateIn="slideInUp"
              animateOnce
              animateOut="slideOutDown"
              className="flex self-center w-[100%]items-center justify-center"
            >
              <Link to="/offices">
                <Button className="mt-5 w-[100%] flex self-center">
                  <h1>Book a long term office plan now!</h1>
                </Button>
              </Link>
            </ScrollAnimation>
          </div>
          <div className="term flex flex-col sm:mt-0">
            <ScrollAnimation animateIn="fadeIn" animateOnce>
              <h2 className="font-bold text-center lg:text-start mb-6 ">
                Rent shorter-term
              </h2>
            </ScrollAnimation>
            <ScrollAnimation
              animateIn="fadeInDown"
              animateOnce
              animateOut="fadeOutUp"
            >
              <h3 className="mb-5 font-normal">
                Need an office space for a few months or a year? Our short-term
                lease options offer flexibility, prime locations, and all the
                amenities you need to keep your business running smoothly.
                Whether you're expanding, relocating, or just need temporary
                space, we’ve got you covered. Browse our available offices and
                find your perfect fit today!
              </h3>
            </ScrollAnimation>
            <div
              className="flex flex-row  gap-3  overflow-x-scroll whitespace-nowrap"
              ref={useHorizontalScroll()}
            >
              {ImagesArr.map((item) => {
                return (
                  <>
                    <LazyLoadImage
                      src={item.img}
                      width={"25%"}
                      className="rounded-md hover:w-[30%] h-[25%] cursor-pointer"
                      alt="co-working space"
                      onClick={() => navigate("/offices")}
                    />
                  </>
                );
              })}
            </div>
            <ScrollAnimation
              animateIn="slideInUp"
              animateOnce
              animateOut="slideOutDown"
              className="flex self-center w-[100%]items-center justify-center"
            >
              <Link to="/offices">
                <Button className="mt-5 w-[100%] flex self-center">
                  <h1>Book a short term office plan now!</h1>
                </Button>
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </div>
      <FAQ styles={{ marginTop: "5%", marginBottom: "5%" }} />
      <Footer />
    </>
  );
};

export default Home;
