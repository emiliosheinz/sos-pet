import { Input } from "~/components/ui/input";
import { CiSearch } from "react-icons/ci";

type SearchInputProps = {
  handleSearch: (event: { target: { value: string } }) => void;
};

export function SearchInput({ handleSearch }: SearchInputProps) {
  return (
    <div className="relative w-full">
      <CiSearch
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <Input
        className="shadow-s w-full rounded-md border border-gray-200 bg-white px-10 py-2 text-sm"
        placeholder="Buscar abrigo..."
        type="search"
        onChange={handleSearch}
      />
    </div>
  );
}
