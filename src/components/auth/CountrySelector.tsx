"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { fetchCountries } from "@/utils/fetchCountries";

export default function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [countries, setCountries] = useState<
    { name: string; code: string; flag: string }[]
  >([]);

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Country code" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            <span className="mr-2">
              {c.flag && <img src={c.flag} alt="" className="inline w-4 h-4" />}
            </span>
            {c.name} ({c.code})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
