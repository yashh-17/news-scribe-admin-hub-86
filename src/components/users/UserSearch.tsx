
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/user/user-store";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export const UserSearch = () => {
  const setSearchTerm = useUserStore((state) => state.setSearchTerm);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  return (
    <div className="relative flex-1 max-w-xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <Input
        type="search"
        placeholder="Search users by name, email, mobile or location..."
        value={value}
        onChange={handleSearch}
        className="pl-9 w-full"
      />
    </div>
  );
};
