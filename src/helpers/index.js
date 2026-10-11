import { endOfWeek, isWithinInterval, startOfWeek } from "date-fns";

/**
 * @typedef {{ start: Date|string|number, status?: string }} ActivityLike
 */

/**
 * Returns activities whose start date falls on the local calendar day of "now".
 * @param {ActivityLike[]} data
 * @param {Date} [now=new Date()]
 * @returns {ActivityLike[]}
 */
export const getTodayData = (data, now = new Date()) => {
  if (!Array.isArray(data)) return [];

  return data.filter((event) => {
    const eventDate = new Date(event.start);
    if (Number.isNaN(eventDate.getTime())) return false;

    return (
      eventDate.getDate() === now.getDate() &&
      eventDate.getMonth() === now.getMonth() &&
      eventDate.getFullYear() === now.getFullYear()
    );
  });
};

/**
 * Returns activities marked as upcoming.
 * @param {ActivityLike[]} data
 * @returns {ActivityLike[]}
 */
export const getUpComingData = (data) => {
  if (!Array.isArray(data)) return [];
  return data.filter((event) => event.status === "upcoming");
};

/**
 * Returns activities whose start falls within the current week (Sunday–Saturday).
 * @param {ActivityLike[]} data
 * @param {Date} [now=new Date()]
 * @returns {ActivityLike[]}
 */
export const getCurrentWeekActivities = (data, now = new Date()) => {
  if (!Array.isArray(data)) return [];

  const weekStart = startOfWeek(now, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 0 });

  return data.filter((event) => {
    const start = new Date(event.start);
    if (Number.isNaN(start.getTime())) return false;
    return isWithinInterval(start, { start: weekStart, end: weekEnd });
  });
};

/**
 * Formats the absolute duration between two dates as a human-readable string.
 * @param {Date|string|number} startDate
 * @param {Date|string|number} endDate
 * @returns {string}
 */
export const calculateTimeGap = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error("Invalid date format. Please provide valid dates.");
  }

  const diffMs = Math.abs(end - start);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const parts = [];
  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (seconds) parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);

  return parts.length > 0 ? parts.join(", ") : "0 seconds";
};

/**
 * Creates a unique string id for client-side rows and mock entities.
 * @returns {string}
 */
export const createId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

/**
 * Formats an ISO/date value for display in en-US locale.
 * @param {Date|string|number} value
 * @returns {string}
 */
export const formatToLocalTime = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

/**
 * Returns true when completion happened on or before the deadline.
 * @param {Date|string|number} deadline
 * @param {Date|string|number} completeDate
 * @returns {boolean}
 */
export const wasCompletedOnTime = (deadline, completeDate) => {
  const deadlineDate = new Date(deadline);
  const completeDateObj = new Date(completeDate);

  if (
    Number.isNaN(deadlineDate.getTime()) ||
    Number.isNaN(completeDateObj.getTime())
  ) {
    return false;
  }

  return deadlineDate >= completeDateObj;
};

/**
 * Time-of-day greeting used on the home dashboard.
 * @param {string} [name=""]
 * @param {Date} [now=new Date()]
 * @returns {string}
 */
export const getGreeting = (name = "", now = new Date()) => {
  const currentHour = now.getHours();
  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return `${greeting}, ${name}!`;
};
