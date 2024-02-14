import LeftSideBar from '@/components/LeftSideBar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex h-screen w-full'>
      <div className='hidden md:block md:w-[250px]'>
        <LeftSideBar />
      </div>
      {children}
    </section>
  );
}
