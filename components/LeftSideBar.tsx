import { getAllArticles } from '@/lib/actions/article.action';
import { getSession } from '@/lib/session';
import Link from 'next/link';

const LeftSideBar = async () => {
  const session = await getSession();

  const response: any = await getAllArticles();

  const postArray = response.reduce((result: any, post: any) => {
    const { category, title, id } = post;

    if (!result[category]) {
      result[category] = [];
    }

    result[category].push({ title, id });

    return result;
  }, {});

  console.log("postArray  ", postArray);


  return (
    <div className='p-6 hidden md:block md:w-[250px] md:shadow-md h-screen'>
      <div className='flex flex-col gap-4 pt-4'>
      <Link href={'/article'}>All Articles</Link>
        {session && <Link href={'/article/create'}>Create Articles</Link>}
        <hr className='px-3' />
        <h1 className='font-bold text-3xl'>Categories</h1>

        {Object.entries(postArray).map(([category, titles]: [any, any]) => (
          <>
            <div key={category}>
              {/* Category */}
              <div className="text-xl font-bold">{category}</div>

              {/* Titles under the category */}
              <div className="ml-4">
                {titles.map((title: any) => (
                  <div key={title.id} >
                    <Link
                      href={`/article/${title.id}`}
                      className="hover:underline overflow-hidden"
                    >
                      {title.title}
                    </Link>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-t-2 border-gray-300" />
            </div>
          </>
        ))}

      </div>
    </div>
  );
};

export default LeftSideBar;
