import { getCollection } from "astro:content";

export type Log = {
  data: {
    title: string;
    description: string;
    category: string;
    log_count: number;
    pubDate: Date;
    updatedDate: Date;
  };
  slug: string;
};

// merge class names with conditional rendering
export function clsx(...args: any[]): string {
  return args.filter(Boolean).join(" ");
}

// Subtle accent colours for thought categories (left-border + pill).
// Kept restrained to match the site's overall minimal feel.
export function getCategoryAccent(category: string): {
  border: string;
  text: string;
  bg: string;
} {
  switch (category) {
    case "ai":
      return {
        border: "border-l-yellow-400",
        text: "text-yellow-700 dark:text-yellow-400",
        bg: "bg-yellow-50 dark:bg-yellow-950/40",
      };
    case "design":
      return {
        border: "border-l-lime-400",
        text: "text-lime-700 dark:text-lime-400",
        bg: "bg-lime-50 dark:bg-lime-950/40",
      };
    case "product":
      return {
        border: "border-l-green-400",
        text: "text-green-700 dark:text-green-400",
        bg: "bg-green-50 dark:bg-green-950/40",
      };
    case "consulting":
      return {
        border: "border-l-purple-400",
        text: "text-purple-700 dark:text-purple-400",
        bg: "bg-purple-50 dark:bg-purple-950/40",
      };
    case "productivity":
      return {
        border: "border-l-pink-400",
        text: "text-pink-700 dark:text-pink-400",
        bg: "bg-pink-50 dark:bg-pink-950/40",
      };
    case "learning":
      return {
        border: "border-l-blue-400",
        text: "text-blue-700 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-950/40",
      };
    case "self-employment":
      return {
        border: "border-l-orange-400",
        text: "text-orange-700 dark:text-orange-400",
        bg: "bg-orange-50 dark:bg-orange-950/40",
      };
    case "thoughts":
      return {
        border: "border-l-red-400",
        text: "text-red-700 dark:text-red-400",
        bg: "bg-red-50 dark:bg-red-950/40",
      };
    case "tools":
      return {
        border: "border-l-cyan-400",
        text: "text-cyan-700 dark:text-cyan-400",
        bg: "bg-cyan-50 dark:bg-cyan-950/40",
      };
    case "work":
    case "working":
      return {
        border: "border-l-teal-400",
        text: "text-teal-700 dark:text-teal-400",
        bg: "bg-teal-50 dark:bg-teal-950/40",
      };
    default:
      return {
        border: "border-l-gray-400",
        text: "text-gray-700 dark:text-gray-400",
        bg: "bg-gray-50 dark:bg-gray-900/40",
      };
  }
}

// Kept for any code still importing it; delegates to the new accent system.
export function getCategoryColor(category: string): string {
  return getCategoryAccent(category).bg;
}

// Utility function to format year and month
export function formatYearMonth(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${month.toString().padStart(2, "0")}`;
}

// Utility function to group log by year and month
export async function groupLogByYearMonthSorted(): Promise<
  Record<string, Log[]>
> {
  const log = await getCollection("log");

  const groupedLog = log.reduce<Record<string, Log[]>>(
    (accumulator, log) => {
      const yearMonthKey = formatYearMonth(log.data.pubDate);
      accumulator[yearMonthKey] = accumulator[yearMonthKey] || [];
      accumulator[yearMonthKey].push(log as Log);
      return accumulator;
    },
    {},
  );

  const sortedYearMonthKeys = Object.keys(groupedLog).sort((a, b) =>
    b.localeCompare(a),
  );

  const sortedGroupedLog = sortedYearMonthKeys.reduce<Record<string, Log[]>>(
    (sortedAccumulator, key) => {
      sortedAccumulator[key] = groupedLog[key];
      return sortedAccumulator;
    },
    {},
  );

  return sortedGroupedLog;
}

// Build a continuous month-by-month series from the earliest log month
// up to the current month, filling gaps with empty arrays. Used to draw
// the GitHub-style intensity chart without "missing" months breaking
// the visual rhythm.
export async function getLogMonthSeries(): Promise<
  Array<{ key: string; year: number; month: number; logs: Log[] }>
> {
  const logs = await getCombinedLog();

  // Group by year-month
  const grouped = logs.reduce<Record<string, Log[]>>((acc, log) => {
    const key = formatYearMonth(log.data.pubDate);
    acc[key] = acc[key] || [];
    acc[key].push(log);
    return acc;
  }, {});

  const allKeys = Object.keys(grouped);
  if (allKeys.length === 0) return [];

  // Earliest month → build a continuous range up to now.
  const sortedAsc = allKeys.sort();
  const [eYear, eMonth] = sortedAsc[0].split("-").map(Number);

  const now = new Date();
  const series: Array<{ key: string; year: number; month: number; logs: Log[] }> = [];

  let y = now.getFullYear();
  let m = now.getMonth() + 1;
  while (y > eYear || (y === eYear && m >= eMonth)) {
    const key = `${y}-${m.toString().padStart(2, "0")}`;
    // Sort each month's entries newest-first so within-month order is sensible.
    const monthLogs = (grouped[key] ?? []).slice().sort(
      (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    );
    series.push({ key, year: y, month: m, logs: monthLogs });
    m -= 1;
    if (m === 0) {
      m = 12;
      y -= 1;
    }
  }
  return series;
}

// Combines explicit log entries with auto-generated ones derived from writing
// posts. If a real log entry has a frontmatter `writingSlug` that matches a
// writing post, that real entry takes precedence — so you can write a custom
// log message about a post and it will replace the auto one.
async function getCombinedLog(): Promise<Log[]> {
  const [logs, writing] = await Promise.all([
    getCollection("log"),
    getCollection("writing"),
  ]);

  const overriddenSlugs = new Set(
    logs
      .map((l) => (l.data as { writingSlug?: string }).writingSlug)
      .filter((s): s is string => Boolean(s)),
  );

  const auto: Log[] = writing
    .filter((post) => !overriddenSlugs.has(post.slug))
    .map((post) => ({
      data: {
        title: `published "${post.data.title}"`,
        description: post.data.description,
        category: "writing",
        log_count: 1,
        pubDate: post.data.pubDate,
        updatedDate: post.data.updatedDate ?? post.data.pubDate,
      },
      // Auto-log entries link directly to the writing post itself — there's
      // no standalone log page for them. The chart's <a> uses this slug
      // path, so we prefix it to distinguish from real log slugs.
      slug: `__writing/${post.slug}`,
    }));

  return [...(logs as unknown as Log[]), ...auto];
}

// Map an entry count to an intensity bucket 0–4 (GitHub-style).
// Tuned for personal-site cadence: a few entries a month is "active".
export function intensityBucket(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

export function getBackgroundColorClass(bg_colour: string): string {
  switch (bg_colour) {
    case "yellow":
      return "bg-yellow-400";
    case "red":
      return "bg-red-400";
    case "orange":
      return "bg-orange-400";
    case "pink":
      return "bg-pink-400";
    case "indigo":
      return "bg-indigo-400";
    case "teal":
      return "bg-teal-400";
    case "cyan":
      return "bg-cyan-400";
    case "lime":
      return "bg-lime-400";
    case "blue":
      return "bg-blue-400";
    case "green":
      return "bg-green-400";
    case "purple":
      return "bg-purple-400";
    case "gray":
      return "bg-gray-400";
    case "amber":
      return "bg-amber-300";
    default:
      return "bg-gray-100";
  }
}

export function getReadingTime(text: string | undefined | null) {
  if (!text) return 1;
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return 1;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}
