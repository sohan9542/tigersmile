import { describe, expect, it } from "vitest";
import {
  calculateTimeGap,
  createId,
  formatToLocalTime,
  getCurrentWeekActivities,
  getGreeting,
  getTodayData,
  getUpComingData,
  wasCompletedOnTime,
} from "./index.js";

describe("getTodayData", () => {
  it("returns only activities that start today", () => {
    const now = new Date("2024-06-15T12:00:00");
    const data = [
      { start: "2024-06-15T08:00:00", title: "today" },
      { start: "2024-06-14T08:00:00", title: "yesterday" },
    ];

    expect(getTodayData(data, now).map((item) => item.title)).toEqual([
      "today",
    ]);
  });

  it("returns an empty array for non-array input", () => {
    expect(getTodayData(null)).toEqual([]);
  });
});

describe("getUpComingData", () => {
  it("filters by upcoming status", () => {
    const data = [
      { status: "upcoming", title: "a" },
      { status: "completed", title: "b" },
    ];
    expect(getUpComingData(data)).toEqual([{ status: "upcoming", title: "a" }]);
  });
});

describe("getCurrentWeekActivities", () => {
  it("includes activities within the Sunday-Saturday week", () => {
    const now = new Date("2024-06-12T12:00:00"); // Wednesday
    const data = [
      { start: "2024-06-09T10:00:00", title: "sunday" },
      { start: "2024-06-15T10:00:00", title: "saturday" },
      { start: "2024-06-16T10:00:00", title: "next-sunday" },
    ];

    expect(
      getCurrentWeekActivities(data, now).map((item) => item.title)
    ).toEqual(["sunday", "saturday"]);
  });
});

describe("calculateTimeGap", () => {
  it("formats a multi-unit duration", () => {
    const start = "2024-01-01T00:00:00Z";
    const end = "2024-01-02T01:02:03Z";
    expect(calculateTimeGap(start, end)).toBe(
      "1 day, 1 hour, 2 minutes, 3 seconds"
    );
  });

  it("throws for invalid dates", () => {
    expect(() => calculateTimeGap("not-a-date", "2024-01-01")).toThrow(
      /Invalid date format/
    );
  });
});

describe("createId", () => {
  it("returns a non-empty string", () => {
    expect(typeof createId()).toBe("string");
    expect(createId().length).toBeGreaterThan(0);
  });
});

describe("formatToLocalTime", () => {
  it("returns an empty string for invalid values", () => {
    expect(formatToLocalTime("nope")).toBe("");
  });
});

describe("wasCompletedOnTime", () => {
  it("returns true when completion is on or before the deadline", () => {
    expect(
      wasCompletedOnTime("2024-01-02T12:00:00Z", "2024-01-02T11:00:00Z")
    ).toBe(true);
  });

  it("returns false when completion is after the deadline", () => {
    expect(
      wasCompletedOnTime("2024-01-02T12:00:00Z", "2024-01-02T13:00:00Z")
    ).toBe(false);
  });
});

describe("getGreeting", () => {
  it("returns a morning greeting", () => {
    expect(getGreeting("Alex", new Date("2024-01-01T08:00:00"))).toBe(
      "Good Morning, Alex!"
    );
  });

  it("returns an afternoon greeting", () => {
    expect(getGreeting("Alex", new Date("2024-01-01T14:00:00"))).toBe(
      "Good Afternoon, Alex!"
    );
  });

  it("returns an evening greeting", () => {
    expect(getGreeting("Alex", new Date("2024-01-01T20:00:00"))).toBe(
      "Good Evening, Alex!"
    );
  });
});
