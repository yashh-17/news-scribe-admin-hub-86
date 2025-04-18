
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface KeywordsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const KeywordsInput = ({ value, onChange }: KeywordsInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword();
    }
  };

  const addKeyword = () => {
    const keyword = inputValue.trim();
    if (keyword && !value.includes(keyword)) {
      onChange([...value, keyword]);
      setInputValue("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    onChange(value.filter((keyword) => keyword !== keywordToRemove));
  };

  return (
    <div className="space-y-2">
      <div>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={addKeyword}
          placeholder="Type keyword and press Enter"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {value.map((keyword) => (
          <Badge key={keyword} variant="secondary" className="px-2 py-1">
            {keyword}
            <button
              type="button"
              onClick={() => removeKeyword(keyword)}
              className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {keyword}</span>
            </button>
          </Badge>
        ))}
        
        {value.length === 0 && (
          <div className="text-sm text-gray-500">
            No keywords added yet
          </div>
        )}
      </div>
    </div>
  );
};
