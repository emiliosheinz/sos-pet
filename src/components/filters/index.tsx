import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Icons } from "../icons";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export function Filters() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Icons.FilterIcon />
      </DrawerTrigger>
      <DrawerContent className="space-y-5 px-6 lg:px-80">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex justify-between" variant="outline">
              Cidades <Icons.ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Cidades</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={true} onCheckedChange={() => {}}>
              Novo Hamburgo
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={false}
              onCheckedChange={() => {}}
            >
              Estancia velha
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={true} onCheckedChange={() => {}}>
              Campo Bom
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DrawerFooter className="flex flex-row items-center justify-center">
          <Button>Aplicar filtro</Button>
          <Button variant="outline">Limpar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
