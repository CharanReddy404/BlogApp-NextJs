'use server';
import { cookies } from 'next/headers';
import prisma from '../../db/prisma';
import { encrypt } from '../session';
const bcrypt = require('bcryptjs');

export async function login(email: string, password: string) {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log('user-->', existingUser);
      const login = await bcrypt.compare(password, existingUser.password);

      console.log('login', login);
      if (login) {
        const user = { email: existingUser.email, name: existingUser.name };

        const expires = new Date(Date.now() + 10 * 1000);
        const session = await encrypt({ user, expires });

        cookies().set('session', session, { expires, httpOnly: true });
      } else {
        throw new Error('Invalid credentials');
      }
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  // Destroy the session
  cookies().set('session', '', { expires: new Date(0) });
}
