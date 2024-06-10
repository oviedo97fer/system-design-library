import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateTimePicker from "../DateTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

describe("DateTimePicker", () => {
	const renderComponent = (props = {}) => {
		const defaultProps = {
			label: "Date Time",
			name: "dateTime",
			value: "",
			onChange: jest.fn(),
			...props,
		};

		return render(<DateTimePicker {...defaultProps} />);
	};

	test("renders DateTimePicker with default props", () => {
		renderComponent();

		const input = screen.getByLabelText(/date time/i);
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("name", "dateTime");
	});

	test("disables the input when disabled prop is true", () => {
		renderComponent({ disabled: true });

		const input = screen.getByLabelText(/date time/i);
		expect(input).toBeDisabled();
	});

	test("calls onChange with correct value on date change", () => {
		const handleChange = jest.fn();
		renderComponent({ onChange: handleChange });

		const input = screen.getByLabelText(/date time/i);
		fireEvent.change(input, { target: { value: "2023-05-01T12:00:00Z" } });

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith("dateTime", "05/01/2023 12:00:00 PM");
	});

	test("formats date correctly based on withoutFormat prop", () => {
		const handleChange = jest.fn();
		renderComponent({ onChange: handleChange, withoutFormat: true });

		const input = screen.getByLabelText(/date time/i);
		fireEvent.change(input, { target: { value: "2023-05-01T12:00:00Z" } });

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith("dateTime", "2023-05-01T12:00:00.000Z");
	});

	test("renders input with correct variant", () => {
		renderComponent({ variant: "outlined" });

		const input = screen.getByLabelText(/date time/i);
		expect(input).toHaveClass("MuiOutlinedInput-root");
	});
});
