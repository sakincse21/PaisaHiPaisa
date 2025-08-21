export const IRole = {
    AGENT: 'AGENT',
    ADMIN: 'ADMIN',
    USER: 'USER',
    SUPER_ADMIN: 'SUPER_ADMIN'
} as const;

export const IStatus = {
    ACTIVE: 'ACTIVE',
    SUSPENDED: 'SUSPENDED',
    BLOCKED: 'BLOCKED',
    DELETE: 'DELETE',
} as const;