import BlogPostView from "@/components/blog-post-view";

export default function BlogPostPage({ params }: any) {
  return <BlogPostView slug={params.slug} />;
}
