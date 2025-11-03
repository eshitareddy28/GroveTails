"use client";
import { Tags, Smile, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface TagsSectionProps {
  existingTags?: string[];
}

export const TagsSection = ({ existingTags = [] }: TagsSectionProps) => {
  const { setValue, watch } = useFormContext();
  const [tagInput, setTagInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedInput = useDebounce(tagInput, 300);
  const tags: string[] = watch("tags") || [];

  // Fetch suggestions
  useEffect(() => {
    if (debouncedInput.trim()) {
      const filtered = existingTags.filter(
        (tag) =>
          tag.toLowerCase().includes(debouncedInput.toLowerCase()) &&
          !tags.includes(tag)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedInput, existingTags, tags]);

  const handleAddTag = () => {
    const trimmedInput = tagInput.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      setValue("tags", [...tags, trimmedInput], { shouldValidate: true });
      setTagInput("");
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSelectSuggestion = (tag: string) => {
    if (!tags.includes(tag)) {
      setValue("tags", [...tags, tag], { shouldValidate: true });
    }
    setTagInput("");
    setShowSuggestions(false);
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true }
    );
  };

  return (
    <section className="space-y-6 px-1">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Smile className="h-5 w-5" />
        Personality Traits
      </h3>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Tags className="h-4 w-4" />
          <span>Tags (e.g., Playful, Energetic, Calm)</span>
        </div>

        <div className="flex flex-col gap-2 relative">
          <div className="flex gap-2 items-stretch">
            <div className="relative flex-1">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Add a tag"
              />

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg">
                  {suggestions.map((tag) => (
                    <div
                      key={tag}
                      className="px-3 py-2 hover:bg-accent cursor-pointer"
                      onMouseDown={() => handleSelectSuggestion(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleAddTag}
              disabled={!tagInput.trim()}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1"
                  aria-label={`Remove ${tag}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
