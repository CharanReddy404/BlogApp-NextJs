'use client';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from './ui/menubar';
import { logout } from '@/lib/actions/auth.action';

const AvatarControl = ({ user }) => {
  const router = useRouter();
  const logoutUser = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={logoutUser}>logout</MenubarItem>
          {/* <MenubarSeparator /> */}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default AvatarControl;
