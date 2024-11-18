// src/components/SpaceCard.tsx
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState } from "react";

interface SpaceCardProps {
  space: {
    _id: string;
    name: string;
    address: string;
    price: number;
    availability: string;
    images?: { url: string }[];
  };
}

const SpaceCard = ({ space }: SpaceCardProps) => {
  const [, setApi] = useState<CarouselApi>();

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
            <div className="relative flex justify-between bottom-32 p-2">
              <ChevronLeft className="bg-white rounded-full " />
              <ChevronRight className="bg-white rounded-full " />
            </div>
          </Carousel>
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
            {formatCurrency(space.price)}/day
          </div>
          <Badge variant="available">{space.availability}</Badge>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SpaceCard;