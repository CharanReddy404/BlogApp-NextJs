'use server';
import { User } from '@prisma/client';
import prisma from '../../db/prisma';

export async function createUser(data: Omit<User, 'id'>): Promise<User> {
  return prisma.user.create({ data });
}

export async function getUserById(id: number): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function updateUser(
  id: number,
  data: Partial<User>
): Promise<User | null> {
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: number): Promise<User | null> {
  return prisma.user.delete({ where: { id } });
}
