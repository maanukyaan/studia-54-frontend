import Image from "next/image";

interface IProjectItemProps {
  img: string;
  title: string;
  description: string;
}

function ProjectItem({ img, title, description }: IProjectItemProps) {
  return (
    <div>
      <Image
        src={`http://localhost:1337${img}`}
        alt="Project"
        width={580}
        height={360}
      />
      <h2 className="mt-[30px] mb-[20px] font-normal text-[32px] leading-[51.2px]">
        {title}
      </h2>
      <p className="font-normal text-[16px] leading-[25.6px] line-clamp-4">
        {description}
      </p>
    </div>
  );
}

export default ProjectItem;
