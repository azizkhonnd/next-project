import { notFound } from 'next/navigation';
import Image from 'next/image';

async function getPost(id) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!res.ok) {
    notFound();
  }
  const post = await res.json();
  return post;
}

export default async function Post({ params }) {
  const post = await getPost(params.id);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Image src={computerImg} alt={post.title} width={600} height={300} />
      <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
      <p className="text-gray-500 mt-2">{new Date(post.date).toDateString()}</p>
      <p className="mt-4 text-lg">{post.body}</p>
    </div>
  );
}
