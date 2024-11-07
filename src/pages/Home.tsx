import Footer from "@/components/Footer";
import Nav from "../components/Nav";
import { Armchair, Blocks, Building, House, Theater } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import SearchSection from "@/components/SearchSection";

const Home = () => {
  return (
    <>
      <Nav />
      <main className="">
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
        </div>

        <div className="space-type mt-24 mb-24 lg:flex lg:justify-center sm:px-20 lg:gap-8 bg-white">
          <div className="type flex flex-col items-center mb-16">
            <h2 className="font-bold">Book on-demand</h2>
            <div className="sm:flex gap-6">
              <Link to="/spaces/meeting-rooms">
                <Card className="meeting flex justify-between items-center w-80 border rounded-md mt-4">
                  <article className="py-3 px-4">
                    <h2 className="font-medium">Meeting rooms</h2>
                    <p className="font-normal">To meet and present</p>
                  </article>
                  <img src="/offices/5.jpg" width={150} className="rounded-e-md"/>
                </Card>
              </Link>
            <Link to='/spaces/coworking-desks'>
            <div className="meeting flex  justify-between items-center w-80 border rounded-md mt-4">
                <article className="py-3 px-4">
                  <h2 className="font-medium">Co-working spaces</h2>
                  <p className="font-normal">Shared workspace</p>
                </article>
                <img src="/offices/4.jpg" width={150} className="rounded-e-md"/>
                
              </div>
            </Link>
            </div>
            <div className="sm:flex gap-6">
            <Link to='/spaces/event-spaces'>
            <div className="meeting flex  justify-between items-center w-80 border rounded-md mt-4">
                <article className="py-3 px-4">
                  <h2 className="font-medium">Event space</h2>
                  <p className="font-normal">For conferences and get-togethers</p>
                </article>
                <img src="/offices/3.jpg" width={150} className="rounded-e-md"/>
                
              </div>
            </Link>

            <Link to='/spaces/offices'>
            <Card className="meeting flex  justify-between items-center w-80 border rounded-md mt-4">
                <article className="py-3 px-4">
                  <h2 className="font-medium">Private day offices</h2>
                  <p className="font-normal">A room with desk and chairs</p>
                </article>
                <img src="/offices/2.jpg" width={150} className="rounded-e-md"/>
                
              </Card>
            </Link>
            </div>
          </div>
          <span className="hidden sm:flex border "></span>
          <div className="term flex items-center flex-col mt-16 sm:mt-0">
            <h2 className="font-bold">Rent longer-term</h2>
            <Card className="meeting  w-22 border rounded-md mt-4 flex items-center justify-between">
              <article className="py-3 px-4">
                <h2 className="font-medium">Full-time offices</h2>
                <p>Entire office to rent</p>
              </article>
              <img src="/offices/1.jpg" width={150} className="rounded-e-md"/>
            </Card>
            <Card className="meeting border rounded-md mt-4 flex items-center ">
              <article className="py-3 px-4">
                <h2 className="font-medium">Part-time offices</h2>
                <p>Your own office <br /> 1-3 days every week</p>
              </article>
              <img src="/offices/5.jpg" width={150} className="rounded-e-md"/>
              
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
