import React from "react";

import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"

const SpaceCategorySection = () => {

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
      )

    return (

        <div className="space-type mt-4 mb-24 lg:justify-center sm:px-20 px-10 lg:gap-8 bg-white">
            <div className="flex flex-col mt-10 p-8">
                {/* <h2 className="font-bold text-center lg:text-start mb-6 ">Book on demand / Rent longer-term</h2> */}

                {/* <div className="type flex flex-col mb-16">
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <Link to="/meeting-rooms">
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
              <Link to="/coworking-desks">
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
              <Link to="/event-spaces">
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
              <Link to="/offices">
                <Card className="meeting flex flex-col justify-center items-center py-8 w-72 border rounded-md hover:shadow-2xl">
                  <article className="py-3 px-4 font-medium text-base">
                    <h2 className="font-medium">Full-term offices</h2>
                  </article>
                  <img
                    src="/illustrations/designer.svg"
                    width={120}
                    className="rounded-e-md"
                  />
                </Card>
              </Link>
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
          </div> */}

                <Carousel 
                 plugins={[plugin.current]}
                 className=" gap-2"
                 onMouseEnter={plugin.current.stop}
                 onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-2 md:pl-4">
                            <Link to="/meeting-rooms" className="w-fit">
                                <Card className="meeting flex flex-col justify-center items-center py-8 w-62 sm:w-72 border rounded-md hover:shadow-2xl">
                                    <article className="py-3 px-4 font-medium text-base">
                                        <h2 className="font-medium">Meeting rooms</h2>
                                    </article>
                                    <img
                                        src="/illustrations/business_chat.svg"
                                        width={120}
                                        className="rounded-e-md"
                                    />
                                </Card>
                            </Link>
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-2 md:pl-4">
                            <Link to="/coworking-desks">
                                <Card className="meeting flex flex-col justify-center items-center py-8 w-62 sm:w-72 border rounded-md hover:shadow-2xl">
                                    <article className="py-3 px-4 font-medium text-base">
                                        <h2 className="font-medium">Coworking spaces</h2>
                                    </article>
                                    <img
                                        src="/illustrations/co-working.svg"
                                        width={85}
                                        className="rounded-e-md"
                                    />
                                </Card>
                            </Link>
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-2 md:pl-4">
                            <Link to="/event-spaces">
                                <Card className="meeting flex flex-col justify-center items-center py-8 w-62 sm:w-72 border rounded-md hover:shadow-2xl">
                                    <article className="py-3 px-4 font-medium text-base">
                                        <h2 className="font-medium">Event spaces</h2>
                                    </article>
                                    <img
                                        src="/illustrations/conversation.svg"
                                        width={76}
                                        className="rounded-e-md"
                                    />
                                </Card>
                            </Link>
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-2 md:pl-4">
                            <Link to="/offices">
                                <Card className="meeting flex flex-col justify-center items-center py-8 w-62 sm:w-72 border rounded-md hover:shadow-2xl">
                                    <article className="py-3 px-4 font-medium text-base">
                                        <h2 className="font-medium">Full-term offices</h2>
                                    </article>
                                    <img
                                        src="/illustrations/designer.svg"
                                        width={105}
                                        className="rounded-e-md"
                                    />
                                </Card>
                            </Link>
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-2 md:pl-4">
                            <Card className="meeting flex flex-col justify-center items-center py-8 w-62 sm:w-72 border rounded-md hover:shadow-2xl">
                                <article className="py-3 px-4 font-medium text-base">
                                    <h2 className="font-medium">Studio workspaces</h2>
                                </article>
                                <img
                                    src="/illustrations/office.svg"
                                    width={115}
                                    className="rounded-e-md"
                                />
                            </Card>
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-2 md:pl-4">
                            <Card className="meeting flex flex-col justify-center items-center py-8 w-62 sm:w-72 border rounded-md hover:shadow-2xl">
                                <article className="py-3 px-4 font-medium text-base">
                                    <h2 className="font-medium">Virtual offices</h2>
                                </article>
                                <img
                                    src="/illustrations/virtual.svg"
                                    width={86}
                                    className="rounded-e-md"
                                />
                            </Card>
                        </CarouselItem>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-2 md:pl-4">
                            <Card className="meeting flex flex-col justify-center items-center py-8 w-62 sm:w-72 border rounded-md hover:shadow-2xl">
                                <article className="py-3 px-4 font-medium text-base">
                                    <h2 className="font-medium">Part-time offices</h2>
                                </article>
                                <img
                                    src="/illustrations/voice_control.svg"
                                    width={82}
                                    className="rounded-e-md"
                                />
                            </Card>
                        </CarouselItem>


                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

            </div>
        </div>

    );
};


export default SpaceCategorySection;