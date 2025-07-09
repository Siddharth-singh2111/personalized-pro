'use client';

import { useEffect, useState } from "react";
import mockSocialPosts from "@/data/mockSocialPosts.json";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import withAuth from "@/components/Auth/withAuth";

function SocialPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    setPosts(mockSocialPosts);
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">📱 Social Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">
              {post.content.replace(/#(\w+)/g, "#$1 🔥")}
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default withAuth(SocialPage);
