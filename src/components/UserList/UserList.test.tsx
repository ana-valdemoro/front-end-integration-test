import { render, screen, act, fireEvent } from "@testing-library/react";
import { UserList } from "./UserList";
import { getUsers } from "../../services/userService";
import { Button } from "../Button/Button";

const users = [
    { id: 1, name: "Pepa juana" },
    { id: 2, name: "juana" },
    { id: 3, name: "Pepa" },
];

jest.mock("../../services/userService", () => ({
    getUsers: jest.fn(() => Promise.resolve(users)),
}));

jest.mock("../Button/Button", () => ({
    Button: jest.fn(() => <div>::Button::</div>),
}));

afterEach(() => {
    jest.clearAllMocks()
});

it("should not render UserList component", () => {
    render(<UserList />);
    const linkElement = screen.queryByRole("list");
    expect(linkElement).not.toBeInTheDocument();
});

it("should render UserList component after call our getUser service", async () => {
    await act(async () => render(<UserList />) as any);
    expect(getUsers).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(Button).toBeCalledTimes(1)
});


it("should check could click on Button", async () => {
    await act(async () => render(<UserList />) as any);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    const button = screen.getByText("::Button::");
    fireEvent.click(button);
    expect(Button).toHaveBeenCalledTimes(1);
});