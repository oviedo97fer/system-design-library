import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import IconCard from "../IconCard";
import TestWrapper from "./TestWrapper";
import { theme } from "../stylesheet";
describe("IconCard component", () => {
	it("renders without crashing", () => {
		render(
			<TestWrapper>
				<IconCard />
			</TestWrapper>
		);
	});

	it("renders title correctly", () => {
		const { getByText } = render(
			<TestWrapper>
				<IconCard title="Example Title" />
			</TestWrapper>
		);
		expect(getByText("Example Title")).toBeInTheDocument();
	});

	it("renders description correctly", () => {
		const { getByText } = render(
			<TestWrapper>
				<IconCard description="Example Description" />
			</TestWrapper>
		);
		expect(getByText("Example Description")).toBeInTheDocument();
	});

	it("renders icon correctly", () => {
		const icon = <div className="icon">Icon</div>;
		const { container } = render(
			<TestWrapper>
				<IconCard icon={icon} />
			</TestWrapper>
		);
		expect(container.querySelector(".cardIcon")).toContainHTML('<div class="icon">Icon</div>');
	});

	it("applies selected styles when selected prop is true", () => {
		const { container } = render(
			<TestWrapper>
				<IconCard selected />
			</TestWrapper>
		);
		const card = container.firstChild;
		expect(card).toHaveStyle(`border: 1px solid ${theme.palette.primary.main}`);
		expect(card).toHaveStyle(`box-shadow: 0px 0px 5px 1px ${theme.palette.primary.main}`);
		expect(card).toHaveClass("Mui-selected");
	});

	it("applies default styles when selected prop is false", () => {
		const { container } = render(
			<TestWrapper>
				<IconCard />
			</TestWrapper>
		);
		const card = container.firstChild;
		expect(card).toHaveStyle(`border: 1px solid ${theme.palette.text.disabled}`);
		expect(card).not.toHaveStyle(`box-shadow: 0px 0px 5px 1px ${theme.palette.primary.main}`);
		expect(card).not.toHaveClass("Mui-selected");
	});
});
