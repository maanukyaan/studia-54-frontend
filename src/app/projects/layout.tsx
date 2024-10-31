"use client";

import Architecture from "@/assets/Architecture";
import Button from "@/components/@ui/Button";
import Tab from "@/components/@ui/Tab";
import Image from "next/image";
import house from "@/assets/img/house.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);

  return (
    <div className="w-full">
      <header className="bg-headerBackground min-h-[737px]">
        <div className="absolute left-1/2 top-[200px] transform-gpu translate-x-[-50%]">
          <Architecture />
        </div>
        <div className="absolute -left-[650px] top-[90px]">
          <Image src={house} width={1712} height={824} alt="House" />
        </div>

        <div className="absolute top-[462px] left-[60%] max-w-[579px] flex flex-col items-start gap-y-[27px]">
          <span className="text-headerTextBlack font-normal text-[16px] leading-[25.6px]">
            We, as a brand, turn your dreams into fantastique interiors and
            architectural designs. Our projects inspire the pursuit of your
            great aspirations. We create the alchemy of luxury and the enjoyment
            of our clientèle
          </span>

          <Button>All projects</Button>
        </div>
      </header>

      <div className="projects pt-[112px]">
        <div className="tabs__container flex items-center py-[30px] px-[60px] border border-[#5B5C5D] border-l-0 border-r-0">
          <Link href="architectural_design">
            <Tab active={isActive("architectural_design")}>
              Architectural Design
            </Tab>
          </Link>
          <div className="divider mx-[18px] h-[38px] w-[1px] bg-[#5B5C5D]"></div>

          <Link href="residential_interiors">
            <Tab active={isActive("residential_interiors")}>
              Residential Interiors
            </Tab>
          </Link>
          <div className="divider mx-[18px] h-[38px] w-[1px] bg-[#5B5C5D]"></div>

          <Link href="commercial_interior">
            <Tab active={isActive("commercial_interior")}>
              Commercial Interior
            </Tab>
          </Link>
        </div>

        <div
          className="projects__container py-[70px] px-[60px] pb-[200px] gap-x-[30px]
        gap-y-[70px] flex flex-wrap justify-between items-start"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
