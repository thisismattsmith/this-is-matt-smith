export const SITE_TITLE = "Matt Smith | Independent Consultant";
export const SITE_DESCRIPTION =
	"Independent L&D consultant Matt Smith on learning, work, AI and growing up. Essays, thoughts and consulting services.";

interface MenuItem {
	label: string;
	url: string;
}

export const menuItems: MenuItem[] = [
	{ label: "matt", url: "/" },
	{ label: "writing", url: "/writing" },
	{ label: "thoughts", url: "/thoughts" },
	{ label: "work", url: "/work" },
	{ label: "log", url: "/log" },
];

// Other places where I publish writing. Linked from the bottom of /writing.
export const writingElsewhere = [
	{
		name: "matt smith, unscheduled",
		description: "Get emails from me about work, learning and growing up.",
		url: "https://mattsmith.substack.com",
	},
	{
		name: "The Future of L&D",
		description:
			"Looking at the past and present of organisational L&D to explore the future of it.",
		url: "https://futureoflearninganddevelopment.com",
	},
	{
		name: "Field Notes • Strategic L&D",
		description:
			"Taking L&D strategy away from the abstract and aspirational, into the practical and achieveable.",
		url: "https://strategy.thisismattsmith.com/blog/",
	},
];

export const socialLinks = [
	{ label: "x", url: "https://x.com/__mattsmith__" },
	{ label: "email", url: "mailto:hello@thisismattsmith.com" },
	{ label: "github", url: "https://github.com/thisismattsmith" },
	{ label: "reddit", url: "https://www.reddit.com/user/_mattsmith" },
	{ label: "bluesky", url: "https://bsky.app/profile/thisismattsmith.com" },
	{ label: "linkedin", url: "https://www.linkedin.com/in/thisismattsmith" },
];
