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
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
   </div>
  );
};

export default FilterSection;
