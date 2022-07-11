import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getPostById } from '../../services/postService';


import { BrowserRouter, useParams } from "react-router-dom";

// import userEvent from "@testing-library/user-event";

import { Post } from "./Post";



afterEach(() => {

    (getPostById as jest.Mock).mockReset();
    // (useParams as jest.Mock).mockReset();

});



jest.mock("../../services/postService", () => ({

    getPostById: jest.fn()

}));



// const mockUseParams = jest.fn();

jest.mock('react-router-dom', () => ({

    ...jest.requireActual('react-router-dom') as any,

    useParams: jest.fn(),

}));

const mockPost = {

    id: 5,

    title: "titlechupipandi",

    body: "bodychupipandi"

};



describe('PostComponent', () => {

    describe('When id exist', () => {

        test("Should render only a title Post id and loading", async () => {
            (useParams as jest.Mock).mockReturnValue({ id: 5 });



            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => render(<BrowserRouter><Post /></BrowserRouter>) as any);

            expect(screen.getByText(`Post 5`)).toBeInTheDocument();
            expect(screen.getByText("Loading...")).toBeInTheDocument();


        });

        test("should render post title and post body after getPostById", async () => {

            (getPostById as jest.Mock).mockImplementation(() => {

                return Promise.resolve(mockPost);

            });

            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {

                render(

                    <BrowserRouter><Post /></BrowserRouter>); return

            })

            expect(screen.getByText("titlechupipandi")).toBeInTheDocument();

            expect(screen.getByText("bodychupipandi")).toBeInTheDocument();

        });

    });

    describe("When Link exist", () => {

        test("Should be rendered with text Back to home", async () => {
            await act(async () => render(<BrowserRouter><Post /></BrowserRouter>) as any);

            expect(screen.getByText("Back to Home")).toBeInTheDocument();
        });

        test("Can be clicked", async () => {
            await act(async () => render(<BrowserRouter><Post /></BrowserRouter>) as any);

            const backToHomeLink = screen.getByText('Back to Home') as HTMLLinkElement;
            userEvent.click(backToHomeLink);

            expect(backToHomeLink.href.includes('/post')).toBeTruthy();
        });


    });

    describe("When id doesn't exist", () => {
        test("Should render only a title Post and loading", async () => {
            (useParams as jest.Mock).mockReturnValue({ id: "" });

            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => render(<BrowserRouter><Post /></BrowserRouter>) as any);

            expect(screen.getByText(`Post`)).toBeInTheDocument();
            expect(screen.getByText("Loading...")).toBeInTheDocument();
        });


    });

})