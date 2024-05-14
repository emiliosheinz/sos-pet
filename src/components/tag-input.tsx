import { forwardRef, useState } from "react";
import { Input, type InputProps } from "./ui/input";
import { Button } from "./ui/button";
import { RxCross2 } from "react-icons/rx";

import { CiCirclePlus } from "react-icons/ci";

export type TagInputProps = Omit<InputProps, "value" | "onChange"> & {
  value: string[];
  onChange: (tags: string[]) => void;
};

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, onChange, ...props }: TagInputProps, ref) => {
    const [newTag, setNewTag] = useState("");

    const addNewTagIfPresent = () => {
      if (!newTag) return;

      onChange([...new Set([...value, newTag])]);
      setNewTag("");
    };

    return (
      <div>
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <Button
              key={tag}
              type="button"
              variant="secondary"
              className="mb-2 flex h-min items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
              onClick={() => onChange(value.filter((t) => t !== tag))}
            >
              <span>{tag}</span>
              <RxCross2 />
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            {...props}
            ref={ref}
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addNewTagIfPresent();
              }
            }}
          />
          <Button
            type="button"
            onClick={() => {
              addNewTagIfPresent();
            }}
          >
            <CiCirclePlus size={24} />
          </Button>
        </div>
      </div>
    );
  },
);

TagInput.displayName = "TagInput";
