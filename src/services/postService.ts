export const getPostById = async (postId: string): Promise<any> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  return response.json();
};