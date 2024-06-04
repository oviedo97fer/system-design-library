import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Typography from "../Typography";
import TestWrapper from "./TestWrapper";

describe("Typography component", () => {
	it("render text", () => {
		const { getByText } = render(
			<TestWrapper>
				<Typography>Texto de prueba</Typography>
			</TestWrapper>
		);
		expect(getByText("Texto de prueba")).toBeInTheDocument();
	});

	it("render text with start icon", () => {
		const { getByTestId } = render(
			<TestWrapper>
				<Typography icon={<div data-testid="icon" />} iconPosition="start">
					Test
				</Typography>
			</TestWrapper>
		);
		const icon = getByTestId("icon");
		expect(icon.parentNode?.firstChild).toBe(icon);
	});

	it("render text with end icon", () => {
		const { getByTestId } = render(
			<TestWrapper>
				<Typography icon={<div data-testid="icon" />} iconPosition="end">
					Texto de prueba
				</Typography>
			</TestWrapper>
		);
		const icon = getByTestId("icon");
		expect(icon.parentNode?.lastChild).toBe(icon);
	});
});
