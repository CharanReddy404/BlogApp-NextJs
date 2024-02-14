import parse from 'html-react-parser';
import { getArticleById } from '@/lib/actions/article.action';

export async function generateMetadata({ params }) {
  const article = await getArticleById(+params.id);
  return {
    title: article?.title,
    description: article?.title,
  };
}

const ArticlePage = async ({ params }) => {
  console.log(params);
  const article = await getArticleById(+params.id);
  console.log(article);
  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className='flex flex-col gap-4 p-8 text-center'>
      <div className='font-bold text-3xl'>{article?.title}</div>
      <div className='flex flex-col'>{parse(article?.body)}</div>
    </div>
  );
};

export default ArticlePage;
