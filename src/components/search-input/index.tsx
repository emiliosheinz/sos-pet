import { Input } from "~/components/ui/input";
import { Icons } from "../icons";

export function SearchInput() {
  return (
    <div className="relative w-full max-w-2xl">
      <Icons.SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      <Input
        className="shadow-s w-full rounded-md border border-gray-200 bg-white px-10 py-2 text-sm"
        placeholder="Buscar abrigo..."
        type="search"
      />
    </div>
  );
}
