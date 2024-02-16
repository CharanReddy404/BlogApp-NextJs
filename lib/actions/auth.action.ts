'use server';
import { cookies } from 'next/headers';
import { encrypt } from '../session';
import { createUser, getUserByEmail } from './user.action';
const bcrypt = require('bcryptjs');

export async function signup(name: string, email: string, password: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await createUser({ name, email, password: hashedPassword });

    if (newUser) {
      const user = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };

      const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
      const session = await encrypt({ user, expires });

      cookies().set('session', session, { expires, httpOnly: true });
    } else {
      throw new Error('user already exist');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function login(email: string, password: string) {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      const login = await bcrypt.compare(password, existingUser.password);

      if (login) {
        const user = {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
        };

        const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
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
  cookies().set('session', '', { expires: new Date(0) });
}
