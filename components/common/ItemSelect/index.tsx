"use client";

import { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WithLabelItem } from "@/constants/utils";

type Props<T extends string = string> = {
  items: WithLabelItem<T>[];
  defaultValue?: T;
  placeholder?: string;
  onChange: (item: WithLabelItem<T>) => void;
};

const DefaultPlaceholder = "項目を選択してください";

export const ItemSelect = <T extends string = string>({
  items,
  defaultValue,
  placeholder,
  onChange,
}: Props<T>) => {
  const handleChange = useCallback(
    (value: string) => {
      const item = items.find((i) => i.id === value)!;
      onChange(item);
    },
    [items, onChange],
  );

  return (
    <Select onValueChange={handleChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder || DefaultPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((i) => (
          <SelectItem key={i.id} value={i.id}>
            {i.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
