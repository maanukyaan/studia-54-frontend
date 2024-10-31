"use client";

import Loader from "@/components/@ui/loaders/Loader";
import ProjectItem from "@/components/ProjectItem";
import { IContentPost } from "@/types/IContentPosts";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<IContentPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedProjects, setRecommendedProjects] = useState<
    IContentPost[]
  >([]);
  const [contentImages, setContentImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/content-posts-plural?filters[documentId][$eq]=${id}&populate=*`
        );

        if (response.data.data && response.data.data.length > 0) {
          setPost(response.data.data[0]);
          const documentId = response.data.data[0].content?.documentId; // Проверяем наличие documentId
          if (documentId) {
            await fetchContent(documentId);
          }
        } else {
          setError("Пост не найден");
        }
      } catch (err) {
        setError("Ошибка при загрузке поста");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchContent = async (documentId: string) => {
      try {
        const contentResponse = await axios.get(
          `http://localhost:1337/api/contents?filters[documentId][$eq]=${documentId}&populate=*`
        );
        if (contentResponse.data.data && contentResponse.data.data.length > 0) {
          setContentImages(contentResponse.data.data[0].Media); // Сохраняем медиа
        }
      } catch (err) {
        return;
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchRecommendedProjects = async () => {
      if (post) {
        try {
          const response = await axios.get(
            `http://localhost:1337/api/content-posts-plural?filters[type][$eq]=${post.type}&filters[documentId][$ne]=${post.documentId}&pagination[limit]=3&populate=*`
          );
          setRecommendedProjects(response.data.data);
        } catch (err) {
          console.error("Ошибка при загрузке рекомендованных проектов:", err);
        }
      }
    };

    fetchRecommendedProjects();
  }, [post]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  } else if (!post) {
    return <div>Пост не найден</div>;
  }

  return (
    <div className="w-full min-h-dvh pb-[30px]">
      <div
        className="min-h-[738px] bg-cover flex items-center justify-center p-[60px] gap-x-[40px]"
        style={{
          backgroundImage: `linear-gradient(rgb(0 0 0 / .65), rgb(0 0 0 / .65)), url(http://localhost:1337${post.post_image.formats.medium.url})`,
        }}
      >
        <h1 className="font-bold text-[48px] leading-[76.8px]">{post.title}</h1>
        <p className="max-w-[50%] font-normal text-[16px] leading-[25.6px]">
          {post.description}
        </p>
      </div>

      <div className="breadcrumbs px-[60px] pt-[46px] pb-[47px] border-b border-[#5B5C5D] flex items-center gap-x-[20px]">
        <Link
          href="/projects"
          className="font-normal text-[16px] leading-[19.36px]"
        >
          Projects
        </Link>
        <div className="divider h-[19px] w-[1px] bg-[#5B5C5D]"></div>
        <Link
          href={`/projects/${post.type}`}
          className="font-normal text-[16px] leading-[19.36px]"
        >
          {post.type
            .replace(/_/g, " ")
            .replace(/^./, (char) => char.toUpperCase())}
        </Link>
        <div className="divider h-[19px] w-[1px] bg-[#5B5C5D]"></div>
        <span className="text-[#9C9393] font-normal text-[16px] leading-[19.36px]">
          {post.title}
        </span>
      </div>

      {post.content?.Content && post.content.Content.length > 0 ? (
        <div className="flex">
          {/* Отображение загруженных медиафайлов */}
          {contentImages.length > 0 && (
            <div className="media-gallery py-[130px] px-[60px] flex flex-col gap-y-[20px]">
              {contentImages.map((image) => (
                <img
                  key={image.id}
                  src={`http://localhost:1337${image.url}`}
                  alt={image.name}
                  className="media-image"
                />
              ))}
            </div>
          )}
          <div className="content py-[130px] px-[60px] w-full h-full flex flex-col gap-y-[26px]">
            {post.content.Content.map((item, index) => (
              <p
                key={index}
                className="font-normal text-[20px] leading-[25.6px]"
                style={{
                  fontWeight: item.children[0]?.bold ? "bold" : "normal",
                  fontStyle: item.children[0]?.italic ? "italic" : "normal",
                  textDecoration: `${
                    item.children[0]?.underline ? "underline" : ""
                  } ${item.children[0]?.strikethrough ? "line-through" : ""}`,
                }}
              >
                {item.children[0]?.text}
              </p>
            ))}
          </div>
        </div>
      ) : (
        // Если привязанного контента нет, показываем стандартный контент
        <div className="content py-[130px] px-[60px] w-full h-full flex items-center justify-between gap-x-[112px]">
          <img
            src={`http://localhost:1337${post.post_image.formats.large.url}`}
            alt="Content image"
          />
          <div className="flex flex-col justify-between gap-y-[26px] h-full">
            <h2 className="font-normal text-[32px] leading-[51.2px]">
              {post.title}
            </h2>
            <span className="font-normal text-[16px] leading-[25.6px]">
              {post.description}
            </span>
          </div>
        </div>
      )}

      <div className="recommendations px-[61px] pb-[190px]">
        <div className="w-full h-[1px] bg-[#5B5C5D] mb-[130px]"></div>
        <h3 className="font-semibold text-[32px] leading-[51.2px]">
          We also recommend
        </h3>
        <div className="mt-[50px] flex items-center justify-between gap-x-[20px]">
          {recommendedProjects.map((item) => (
            <div className="w-[30%]" key={item.id}>
              <Link href={`/project/${item.documentId}`}>
                <ProjectItem
                  img={item.post_image.formats.large.url}
                  title={item.title}
                  description={item.description}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
