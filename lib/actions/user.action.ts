'use server';
import prisma from '../../db/prisma';
const bcrypt = require('bcryptjs');

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  try {
    console.log('------>', name, email, password);

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const res = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
