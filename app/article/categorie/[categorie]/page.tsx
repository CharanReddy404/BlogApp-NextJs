import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getArticlesByCategory } from '@/lib/actions/article.action';
import Link from 'next/link';
import React from 'react';

const CategoriePage = async ({ params }) => {
  const articles = await getArticlesByCategory(params.categorie);

  return (
    <div className='flex flex-col p-4 pt-8'>
      <h1 className='text-2xl font-bold'>
        Articles Categorie: {params.categorie}
      </h1>
      <div className='pt-6 flex flex-col gap-2'>
        {articles.length > 0 ? (
          articles.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.category}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <h1>No articles found</h1>
        )}
      </div>
    </div>
  );
};

export default CategoriePage;
