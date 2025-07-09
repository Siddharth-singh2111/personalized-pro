import SocialPost from "@/components/Social/SocialPost";
import { mockSocialPosts } from "@/data/mockSocialPosts";

export default function SocialFeedPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Social Media Feed
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSocialPosts.map((post) => (
          <SocialPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
