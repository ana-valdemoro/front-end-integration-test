export const getPostById = async (postId: string): Promise<any> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (response.status === 404) {
    throw new Error(response.statusText);
  }

  if (response.status !== 200) {
    throw new Error("Aqui ha petado");
  }

  return response.json();
};