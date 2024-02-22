import Link from 'next/link';
import Article from '@/components/forms/Article';
import { getAllArticleIds, getArticleById } from '@/lib/actions/article.action';
import { ActionType } from '@/lib/utils';

export async function generateStaticParams() {
  const ids = await getAllArticleIds();
  return ids.map((v) => ({ id: v.id.toString() }));
}

const EditArticle = async ({ params }: any) => {
  const article = await getArticleById(+params.id);
  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className='flex flex-col p-3 gap-2 w-full'>
      <div className='text-2xl'>
        /
        <Link className='font-bold' href={`/article/${params.id}`}>
          {' '}
          Article{' '}
        </Link>{' '}
        / edit
      </div>
      <div className='p-3'>
        <Article data={article} type={ActionType.Edit} />
      </div>
    </div>
  );
};

export default EditArticle;
