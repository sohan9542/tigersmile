import { randomId } from "@mui/x-data-grid-generator";

import { startOfWeek, addDays } from "date-fns";

const today = new Date();
const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // Week starts on Sunday

export const mockActivityData = [
  {
    id: randomId(),
    title: "Venderbilit Prompt Engineering Course",
    start: addDays(weekStart, 1), // Monday
    end: addDays(weekStart, 1),
    status: 'not completed',
    subject: 'math'
  },
  {
    id: randomId(),
    title: "Omni Dental (see notes)",
    start: addDays(weekStart, 2), // Tuesday
    end: addDays(weekStart, 4),
    status: 'not completed',
    subject: 'biology'
  },
  {
    id: randomId(),
    title: "SAS Summer 2024 intern information Session",
    start: addDays(weekStart, 3), // Wednesday
    end: addDays(weekStart, 5),
    status: 'not completed',
    subject: 'english'
  },
  {
    id: randomId(),
    title: "Inferrar Tech Engineering Course",
    start: addDays(weekStart, 4), // Thursday
    end: addDays(weekStart, 6),
    status: 'not completed',
    subject: 'math'
  },
  {
    id: randomId(),
    title: "Hinda Medition All notes",
    start: addDays(weekStart, 5), // Friday
    end: addDays(weekStart, 7),
    status: 'not completed',
    subject: 'english'
  },
  {
    id: randomId(),
    title: "Japanise All notes",
    start: addDays(weekStart, 6), // Saturday
    end: addDays(weekStart, 8),
    status: 'not completed',
    subject: 'bilogy'
  },
  {
    id: randomId(),
    title: "MAF Winter 2024",
    start: addDays(weekStart, 0), // Sunday
    end: addDays(weekStart, 2),
    status: 'upcoming',
    subject: 'math'
  },
  {
    id: randomId(),
    title: "MAF COLD 2024",
    start: addDays(weekStart, 2), // Tuesday
    end: addDays(weekStart, 4),
    status: 'upcoming',
    subject: 'biology'
  },
];
