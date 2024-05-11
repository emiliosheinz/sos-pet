import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { CiFilter } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
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
import { z } from "zod";

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

// TODO: Replace `object` with form values type
type FormData = object;

export function Filters({ menus }: FiltersProps) {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const schema = z.object({});

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <CiFilter size={30} />
      </DrawerTrigger>
      <DrawerContent className="space-y-5 px-6 lg:px-80">
        {menus.map((menu, index) => (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger asChild>
              <Button className="flex justify-between" variant="outline">
                {menu.label} <FaChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
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
        <DrawerFooter className="flex flex-row items-center justify-center">
          <Button onClick={handleSubmit(onSubmit)}>Aplicar filtro</Button>
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
