import { getUniqueCategories } from '@/lib/actions/article.action';
import { getSession } from '@/lib/session';
import Link from 'next/link';

const LeftSideBar = async () => {
  const session = await getSession();

  const Categories = await getUniqueCategories();

  return (
    <div className='p-6 hidden md:block md:w-[250px] md:shadow-md h-screen'>
      <div className='flex flex-col gap-4 pt-4'>
        <Link href={'/article'}>All Articles</Link>
        {session && <Link href={'/article/create'}>Create Articles</Link>}
        <hr className='px-3' />

        <h1 className='font-bold'>Categories</h1>
        <hr />
        {Categories.map((categorie) => (
          <>
            <Link
              key={categorie}
              href={`/article/categorie/${categorie}`}
              className='font-medium'
            >
              {categorie}
            </Link>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
