import LeftSideBar from '@/components/LeftSideBar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex w-full'>
      <LeftSideBar />
      {children}
    </section>
  );
}
