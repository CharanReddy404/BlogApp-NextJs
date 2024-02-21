import { getUniqueCategories } from '@/lib/actions/article.action';
import Link from 'next/link';

const LeftSideBar = async () => {
  const menu = [
    { id: 1, name: 'All Articles', href: '/article' },
    { id: 2, name: 'Create Articles', href: '/article/create' },
  ];

  const Categories = await getUniqueCategories();

  return (
    <div className='p-6 hidden md:block md:w-[250px] md:shadow-md h-screen'>
      <div className='flex flex-col gap-4 pt-4'>
        {menu.map((v) => (
          <Link key={v.id} href={v.href} className=''>
            {v.name}
          </Link>
        ))}
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
