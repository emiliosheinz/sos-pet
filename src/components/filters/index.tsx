import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Icons } from "../icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

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
              Cidade <Icons.ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] p-4">
            <DropdownMenuLabel className="font-semibold">
              Cidade
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="mb-4" />
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="option1" name="filter" />
                <Label htmlFor="option1">Novo Hamburgo</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="option2" name="filter" />
                <Label htmlFor="option2">Estancia velha</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="option3" name="filter" />
                <Label htmlFor="option3">Campo Bom</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="option4" name="filter" />
                <Label htmlFor="option4">Porto Alegre</Label>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex justify-between" variant="outline">
              Tipo de doação <Icons.ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] p-4">
            <DropdownMenuLabel className="font-semibold">
              Tipo de doação
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="mb-4" />
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="option1" name="filter" />
                <Label htmlFor="option1">Tipo 1</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="option2" name="filter" />
                <Label htmlFor="option2">Tipo 2</Label>
              </div>
            </div>
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
