import parse from 'html-react-parser';
import { getArticleById } from '@/lib/actions/article.action';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/session';

export async function generateMetadata({ params }) {
  const article = await getArticleById(+params.id);
  return {
    title: article?.title,
    description: article?.title,
  };
}

const ArticlePage = async ({ params }) => {
  const session = await getSession();

  const article = await getArticleById(+params.id);
  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className='w-full p-5'>
      {session && (
        <div className='flex justify-end '>
          <Link href={`/article/edit/${article.id}`}>
            <Button className='bg-red-600'>Edit</Button>
          </Link>
        </div>
      )}

      <div className='flex flex-col gap-4 p-8 text-center'>
        <div className='font-bold text-3xl'>{article?.title}</div>
        <div className='flex flex-col'>{parse(article?.body)}</div>
      </div>
    </div>
  );
};

export default ArticlePage;
