import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useState } from "react";

interface SpaceCardProps {
  space: {
    _id: string;
    name: string;
    address: string;
    price: number;
    availability: string;
    term: string;
    images?: { url: string }[];
  };
}

const SpaceCard = ({ space }: SpaceCardProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0)
  // const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(0);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, 
  [api, space.images?.length]);
  
  return (
    <Link to={`/space/${space._id}`}>
      <Card x-chunk="dashboard-01-chunk-0">
        {space.images && space.images.length === 1 ? (
          <img
            src={space.images[0]?.url}
            alt="Office"
            style={{
              height: "200px",
              width: "100%",
              objectFit: "cover",
              backgroundSize: "cover",
            }}
          />
        ) : space.images && space.images?.length > 1 ? (
          <div>
            <Carousel className="w-full h-48" setApi={setApi}>
              <CarouselContent>
                {space.images?.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image.url}
                      alt={`Office image ${index + 1}`}
                      style={{
                        height: "200px",
                        width: "100%",
                        borderRadius: "10px",
                        objectFit: "cover",
                        backgroundSize: "cover",
                      }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {/* {Array.from({ length: count }).map((_, index) => ( */}
                  {space.images?.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      api?.scrollTo(index);
                    }}
                    className={`h-2 w-2 rounded-full transition-colors ${current === index ? 'bg-white h-2.5 w-2.5' : 'bg-white/70'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
          <Badge variant="available" className="absolute top-1.5 left-1.5">{space.availability}</Badge>

            </Carousel>

          </div>

        ) : (
          <img
            src="/placeholder.svg"
            alt="Office"
            style={{
              height: "200px",
              width: "100%",
              objectFit: "cover",
              backgroundSize: "cover",
            }}
          />
        )}

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {space.name}
            <p className="text-[10px]"></p>
            <div className="flex items-center gap-2">
              <MapPin width={12} height={12} />
              <span className="text-[12px] font-thin">{space.address}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-md font-medium">
            {formatCurrency(space.price)}/{space.term}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SpaceCard;