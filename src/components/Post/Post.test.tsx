import React from "react";

import { act, render, screen, waitFor } from "@testing-library/react";

import { getPostById } from '../../services/postService';

import { SearchPost } from "./SearchPost";

import { BrowserRouter } from "react-router-dom";

import userEvent from "@testing-library/user-event";

import { Post } from "./Post";



afterEach(() => {

    (getPostById as jest.Mock).mockReset();

});



jest.mock("../../services/postService", () => ({

    getPostById: jest.fn()

}));



const mockUseParams = jest.fn();

jest.mock('react-router-dom', () => ({

    ...jest.requireActual('react-router-dom') as any,

    useParams: () => mockUseParams,

}));



const mockPost = {

    id: 5,

    title: "titlechupipandi",

    body: "bodychupipandi"

}



describe('PostComponent', () => {

    describe('When render', () => {

        test("Should render a title Post", async () => {



            // eslint-disable-next-line testing-library/no-unnecessary-act

            await act(async () => {

                render(

                    <BrowserRouter><Post /></BrowserRouter>); return

            })

            expect(screen.getByText("Post")).toBeInTheDocument();

        })

        test("it should render post title and post body", async () => {

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

        })

    })

})