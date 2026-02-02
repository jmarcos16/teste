import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
  return rss({
    title: 'BETA Stack Blog',
    description: 'Blog posts about BETA Stack: Bun, Elysia, Eden Treaty, Tailwind, daisyUI, and Astro.',
    site: context.site ?? 'https://beta-stack.example.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}`,
    })),
  });
}
