import { Button } from './ui/button';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='w-full py-2 px-5 flex justify-between items-center shadow-sm fixed bg-white'>
      <div className='font-bold'>Blog App</div>
      <div className='flex gap-3'>
        <Button variant='secondary'>
          <Link href='/login'>Log in</Link>
        </Button>
        <Button className='bg-blue-700'>
          <Link href='/signup'>Sign up</Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
