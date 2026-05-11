export const SITE_TITLE = "Matt Smith | Independent Consultant";
export const SITE_DESCRIPTION = "Matt Smith's home on the internet.";

export interface MenuItem {
	label: string;
	url: string;
}

export const menuItems: MenuItem[] = [
	{
		label: "matt",
		url: "/",
	},
	{
		label: "writing",
		url: "/writing",
	},
	{
		label: "thoughts",
		url: "/thoughts",
	},
	{
		label: "work",
		url: "/work",
	},
	{
		label: "log",
		url: "/log",
	},
];

export const title = "Matt Smith | Independent Consultant";
export const description = "Matt Smith's home on the internet.";
export const image = "/images/ogimage.png";
export const url = "https://thisismattsmith.com";

export const ogImage = {
	src: "/images/ogimage.png",
	alt: "The website of Matt Smith - thisismattsmith.com",
};


export const products = [
	{
		name: "the learning dept",
		url: "https://fli.so",
		image: "/products/fli.png",
	},
	{
		name: "analog",
		url: "https://uiino.com",
		image: "/products/uiino.png",
	},
	{
		name: "thinker",
		url: "https://sticai.com",
		image: "/products/sticai.png",
	},
	{
		name: "the elearning company",
		url: "https://dunsuite.com",
		image: "/products/dun.png",
	},
	{
		name: "DunTasks",
		url: "https://duntasks.com",
		image: "/products/duntasks.png",
	},
];

export const socialLinks = [
	{
		label: "x",
		url: "https://x.com/__mattsmith__",
	},
	{
		label: "email",
		url: "mailto:hello@thisismattsmith.com",
	},
	{
		label: "github",
		url: "https://github.com/thisismattsmith",
	},
	{
		label: "reddit",
		url: "https://www.reddit.com/user/_mattsmith",
	},
	{
		label: "bluesky",
		url: "https://bsky.app/profile/thisismattsmith.com",
	},
	{
		label: "linkedin",
		url: "https://www.linkedin.com/in/thisismattsmith",
	},
];
