import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import { Routes, Route, MemoryRouter, BrowserRouter } from "react-router-dom";
import { UserList } from "./UserList";
import user from "@testing-library/user-event";
import { getUsers } from "../../services/userService";
import { Button } from "../Button/Button";

const browserRouter = (
  <BrowserRouter>
    <Routes>
      <Route path="/users" element={<UserList />} />
    </Routes>
  </BrowserRouter>
);

beforeAll(() => {
  window.history.pushState({}, 'Post detail', '/users');
})

describe("Should render a component", () => {
  it("Should render component", async () => {
    await act(async () => render(browserRouter) as any);
    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() => screen.getAllByRole("listitem")[0]);
    
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
    expect(screen.getByText("Add")).toBeInTheDocument();
  });
});

describe("Test Button", () => {

  it("Should check the button add a new user when clicked", async() => {
    await act(async () => render(browserRouter) as any);

    await waitFor(() => screen.getAllByRole("listitem")[0]);

    const numberOfUsers = screen.getAllByRole("listitem").length;
    const button = screen.getByText("Add");
    user.click(button);
    
    expect(screen.getAllByRole("listitem").length).toBe(numberOfUsers +1);

  })

})

// it("should check could click on Button", async () => {
//     await act(async () => render(<UserList />) as any);
//     const button = screen.getByText("::Button::");
//     fireEvent.click(button);
//     expect(Button).toHaveBeenCalledTimes(1);
// });
