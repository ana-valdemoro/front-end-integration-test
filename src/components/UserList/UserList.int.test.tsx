import { render, screen, act, fireEvent } from "@testing-library/react";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import { UserList } from "./UserList";
import { getUsers } from "../../services/userService";
import { Button } from "../Button/Button";

const memoryRouter = (
  <MemoryRouter initialEntries={[`/users`]}>
    <Routes>
      <Route path="/users" element={<UserList />} />
    </Routes>
  </MemoryRouter>
);

describe("", () => {
  it("Should render component", async () => {
    await act(async () => render(memoryRouter) as any);

    expect(getUsers).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Add")).toBeInTheDocument();
  });
});

// it("should check could click on Button", async () => {
//     await act(async () => render(<UserList />) as any);
//     const button = screen.getByText("::Button::");
//     fireEvent.click(button);
//     expect(Button).toHaveBeenCalledTimes(1);
// });
