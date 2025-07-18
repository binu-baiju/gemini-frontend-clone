import axios from "axios";

export async function fetchCountries() {
  const res = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,idd,flags"
  );

  const countries = res.data
    .map((c: any) => ({
      name: c.name.common,
      code:
        c.idd?.root && c.idd?.suffixes ? c.idd.root + c.idd.suffixes[0] : null,
      flag: c.flags?.svg,
    }))
    .filter((c: any) => c.code)
    .sort((a: any, b: any) => a.name.localeCompare(b.name));

  return countries;
}
