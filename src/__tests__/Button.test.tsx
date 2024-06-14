import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../Button";
import { theme } from "../stylesheet";
import TestWrapper from "./TestWrapper";

describe("Button Component", () => {
	test("renders Button component", () => {
		const { getByText } = render(<Button>Click me</Button>);
		expect(getByText("Click me")).toBeInTheDocument();
	});

	test("renders loading state", () => {
		const { getByRole } = render(<Button loading>Click me</Button>);
		expect(getByRole("progressbar")).toBeInTheDocument();
	});

	test("renders success state", () => {
		const successColor = theme.palette.success.main;
		const { getByText } = render(
			<TestWrapper>
				<Button isSuccess>Click me</Button>
			</TestWrapper>
		);

		expect(getByText("Click me")).toHaveStyle({
			background: successColor
		});
	});

	test("renders disabled state", () => {
		const { getByText } = render(<Button disabled>Click me</Button>);
		expect(getByText("Click me")).toHaveAttribute("disabled");
	});

	test("fires onClick event", () => {
		const onClickMock = jest.fn();
		const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);

		fireEvent.click(getByText("Click me"));
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});
});
