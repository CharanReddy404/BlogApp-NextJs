'use server';
import prisma from '../../db/prisma';
import { getSession } from '../session';

export async function createArticle(data) {
  const session = await getSession();
  if (!session) {
    return;
  }
  console.log(session?.user);
  const newArticle = await prisma.article.create({
    data: { ...data, createdById: session.user.id },
  });
  console.log(newArticle);
}

export async function getArticleById(id: number) {
  return prisma.article.findUnique({ where: { id } });
}

export async function getAllArticles() {
  return prisma.article.findMany();
}

export async function updateArticle(id: number, data) {
  return prisma.article.update({ where: { id }, data });
}

export async function deleteArticle(id: number) {
  return prisma.article.delete({ where: { id } });
}
