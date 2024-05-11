import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { BsFilterLeft } from "react-icons/bs";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { ChevronDown } from "lucide-react";

type DropdownMenuItem = {
  label: string;
  checked: boolean;
};

type DropdownMenuConfig = {
  label: string;
  items: DropdownMenuItem[];
};

type FiltersProps = {
  menus: DropdownMenuConfig[];
};

type FormData = object;

export function Filters({ menus }: FiltersProps) {
  const { handleSubmit, setValue } = useForm();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <BsFilterLeft size={30} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-3">
        <SheetHeader className="text-lg font-medium">Filtros</SheetHeader>
        {menus.map((menu, index) => (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger asChild>
              <Button className="flex w-full justify-between" variant="outline">
                {menu.label} <ChevronDown size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-60">
              <DropdownMenuLabel>{menu.label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {menu.items.map((item, itemIndex) => (
                <DropdownMenuCheckboxItem
                  key={itemIndex}
                  checked={item.checked}
                  onCheckedChange={(checked) => {
                    setValue(`${menu.label}.${item.label}`, checked);
                  }}
                >
                  {item.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
        <SheetFooter className="flex flex-row justify-end gap-2 p-0">
          <Button
            variant="outline"
            onClick={() => {
              menus.forEach((menu) => {
                menu.items.forEach((item) => {
                  setValue(`${menu.label}.${item.label}`, false);
                });
              });
            }}
          >
            Limpar
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>Aplicar filtro</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
