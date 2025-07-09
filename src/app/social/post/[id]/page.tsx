// src/app/social/post/[id]/page.tsx
import { mockSocialPosts } from "@/data/mockSocialPosts";

type Props = {
  params: {
    id: string;
  };
};

export default function SocialPostDetail({ params }: Props) {
  const post = mockSocialPosts.find((p) => p.id === Number(params.id));

  if (!post) {
    return <div className="text-red-500">Post not found.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <img src={post.avatar} className="w-14 h-14 rounded-full" alt={post.user} />
        <div>
          <h2 className="font-bold text-lg">@{post.user}</h2>
          <p className="text-sm text-gray-500">{post.timestamp}</p>
        </div>
      </div>
      <p className="text-gray-700 text-base">{post.content}</p>
    </div>
  );
}
