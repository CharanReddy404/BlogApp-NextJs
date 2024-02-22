import Link from "next/link";

export default function Home() {
  return (
    <main className='flex flex-col justify-center items-center gap-4'>
      <h1 className='text-4xl'>Blog App</h1>
      <Link className="bg-blue-500 text-white p-4"  href={'/article'}> All Articles</Link>
    </main>
  );
}
