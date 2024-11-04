import Footer from "@/components/Footer";
import Nav from "../components/Nav";
import { Armchair, Blocks, Building, House, Theater } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import data from "../data.json";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const Home = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSearch = (searchTerm: string) => {
    setValue(searchTerm);
    navigate(`/search?city=${encodeURIComponent(searchTerm)}`);
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    onSearch(value);
  };

  return (
    <>
      <Nav />
      <main className="">
      <div className="banner bg-[#00593F] px-5 sm:px-0 w-full py-12">
      <div className="category w-full ">
          <div className="hidden md:flex flex-wrap gap-2 md:px-20 md:py-10">
            <Link to="/offices">
              <button className="px-6 py-3 rounded-md border bg-[#00593F] hover:bg-[#1e6e56] text-white flex gap-6">
                <Armchair />
                Offices
              </button>
            </Link>
            <Link to="/">
              <button className="px-6 py-3 rounded-md bg-[#00593F] hover:bg-[#1e6e56] hover:ring-1 text-white flex gap-6">
                <Blocks />
                Co-working space
              </button>
            </Link>
            <Link to="/">
              <button className="px-6 py-3 rounded-md bg-[#00593F] hover:bg-[#1e6e56] hover:ring-1 text-white flex gap-6">
                <House />
                Event space
              </button>
            </Link>
            <Link to="/">
              <button className="px-6 py-3 rounded-md bg-[#00593F] hover:bg-[#1e6e56] hover:ring-1 text-white flex gap-6">
                <Building />
                Conference rooms
              </button>
            </Link>
            <Link to="/">
              <button className="px-6 py-3 rounded-md bg-[#00593F] hover:bg-[#1e6e56] hover:ring-1 text-white flex gap-2">
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
              Search low prices on offices, meeting rooms, co-working space and
              much more...
            </p>
          </article>
          <div className="search-box flex flex-col justify-center w-fit">
            <form
              className="bg-[#FFB700] p-1 gap-1 rounded-md flex"
              onSubmit={handleFormSubmit}
            >
              <div className="flex items-center w-full">
                <input
                  type="text"
                  placeholder="Type in a city or area"
                  className="p-3 rounded-md min-w-[245px] sm:w-[450px] shrink"
                  value={value}
                  onChange={handleOnChange}
                />
              </div>
              <button
                className="text-white px-3 rounded-md bg-[#00593F] w-full"
                type="submit"
              >
                Search
              </button>

            </form>
            <TableBody className="bg-white p-15 z-50 w-fit shadow-md rounded-md">
              {data
                .filter((item) => {
                  const searchTerm = value.toLowerCase();
                  const city = item.city.toLowerCase();

                  return (
                    searchTerm &&
                    city.startsWith(searchTerm) &&
                    city !== searchTerm
                  );
                })
                .slice(0, 10)
                .map((item) => (
                  <TableRow
                    onClick={() => onSearch(item.city)}
                    className="dropdown-item "
                    key={item.state}
                  >
                    <TableCell className="">
                      {item.city}, {item.state} state
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </div>
        </div>
      </div>
        <div className="space-type mt-24 mb-24 lg:flex lg:justify-center sm:px-20 lg:gap-8 bg-white">
          <div className="type flex flex-col items-center mb-16">
            <h2 className="font-bold">Book on-demand</h2>
            <div className="sm:flex gap-6">
            <Link to='/meeting-rooms'>
            <Card className="meeting flex py-6 px-4 justify-between items-center w-80 border rounded-md mt-4">
                <article>
                  <h2 className="font-medium">Meeting rooms</h2>
                  <p>To meet and present</p>
                </article>
                <img src="/illustrations/conversation.svg" width={50}/>
              </Card>
            </Link>
              <div className="meeting flex py-6 px-4 justify-between items-center w-80 border rounded-md mt-4">
                <article>
                  <h2 className="font-medium">Co-working spaces</h2>
                  <p>Shared workspace</p>
                </article>
                <img src="/illustrations/shared_workspace.svg" width={50}/>

              </div>
            </div>
            <div className="sm:flex gap-6">
              <div className="meeting flex py-6 px-4 justify-between items-center w-80 border rounded-md mt-4">
                <article>
                  <h2 className="font-medium">Event space</h2>
                  <p>For conferences and get-togethers</p>
                </article>
                <img src="/illustrations/candidate.svg" width={50}/>

              </div>
              <Card className="meeting flex py-6 px-4 justify-between items-center w-80 border rounded-md mt-4">
                <article>
                  <h2 className="font-medium">Private day offices</h2>
                  <p>A room with desk and chairs</p>
                </article>
                <img src="/illustrations/office.svg" width={50}/>
              </Card>
            </div>
          </div>
          <span className="hidden sm:flex border "></span>
          <div className="term flex items-center flex-col mt-16 sm:mt-0">
            <h2 className="font-bold">Rent longer-term</h2>
            <Card className="meeting py-6 px-4 w-72 border rounded-md mt-4 flex items-center justify-between">
              <article>
                <h2 className="font-medium">Full-time offices</h2>
                <p>Entire office to rent</p>
              </article>
              <img src="/illustrations/designer.svg" width={50}/>

            </Card>
            <Card className="meeting py-6 px-4 w-72 border rounded-md mt-4 flex items-center justify-between">
              <article>
                <h2 className="font-medium">Part-time offices</h2>
                <p>Your own office 1-3 days every week</p>
              </article>
              <img src="/illustrations/voice_control.svg" width={50}/>

            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
