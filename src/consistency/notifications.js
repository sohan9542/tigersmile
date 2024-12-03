export const notifications = [
    {
      id: 1,
      title: "New Assignment Available",
      message: "A new assignment has been added to your math course.",
      type: "info",
      date: new Date(2024, 10, 30, 14, 30), // Date and time of the notification
      isRead: false, // Whether the notification has been read
    },
    {
      id: 2,
      title: "Assignment Deadline Approaching",
      message: "Your biology assignment is due tomorrow at 11:59 PM.",
      type: "warning",
      date: new Date(2024, 10, 29, 10, 0),
      isRead: false,
    },
    {
      id: 3,
      title: "Course Update",
      message: "The schedule for your English course has been updated.",
      type: "info",
      date: new Date(2024, 10, 28, 16, 45),
      isRead: true,
    },
    {
      id: 4,
      title: "Meeting Reminder",
      message: "You have a meeting scheduled with your advisor tomorrow at 3 PM.",
      type: "reminder",
      date: new Date(2024, 10, 29, 15, 0),
      isRead: false,
    },
    {
      id: 5,
      title: "System Maintenance",
      message: "The system will undergo maintenance on Sunday from 12 AM to 4 AM.",
      type: "alert",
      date: new Date(2024, 10, 30, 20, 0),
      isRead: true,
    },
  ];
  