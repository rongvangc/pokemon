"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PokemonTypeOption } from "@/types/pokemon";
import { TypeBadge } from "./TypeBadge";

interface TypeFilterProps {
  types: PokemonTypeOption[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export function TypeFilter({
  types,
  selectedType,
  onTypeChange,
}: TypeFilterProps) {
  return (
    <div className="w-full max-w-xs">
      <Select value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by type">
            {selectedType === "all" ? (
              "All Types"
            ) : (
              <div className="flex items-center gap-2">
                <TypeBadge type={selectedType} />
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {types.map((type) => (
            <SelectItem
              key={type.value}
              value={type.value}
              className="flex items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <TypeBadge type={type.value} />
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
