import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from '../../services/postService';

export const Post = (): JSX.Element => {
  const { id } = useParams();
  const [post, setPost] = useState<any>();
  const [error, setError] = useState<any>(false);


  useEffect(() => {
    if (id) {
      (async () => {
        let responsePost;
        try {
          responsePost = await getPostById(id);
        } catch (error) {
          setError(true);
        }
        if (responsePost) {
          setPost(responsePost)
        }

      })();
    }
    return function cleanup() {
      setPost(null);
      setError(false);
    };

  }, [id]);

  if (error) {
    return (<h1>Error happened</h1>);
  }

  return (
    <div>
      <h1>Post {id}</h1>
      {!post
        ? <p>Loading...</p>
        : (
          <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </>
        )
      }
      <Link to="/post">Back to Home</Link>
    </div>
  );
}