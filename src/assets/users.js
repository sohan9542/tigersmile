import { randomId } from "@mui/x-data-grid-generator";

export const users = [
  {
    id: randomId(),
    role: "manager",
    name: "Abrahamn Linkon",
    email: "manager@gmail.com",
    password: "manager123",
    permissions: {
      canCreateEvent: true,
      canModifyEvent: true,
      canDeleteEvent: true,
      canViewEvent: true,
      canAssignRoles: true,
      canSendReciveMessage: true,
    },
  },
  {
    id: randomId(),
    role: "admin",
    name: "Phil phoden",
    email: "admin@gmail.com",
    password: "admin123",
    permissions: {
      canCreateEvent: true,
      canModifyEvent: true,
      canDeleteEvent: true,
      canViewEvent: true,
      canAssignRoles: false,
      canSendReciveMessage: true,
    },
  },
  {
    id: randomId(),
    role: "observer",
    name: "Kevin DeBruina",
    email: "observer@gmail.com",
    password: "observer123",
    permissions: {
      canCreateEvent: false,
      canModifyEvent: false,
      canDeleteEvent: false,
      canViewEvent: true,
      canAssignRoles: false,
      canSendReciveMessage: true,
    },
  },
  {
    id: randomId(),
    role: "viewer",
    name: "Leonel Messi",
    email: "viewer@gmail.com",
    password: "viewer123",
    permissions: {
      canCreateEvent: false,
      canModifyEvent: false,
      canDeleteEvent: false,
      canViewEvent: true,
      canAssignRoles: false,
      canSendReciveMessage: false,
    },
  },
  {
    id: randomId(),
    role: "support",
    name: "Cristino Ronaldo",
    email: "support@gmail.com",
    password: "support123",
    permissions: {
      canCreateEvent: false,
      canModifyEvent: false,
      canDeleteEvent: false,
      canViewEvent: true,
      canAssignRoles: false,
      canSendReciveMessage: "limited",
    },
  },
  {
    id: randomId(),
    role: "focus",
    name: "Serjio Buskets",
    email: "focus@gmail.com",
    password: "focust123",
    permissions: {
      canCreateEvent: false,
      canModifyEvent: false,
      canDeleteEvent: false,
      canViewEvent: true,
      canAssignRoles: false,
      canSendReciveMessage: true,
    },
  },
];
