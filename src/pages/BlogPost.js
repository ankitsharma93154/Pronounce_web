import { useParams } from "react-router-dom";
import { Suspense } from "react";

import EnglishPronunciationTips from "../BlogPosts/pronunciation-tips";

const blogMap = {
  "english-pronunciation-tips": EnglishPronunciationTips,
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
