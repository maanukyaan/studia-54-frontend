'use client';

import Loader from '@/components/@ui/loaders/Loader';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface NewsItem {
  id: number;
  title: string;
  text: string;
}

interface NewsResponse {
  news: NewsItem[];
}

function News() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<NewsItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<NewsResponse>('https://mocki.io/v1/3a06f14c-50a5-431a-8036-94bcfbec28c3')
      .then((response) => {
        setData(response.data.news);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load news.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <Loader />
        <span className='text-[13px] text-gray-400'>Loading news...</span>
      </div>
    );
  }

  if (error) {
    return <p className='text-red-500'>{error}</p>;
  }

  return (
    <div className='text-center'>
      {data?.map(({ id, title, text }) => (
        <div key={id} className='mb-5'>
          <p className='text-xl font-bold'>{title}</p>
          <span className='text-[13px] opacity-50'>{text}</span>
        </div>
      ))}
    </div>
  );
}

export default News;
