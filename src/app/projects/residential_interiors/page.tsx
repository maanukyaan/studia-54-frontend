"use client";

import Loader from "@/components/@ui/loaders/Loader";
import ProjectItem from "@/components/ProjectItem";
import { IContentPost } from "@/types/IContentPosts";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ResidentalInteriors() {
  const [projectItems, setProjectItems] = useState<IContentPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/content-posts-plural?filters[type][$eq]=residential_interiors&populate=*"
        );
        setProjectItems(response.data.data); // Записываем данные в состояние
      } catch (err) {
        setError("Ошибка при загрузке данных");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectItems();
  }, []);

  // Если данные загружаются, показываем индикатор загрузки
  if (loading) {
    return <Loader />;
  }

  // Если произошла ошибка
  if (error) {
    return <div>{error}</div>;
  }

  return projectItems.map((item) => (
    <div className="w-[30%]" key={item.id}>
      <Link href={`/project/${item.documentId}`}>
        <ProjectItem
          key={item.id}
          img={item.post_image.formats.large.url}
          title={item.title}
          description={item.description}
        />
      </Link>
    </div>
  ));
}
