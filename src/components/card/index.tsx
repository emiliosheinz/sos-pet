import Link from "next/link";
import {
  Card as CardBase,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Icons } from "../icons";

export function Card() {
  return (
    <CardBase key="1" className="shadow-md md:w-[672px]">
      <CardHeader>
        <div className="flex justify-between">
          <h4 className="text-lg font-medium">Acme Inc</h4>
          <div className="flex items-center space-x-3">
            <SocialLink
              href="#"
              icon={<Icons.FacebookIcon />}
              label="Facebook"
            />
            <SocialLink
              href="#"
              icon={<Icons.InstagramIcon />}
              label="Instagram"
            />
            <SocialLink href="#" icon={<Icons.XIcon />} label="Twitter" />
          </div>
        </div>
        <Link href="#" className="text-sm text-gray-500 underline">
          Endereço
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardSection title="Doações necessárias">
          <BadgeList>
            <Badge className="rounded-sm bg-[rgba(240,240,240,1)] font-normal text-slate-500">
              Alimentos
            </Badge>
          </BadgeList>
        </CardSection>
        <CardSection title="Voluntários necessários">
          <BadgeList>
            <Badge className="rounded-sm bg-[rgba(240,240,240,1)] font-normal text-slate-500">
              Distribuição
            </Badge>
          </BadgeList>
        </CardSection>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button>Entre em contato</Button>
        <p className="text-xl font-semibold text-green-600">Vagas: 10</p>
      </CardFooter>
    </CardBase>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link href={href}>
      <div className="flex items-center space-x-1">
        {icon}
        <span className="sr-only">{label}</span>
      </div>
    </Link>
  );
}

function CardSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h5 className="mb-2 text-sm font-medium">{title}</h5>
      {children}
    </div>
  );
}

function BadgeList({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}
