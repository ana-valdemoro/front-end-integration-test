import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";

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


describe("When mount component", () => {

  it("Should render a list of users and a button", async () => {

    await act(async () => render(memoryRouter) as any);

    //await waitFor(() => screen.getAllByRole("listitem")[0])

    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() => screen.getByRole("list"))

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
    expect(screen.getByText("Add")).toBeInTheDocument();

  });

});