import { getSession } from '@/lib/session';
import { Button } from './ui/button';
import Link from 'next/link';
import AvatarControl from './AvatarControl';

const Header = async () => {
  const session = await getSession();

  let user = null;
  if (session) {
    user = session.user;
  }

  return (
    <div className='w-full py-2 px-5 flex justify-between items-center shadow-md fixed bg-white'>
      <Link href={'/article'} className='font-bold'>
        Blog App
      </Link>
      <div className='flex gap-3'>
        {user ? (
          <AvatarControl user={user} />
        ) : (
          <>
            <Button variant='secondary'>
              <Link href='/login'>Log in</Link>
            </Button>
            <Button className='bg-blue-700'>
              <Link href='/signup'>Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
