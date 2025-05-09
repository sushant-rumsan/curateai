import BlogPostView from "@/components/blog-post-view";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogPostView slug={params.slug} />;
}
