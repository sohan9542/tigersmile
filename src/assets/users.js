export const users = [
    {
       role : 'manager',
       email: 'manager@gmail.com',
       password: 'manager123',
       permissions: {
        canCreateEvent: true,
        canModifyEvent : true,
        canDeleteEvent: true,
        canViewEvent: true,
        canAssignRoles: true,
        canSendReciveMessage: true,
       }
    },
    {
       role : 'admin',
       email: 'admin@gmail.com',
       password: 'admin123',
       permissions: {
        canCreateEvent: true,
        canModifyEvent : true,
        canDeleteEvent: true,
        canViewEvent: true,
        canAssignRoles: false,
        canSendReciveMessage: true,
       }
    },
    {
       role : 'observer',
       email: 'observer@gmail.com',
       password: 'observer123',
       permissions: {
        canCreateEvent: false,
        canModifyEvent : false,
        canDeleteEvent: false,
        canViewEvent: true,
        canAssignRoles: false,
        canSendReciveMessage: true,
       }
    },
    {
       role : 'viewer',
       email: 'viewer@gmail.com',
       password: 'viewer123',
       permissions: {
        canCreateEvent: false,
        canModifyEvent : false,
        canDeleteEvent: false,
        canViewEvent: true,
        canAssignRoles: false,
        canSendReciveMessage: false,
       }
    },
    {
       role : 'support',
       email: 'support@gmail.com',
       password: 'support123',
       permissions: {
        canCreateEvent: false,
        canModifyEvent : false,
        canDeleteEvent: false,
        canViewEvent: true,
        canAssignRoles: false,
        canSendReciveMessage: 'limited',
       }
    },
    {
       role : 'focus',
       email: 'focus@gmail.com',
       password: 'focust123',
       permissions: {
        canCreateEvent: false,
        canModifyEvent : false,
        canDeleteEvent: false,
        canViewEvent: true,
        canAssignRoles: false,
        canSendReciveMessage: true,
       }
    },
]