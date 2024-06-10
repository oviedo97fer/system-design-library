import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MarkdownRender from "../MarkdownRender";

describe("MarkdownRender component", () => {
	test("renders text correctly", () => {
		const text = "test";
		const { getByText } = render(<MarkdownRender text={text} />);
		expect(getByText(text)).toBeInTheDocument();
	});

	test("calls onCloseModal function when close button is clicked", () => {
		const onCloseModal = jest.fn();
		const { getByText } = render(<MarkdownRender text="text" onCloseModal={onCloseModal} />);
		const closeButton = getByText("Close");
		fireEvent.click(closeButton);
		expect(onCloseModal).toHaveBeenCalledTimes(1);
	});

	test("calls onConfirmModal function when confirm button is clicked", () => {
		const onConfirmModal = jest.fn();
		const { getByText } = render(<MarkdownRender text="text" onConfirmModal={onConfirmModal} />);
		const confirmButton = getByText("Confirm");
		fireEvent.click(confirmButton);
		expect(onConfirmModal).toHaveBeenCalledTimes(1);
	});

	test("toggles checkbox when clicked", () => {
		const handleRadioChange = jest.fn();
		const { getByLabelText } = render(
			<MarkdownRender text="Some text" handleRadioChange={handleRadioChange} checkboxChecked={false} />
		);
		const checkbox = getByLabelText("Checkbox");
		fireEvent.click(checkbox);
		expect(handleRadioChange).toHaveBeenCalledTimes(1);
	});
});
