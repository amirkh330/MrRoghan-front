import Select, { MultiValue, SingleValue } from "react-select";
import debounce from "lodash.debounce";

interface Option {
  label: string;
  value: any;
  raw?: any;
}

interface ICustomAsyncSelect {
  isMulti?: boolean;
  onChange: (value: any) => void;
  options: Option[];
  minSearch?: number;
  placeholder?: string;
  search?: string;
  value?: any;
  loading?: boolean;
  setSearch?: (value: string) => void;
}

export default function CustomSelect({
  isMulti = true,
  onChange,
  options,
  search,
  value,
  loading,
  setSearch,
  minSearch = 2,
  placeholder = "جستجو...",
}: ICustomAsyncSelect) {
  const handleSearch = debounce((value: string) => {
    setSearch?.(value);
  }, 500);

  const handleChange = (val: MultiValue<Option> | SingleValue<Option>) => {
    if (Array.isArray(val)) {
      onChange(val.map((v) => v));
    } else {
      onChange(val ?? null);
    }
  };

  return (
    <Select
      isClearable
      isSearchable
      options={options}
      isMulti={isMulti}
      isLoading={loading}
      placeholder={placeholder}
      onInputChange={(value) => {
        if (value?.length >= minSearch) handleSearch(value);
      }}
      onChange={handleChange}
      noOptionsMessage={() => "موردی یافت نشد"}
      value={value} // 👈 از بیرون کنترل می‌شود
      // value={options.filter((o) =>
      //   isMulti
      //     ? Array.isArray(search)
      //       ? search.includes(o.value)
      //       : false
      //     : o.value === search
      // )}
      styles={chakraStyles}
    />
  );
}

const chakraStyles = {
  container: (base: any) => ({
    ...base,
    width: "100%",
  }),
  control: (base: any, state: any) => ({
    ...base,
    width: "100%",
    background: "#e7eaefff",
    fontSize:"14px",
    borderColor: state.isFocused
      ? "var(--chakra-colors-blue-500)"
      : "var(--chakra-colors-gray-300)",
    boxShadow: state.isFocused
      ? "0 0 0 1px var(--chakra-colors-blue-500)"
      : "none",
    borderRadius: "var(--chakra-radii-md)",
    minHeight: "42px",
    padding: "2px 4px",
    "&:hover": {
      borderColor: "var(--chakra-colors-gray-400)",
    },
  }),

  option: (base: any, state: any) => ({
    ...base,
    background: state.isSelected
      ? "var(--chakra-colors-blue-500)"
      : state.isFocused
      ? "var(--chakra-colors-gray-100)"
      : "var(--chakra-colors-white)",
    color: state.isSelected
      ? "var(--chakra-colors-white)"
      : "var(--chakra-colors-gray-800)",
    borderRadius: "var(--chakra-radii-sm)",
    padding: "8px 12px",
  }),

  multiValue: (base: any) => ({
    ...base,
    background: "var(--chakra-colors-gray-100)",
    borderRadius: "var(--chakra-radii-md)",
    padding: "2px 6px",
  }),

  multiValueLabel: (base: any) => ({
    ...base,
    color: "var(--chakra-colors-gray-700)",
  }),

  multiValueRemove: (base: any) => ({
    ...base,
    borderRadius: "var(--chakra-radii-md)",
    "&:hover": {
      background: "var(--chakra-colors-red-500)",
      color: "var(--chakra-colors-white)",
    },
  }),

  menu: (base: any) => ({
    ...base,
    borderRadius: "var(--chakra-radii-md)",
    boxShadow: "var(--chakra-shadows-md)",
    overflow: "hidden",
    zIndex: 9999,
  }),

  placeholder: (base: any) => ({
    ...base,
    fonSize: "10px",
    color: "var(--chakra-colors-gray-400)",
  }),
};
