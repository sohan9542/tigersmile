import { randomId } from "@mui/x-data-grid-generator";

import { startOfWeek, addDays, addHours } from "date-fns";

const today = new Date();
const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // Week starts on Sunday

export const mockActivityData = [
  {
    id: randomId(),
    title: "Venderbilit Prompt Engineering Course",
    start: addHours(weekStart, 1), // Monday, starts at hour 1
    end: addHours(weekStart, 3), // Ends at hour 3
    status: "not completed",
    subject: "math",
  },
  {
    id: randomId(),
    title: "Omni Dental (see notes)",
    start: addHours(weekStart, 4), // Monday, starts at hour 4
    end: addHours(weekStart, 6), // Ends at hour 6
    status: "not completed",
    subject: "biology",
  },
  {
    id: randomId(),
    title: "SAS Summer 2024 intern information Session",
    start: addHours(weekStart, 7), // Monday, starts at hour 7
    end: addHours(weekStart, 9), // Ends at hour 9
    status: "not completed",
    subject: "english",
  },
  {
    id: randomId(),
    title: "Inferrar Tech Engineering Course",
    start: addHours(weekStart, 10), // Monday, starts at hour 10
    end: addHours(weekStart, 12), // Ends at hour 12
    status: "not completed",
    subject: "math",
  },
  {
    id: randomId(),
    title: "Hinda Medition All notes",
    start: addHours(weekStart, 13), // Monday, starts at hour 13
    end: addHours(weekStart, 15), // Ends at hour 15
    status: "not completed",
    subject: "english",
  },
  {
    id: randomId(),
    title: "Japanise All notes",
    start: addHours(weekStart, 16), // Monday, starts at hour 16
    end: addHours(weekStart, 18), // Ends at hour 18
    status: "not completed",
    subject: "biology",
  },
  {
    id: randomId(),
    title: "MAF Winter 2024",
    start: addHours(weekStart, 19), // Monday, starts at hour 19
    end: addHours(weekStart, 21), // Ends at hour 21
    status: "upcoming",
    subject: "math",
  },
  {
    id: randomId(),
    title: "MAF COLD 2024",
    start: addHours(weekStart, 22), // Monday, starts at hour 22
    end: addHours(weekStart, 24), // Ends at hour 24
    status: "upcoming",
    subject: "biology",
  },
];
