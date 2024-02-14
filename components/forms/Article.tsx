'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '../ui/form';
import { Input } from '../ui/input';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { createArticle, updateArticle } from '@/lib/actions/article.action';
import { ActionType } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import error from 'next/error';

const formArticleSchema = z.object({
  title: z.string().min(10),
  category: z.string().min(3),
  body: z.string().min(100),
  metadata: z.string(),
});

interface ArticleProps {
  id: number;
  title: string;
  category: string;
  body: string;
  metadata: string;
}

const Article = ({
  data,
  type,
}: {
  data?: ArticleProps | null;
  type: ActionType;
}) => {
  const editorRef = useRef(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formArticleSchema>>({
    resolver: zodResolver(formArticleSchema),
    defaultValues: {
      title: data ? data.title : '',
      category: data ? data.category : '',
      body: data ? data.body : '',
      metadata: data ? data.metadata : '',
    },
  });

  async function onSubmit(values: z.infer<typeof formArticleSchema>) {
    console.log(values);
    try {
      let id;
      switch (type) {
        case ActionType.Create:
          const article = await createArticle(values);
          id = article.id;
          break;
        case ActionType.Edit:
          await updateArticle(data.id, values);
          id = data.id;
          break;
        case ActionType.Delete:
          console.log('Performing delete action');
          break;
        default:
          console.log('Unknown action');
      }

      router.push(`/article/${id}`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder='category' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='body'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Detailed explanation of your problem{' '}
                <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl className='mt-3.5'>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={data ? data.body : ''}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      'advlist',
                      'autolink',
                      'lists',
                      'link',
                      'image',
                      'charmap',
                      'preview',
                      'anchor',
                      'searchreplace',
                      'visualblocks',
                      'fullscreen',
                      'insertdatetime',
                      'media',
                      'table',
                    ],
                    toolbar:
                      'undo redo | ' +
                      'bold italic forecolor | alignleft aligncenter | ' +
                      'alignright alignjustify | bullist numlist ',
                    content_style: 'body { font-family:Inter; font-size:16px }',
                  }}
                />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='metadata'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metadata</FormLabel>
              <FormControl>
                <Input placeholder='metadata' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-5'>
          <Button className='bg-red-600'>Cancel</Button>
          <Button type='submit' className='bg-green-600'>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Article;
