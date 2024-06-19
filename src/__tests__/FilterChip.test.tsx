import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterChip from "../FilterChip";
import { Filter } from "../FilterChip";
import "@testing-library/jest-dom";
import TestWrapper from "./TestWrapper";

describe("FilterChip", () => {
	const filter: Filter = {
		id: "1",
		name: "Filter Name",
		operation: "=",
		value: "Value",
		isActive: true
	};

	const handleDelete = jest.fn();
	const handleClick = jest.fn();
	const handleCheckbox = jest.fn();

	it("renders the component with the correct elements", () => {
		render(
			<TestWrapper>
				<FilterChip
					filter={filter}
					handleDelete={handleDelete}
					handleClick={handleClick}
					handleCheckbox={handleCheckbox}
				/>
			</TestWrapper>
		);

		expect(screen.getByText("Filter Name")).toBeInTheDocument();
		expect(screen.getByText("=")).toBeInTheDocument();
		expect(screen.getByText("Value")).toBeInTheDocument();
		expect(screen.getByRole("checkbox")).toBeInTheDocument();
	});

	it("calls handleCheckbox when checkbox is clicked", () => {
		render(
			<TestWrapper>
				<FilterChip
					filter={filter}
					handleDelete={handleDelete}
					handleClick={handleClick}
					handleCheckbox={handleCheckbox}
				/>
			</TestWrapper>
		);

		fireEvent.click(screen.getByRole("checkbox"));
		expect(handleCheckbox).toHaveBeenCalledWith("1");
	});

	it("does not render the checkbox if showCheckBox is false", () => {
		render(
			<TestWrapper>
				<FilterChip
					filter={filter}
					handleDelete={handleDelete}
					handleClick={handleClick}
					handleCheckbox={handleCheckbox}
					showCheckBox={false}
				/>
			</TestWrapper>
		);

		expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
	});

	it("does not render the delete button if showDelete is false", () => {
		render(
			<TestWrapper>
				<FilterChip
					filter={filter}
					handleDelete={handleDelete}
					handleClick={handleClick}
					handleCheckbox={handleCheckbox}
					showDelete={false}
				/>
			</TestWrapper>
		);

		expect(screen.queryByRole("button", { name: /delete/i })).not.toBeInTheDocument();
	});

	it("does not render the icon button if isEditable is false", () => {
		render(
			<FilterChip
				filter={filter}
				handleDelete={handleDelete}
				handleClick={handleClick}
				handleCheckbox={handleCheckbox}
				isEditable={false}
			/>
		);

		expect(screen.queryByRole("button", { name: /expand/i })).not.toBeInTheDocument();
	});
});
