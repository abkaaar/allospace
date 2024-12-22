import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

const FilterSection: React.FC<{
  onSpaceTypeChange?: (type: string) => void;
  onOccupancyChange?: (occupancy: string) => void;
  onClearFilter?: () => void;
}> = ({ onSpaceTypeChange, onOccupancyChange, onClearFilter }) => {
  const SPACE_TYPES = [
    { value: 'Conference room', label: 'Conference room' },
    { value: 'Coworking space', label: 'Coworking Desk' },
    { value: 'Meeting room', label: 'Meeting Room' },
    { value: 'Dedicated desk', label: 'Dedicated desk' },
    { value: 'Event space', label: 'Event space' },
    { value: 'Office', label: 'Office' }
  ];

  const OCCUPANCY_TYPES = [
    { value: 'daily', label: 'Daily' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Year' }
  ];

  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <Select 
          onValueChange={(value) => onSpaceTypeChange && onSpaceTypeChange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select space type" />
          </SelectTrigger>
          <SelectContent>
            {SPACE_TYPES.map(type => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select 
          onValueChange={(value) => onOccupancyChange && onOccupancyChange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select occupancy" />
          </SelectTrigger>
          <SelectContent>
            {OCCUPANCY_TYPES.map(type => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button variant={"ghost"} onClick={onClearFilter} >Clear filter</Button>
    </div>
  );
};


export default FilterSection;
