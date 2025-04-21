import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";

const blogMap = {
  "english-pronunciation-tips": lazy(() =>
    import("../BlogPosts/pronunciation-tips")
  ),
};

const BlogPost = () => {
  const { slug } = useParams();
  const PostComponent = blogMap[slug];

  if (!PostComponent) return <p>404 - Blog not found</p>;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PostComponent />
    </Suspense>
  );
};

export default BlogPost;
