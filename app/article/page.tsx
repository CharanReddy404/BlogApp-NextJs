import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getAllArticles } from '@/lib/actions/article.action';
import Link from 'next/link';

const AllArticlePage = async () => {
  const allArticles = await getAllArticles();
  return (
    <div className='flex flex-col p-4 pt-8'>
      <h1 className='text-2xl font-bold'>All Articles</h1>
      <div className='pt-6 flex flex-col gap-2'>
        {allArticles.map((article) => (
          <Link key={article.id} href={`/article/${article.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.category}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllArticlePage;
