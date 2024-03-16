import { Component } from "react";

export type SectionType = "Image" | "Text" | "Custom";
export interface HomeSection {
	content: Component;
	type: SectionType;
	caption: String;
}
