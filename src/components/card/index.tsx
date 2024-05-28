import Link from "next/link";
import {
  Card as CardBase,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { type Shelter } from "@prisma/client";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { unmaskPhone, unmaskSocialMedia } from "~/lib/masks";
import { Button } from "../ui/button";

type Props = {
  shelter: Shelter;
} & React.ComponentProps<typeof CardBase>;

export function Card({ shelter, ...otherProps }: Props) {
  const fullAddress = `${shelter.addressStreet} ${shelter.addressNumber} ${shelter.addressNeighborhood}, ${shelter.addressCity}, ${shelter.addressState}`;

  const availableVacancies = shelter.capacity - shelter.occupancy;

  return (
    <CardBase key={shelter.id} className="w-full shadow-md" {...otherProps}>
      <CardHeader className="flex flex-col gap-1">
        <h4 className="text-lg font-medium">{shelter.name}</h4>
        {availableVacancies > 0 ? (
          <p className="text-md font-semibold text-green-600">
            Vagas disponíveis: {availableVacancies}
          </p>
        ) : (
          <p className="text-md font-semibold text-red-600">Vagas esgotadas</p>
        )}
        <Link
          href={`https://www.google.com/maps/search/${fullAddress}`}
          target="_blank"
          className="text-sm text-gray-500 underline"
        >
          {fullAddress}
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {shelter?.donations.length > 0 && (
          <CardSection title="Doações necessárias">
            <BadgeList>
              {shelter.donations.map((need) => (
                <Badge
                  key={need}
                  className="rounded-sm bg-[rgba(240,240,240,1)] font-normal text-slate-500"
                >
                  {need}
                </Badge>
              ))}
            </BadgeList>
          </CardSection>
        )}
        {shelter?.volunteers.length > 0 && (
          <CardSection title="Voluntários necessários">
            <BadgeList>
              {shelter.volunteers.map((volunteer) => (
                <Badge
                  key={volunteer}
                  className="rounded-sm bg-[rgba(240,240,240,1)] font-normal text-slate-500"
                >
                  {volunteer}
                </Badge>
              ))}
            </BadgeList>
          </CardSection>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4 text-neutral-50">
        <a
          className="inline-flex h-10 items-center justify-between gap-2 whitespace-nowrap rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-50 ring-offset-white transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900
dark:ring-offset-neutral-950 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300
          "
          target="_blank"
          href={`https://wa.me/+55${unmaskPhone(shelter.phone)}`}
        >
          Entre em contato <FaWhatsapp />
        </a>

        <div className="flex items-center space-x-3">
          {shelter.facebook && (
            <SocialLink
              href={`https://facebook.com/${unmaskSocialMedia(shelter.facebook)}`}
              icon={<FaFacebook size={20} />}
              label="Facebook"
            />
          )}

          {shelter.instagram && (
            <SocialLink
              href={`https://instagram.com/${unmaskSocialMedia(shelter.instagram)}`}
              icon={<FaInstagram size={20} />}
              label="Instagram"
            />
          )}

          {shelter.twitter && (
            <SocialLink
              href={`https://twitter.com/${unmaskSocialMedia(shelter.twitter)}`}
              icon={<RiTwitterXLine size={20} />}
              label="Twitter"
            />
          )}
        </div>
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
    <Button asChild variant="link" className="h-min p-1">
      <Link href={href}>
        {icon}
        <span className="sr-only">{label}</span>
      </Link>
    </Button>
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
