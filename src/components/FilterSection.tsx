import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterSection = () => {
  return (
   <div className="flex flex-wrap gap-4">
     <div>
       {/* <select
              className=" rounded-md"
              value={spaceType}
              onChange={(e) => setSpaceType(e.target.value)}
            >
              <option value="">Select space type</option>
              <option>Office</option>
              <option>Meeting rooms</option>
              <option>Coworking desk</option>
              <option>Conference Room</option>
            </select> */}
      <Select value="">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select space type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">shared offices</SelectItem>
          <SelectItem value="dark">Coworking desk</SelectItem>
          <SelectItem value="system">Meeting rooms</SelectItem>
          <SelectItem value="system">Dedicated office</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select occupancy" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Daily</SelectItem>
          <SelectItem value="light">Hourly</SelectItem>
          <SelectItem value="dark">Monthly</SelectItem>
          <SelectItem value="system">Part-time</SelectItem>
        </SelectContent>
      </Select>
    </div>
   </div>
  );
};

export default FilterSection;


{/* 
            <select
              className="p-3 rounded-md"
              value={occupancy}
              onChange={(e) => setOccupancy(e.target.value)}
            >
              <option value="">Select occupancy</option>
              <option>Fulltime - monthly</option>
              <option>Book hourly or daily</option>
            </select> */}