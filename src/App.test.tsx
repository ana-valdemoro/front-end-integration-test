import React from "react";
import { render, screen} from "@testing-library/react";
import { App } from "./App";
import { UserList as UserListMocked } from "./components/UserList/UserList";
import { SearchPost as searchPostMocked } from "./components/SearchPost/SearchPost";
import { Post as PostMocked } from "./components/Post/Post";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

jest.mock("./components/UserList/UserList", () => ({
  UserList: jest.fn(() => <div>::UserList::</div>)
}))
jest.mock("./components/SearchPost/SearchPost", () => ({
  SearchPost: jest.fn(() => <div>::SearchPost::</div>)
}))
jest.mock("./components/Post/Post", () => ({
  Post: jest.fn(() => <div>::Post::</div>)
}))

afterEach(jest.clearAllMocks)

describe('App', () => {
  test("should render without errors", async () => {
    render(<App />);
  
    expect(screen.getByText('Go to Users list')).toBeInTheDocument();
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to Post')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument()
  });

  test('should go to SearchPost page', async () => {
    render(<App/>)
    const searchPostButton = screen.getByText('Go to Post') as HTMLLinkElement
    userEvent.click(searchPostButton)
    expect(await screen.findByText('::SearchPost::')).toBeInTheDocument()
    expect(searchPostMocked).toBeCalledTimes(1)
  })

  test('should go to UserList page', async () => {
    render(<App/>)
    const userListButton = screen.getByText('Go to Users list') as HTMLLinkElement
    userEvent.click(userListButton)
    expect(await screen.findByText('::UserList::')).toBeInTheDocument()
    expect(UserListMocked).toBeCalledTimes(1)
  })

  test('should go to Home page', async () => {
    render(<App/>)
    const homeButton = screen.getByText('Go to Home') as HTMLLinkElement
    userEvent.click(homeButton)
    expect(await screen.findByText('Home')).toBeInTheDocument()
  })

  describe('without Link', () => {
    beforeAll(() => {
      window.history.pushState({}, 'Post detail', '/post/1');
    })

    test('should go to Post page', async () => {
      render(
          <App/>
      )
      expect(await screen.findByText('::Post::')).toBeInTheDocument()
      expect(PostMocked).toBeCalledTimes(1)
    })
  })
})
