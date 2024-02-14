import Link from 'next/link';

const LeftSideBar = () => {
  const menu = [
    { id: 1, name: 'All Articles', href: '/article' },
    { id: 2, name: 'Create Articles', href: '/article/create' },
  ];
  return (
    <div className='hidden md:block md:w-[250px] md:shadow-md h-screen'>
      <div className='text-center flex flex-col gap-4 pt-4'>
        {menu.map((v) => (
          <Link key={v.id} href={v.href} className=''>
            {v.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
