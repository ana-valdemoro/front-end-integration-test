import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

const onClick = jest.fn(() => true)

describe('UI test for Button', () => {
    it('Should render Button', () => {
        render(<Button onClick={onClick} text="::Button::" />);
        const button = screen.getByText("::Button::");
        expect(button).toBeInTheDocument(); expect(button).not.toBeNull();
    });

    it("Should trigger handleClick Event", async () => {
        render(<Button onClick={onClick} text="::Button::"/>);
        const button = screen.getByText("::Button::");
        fireEvent.click(button);
        expect(onClick).toBeCalledTimes(1);
    });
})