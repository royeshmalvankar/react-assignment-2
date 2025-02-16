import { useState } from "react";
import axios from "axios";
import Post from "./Post";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";

function Posts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  async function fetchAndUpdateData() {
    setLoading(true);
    try {
      {
        let resp = await axios({
          method: "get",
          url: "https://jsonplaceholder.typicode.com/posts",
        });
        setPosts(resp?.data);
        setLoading(false);
      }
    } catch (error) {
      {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    }
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div>
      <h1>List of Posts</h1>
      <button onClick={fetchAndUpdateData}>
        Click to display list of posts
      </button>
      {posts.map((post) => <Post key={post.id} title={post.title} body={post.body} />)}
    </div>
  );
}

export default Posts;
