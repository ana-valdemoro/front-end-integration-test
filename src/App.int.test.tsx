import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { getPostById as getPostByIdMocked } from "./services/postService";
import { App } from "./App";

jest.mock("./services/postService");

test("Can search for a post using its ID", async () => {
  const mockPost = {
    id: "1",
    title: "Post Title",
    body: "Post Body",
  };
  (getPostByIdMocked as any).mockResolvedValueOnce(mockPost);
  await act(async () => render(
      <App />
  ) as any);

  const searchPostLink = screen.getByText('Go to Post');
  expect(searchPostLink).toBeEnabled()
  user.click(searchPostLink)

  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() => screen.getByText(/welcome/i))

  expect(screen.getByText(/submit/i)).toBeDisabled();
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByText(/search.*post.*id/i)).toBeInTheDocument();

  user.type(screen.getByLabelText(/post id/i), mockPost.id);
  const submitButton = screen.getByText(/submit/i);
  expect(submitButton).toBeEnabled();
  user.click(submitButton);

  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() => screen.getByText(/loading/i))
  expect(getPostByIdMocked).toHaveBeenCalledWith(mockPost.id);
  expect(getPostByIdMocked).toHaveBeenCalledTimes(1);
  expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  expect(screen.getByText(mockPost.body)).toBeInTheDocument();
  user.click(screen.getByText(/back.*home/i));

  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() => screen.getByText(/welcome/i))
  expect(screen.getByText(/welcome/i)).toBeInTheDocument()
});