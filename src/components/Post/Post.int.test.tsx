import { Post } from "./Post";
import { act, render, screen, waitFor } from "@testing-library/react";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { SearchPost } from "../SearchPost/SearchPost";

const memoryRouter = (id: number) => (<MemoryRouter initialEntries={[`/post/${id}`]}>
    <Routes>
        <Route path="/post" element={<SearchPost />} />
        <Route path="/post/:id" element={<Post />} />
    </Routes>
</MemoryRouter>);

describe("When Link is clicked", () => {

    it("Should navigate to parent list", async () => {
        await act(async () => render(memoryRouter(5)) as any);

        const backToHomeLink = screen.getByText('Back to Home') as HTMLLinkElement;
        userEvent.click(backToHomeLink);

        // eslint-disable-next-line testing-library/prefer-find-by
        await waitFor(() => screen.getByText("Welcome!"))
        expect(screen.getByText("Welcome!")).toBeInTheDocument()
    });

});


describe("When Post component render", () => {

    it("Should show Post information", async () => {
        await act(async () => render(memoryRouter(5)) as any);

        // await waitFor(() => screen.findByText("nesciunt quas odio"));
        expect(await screen.findByText("nesciunt quas odio")).toBeInTheDocument();
        expect(await screen.findByText(/repudiandae/i)).toBeInTheDocument();
    });

    // it.only("Should show Loading to infinity and beyond", async () => {
    //     // await render(memoryRouter(200)) as any;
    //     await act(async () => render(memoryRouter(200)) as any);

    //     await waitFor(() => screen.findByText("Error happened"));
    // });

});