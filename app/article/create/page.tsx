import Link from 'next/link';
import Article from '@/components/forms/Article';
import { ActionType } from '@/lib/utils';

const CreateArticle = () => {
  return (
    <div className='flex flex-col p-3 gap-2 w-full'>
      <div className='text-2xl'>
        /
        <Link className='font-bold' href={'/article'}>
          {' '}
          Article{' '}
        </Link>{' '}
        / create
      </div>
      <div className='p-3'>
        <Article type={ActionType.Create} />
      </div>
    </div>
  );
};

export default CreateArticle;
