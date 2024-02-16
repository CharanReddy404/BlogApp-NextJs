'use server';
import { revalidatePath } from 'next/cache';
import prisma from '../../db/prisma';
import { getSession } from '../session';

export async function createArticle(data) {
  const session = await getSession();
  if (!session) {
    return;
  }
  const newArticle = await prisma.article.create({
    data: { ...data, createdById: session.user.id },
  });
  return newArticle;
}

export async function getArticleById(id: number) {
  return await prisma.article.findUnique({ where: { id } });
}

export async function getAllArticles() {
  return await prisma.article.findMany();
}

export async function updateArticle(id: number, data) {
  const updatedArticle = await prisma.article.update({ where: { id }, data });
  revalidatePath(`/article/${id}`);
  return updatedArticle;
}

export async function deleteArticle(id: number) {
  return await prisma.article.delete({ where: { id } });
}
