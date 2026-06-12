import { defineCollection, z } from "astro:content";

// Writing categories — keep this list as the single source of truth.
// The slug is what appears in the URL (?category=personal); the label is what's shown.
export const WRITING_CATEGORIES = [
	{ slug: "personal", label: "Personal" },
	{ slug: "growing-up", label: "Growing Up" },
	{ slug: "learning-at-work", label: "Learning at Work" },
] as const;

export type WritingCategorySlug = (typeof WRITING_CATEGORIES)[number]["slug"];

const writingCategorySlugs = WRITING_CATEGORIES.map((c) => c.slug) as [
	WritingCategorySlug,
	...WritingCategorySlug[],
];

const writing = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.enum(writingCategorySlugs),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		readingTime: z.number().optional(),
	}),
});

const thought = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.string(),
		showTldr: z.boolean().optional(),
		// Link to the matching LinkedIn post. When present, the thought page
		// renders a CTA inviting the reader to comment over on LinkedIn.
		linkedinLink: z.string().url().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		readingTime: z.number().optional(),
	}),
});

const work = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.string().optional(),
		showTldr: z.boolean().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		readingTime: z.number().optional(),
	}),
});

const log = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		log_count: z.number(),
		category: z.string(),
		// If set, this log entry replaces the auto-generated "published X" entry
		// for the matching writing post. Use the writing post's slug.
		writingSlug: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		readingTime: z.number().optional(),
	}),
});

export const collections = { writing, thought, work, log };
