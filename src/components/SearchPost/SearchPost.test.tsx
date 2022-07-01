import React from "react";
import { act, render, screen } from "@testing-library/react";
import { getPostById as getPostByIdMocked} from '../../services/postService';
import { SearchPost } from "./SearchPost";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockPost = {
  id: "1",
  title: "Post Title",
  body: "Post Body",
};

jest.mock("../../services/postService", () => ({
  getPostById: jest.fn(() => Promise.resolve(mockPost))
}));

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockUseNavigate,
}));

afterEach(jest.clearAllMocks)

describe('SearchPost', () => {
  test("Should render without errors", async () => {
    const mockPost = {
      id: "1",
      title: "Post Title",
      body: "Post Body",
    };
    (getPostByIdMocked as any).mockResolvedValueOnce(mockPost);
    await act(async () => render(
      <BrowserRouter>
        <SearchPost />
      </BrowserRouter>
    ) as any);
  
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Search for a post by its ID')).toBeInTheDocument();
    expect(screen.getByText('Post ID:')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('Button should be disabled if there is no postId set', async () => {
    await act(async () => render(
      <BrowserRouter>
        <SearchPost />
      </BrowserRouter>
    ) as any);

    expect(screen.getByRole('button')).toBeDisabled();
  })

  test('Button should be enabled if there is no postId set', async () => {
    await act(async () => render(
      <BrowserRouter>
        <SearchPost />
      </BrowserRouter>
    ) as any);

    const input = screen.getByLabelText('Post ID:') 
    userEvent.type(input, mockPost.id)
    
    const button = screen.getByRole('button') as HTMLButtonElement
    expect(button).toBeEnabled();
  })

  test('should navigate to Post detail page when clicking on enabled button', async () => {
    render(
      <BrowserRouter>
        <SearchPost />
      </BrowserRouter>
    );
    const input = screen.getByLabelText('Post ID:') 
    userEvent.type(input, mockPost.id)
    
    const button = screen.getByRole('button') as HTMLButtonElement
    userEvent.click(button)
    expect(mockUseNavigate).toBeCalledTimes(1)
  })
})
