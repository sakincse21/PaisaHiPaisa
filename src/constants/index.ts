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

export const ITransactionStatus = {
    PENDING:"PENDING",
    COMPLETED:"COMPLETED",
    REFUNDED:'REFUNDED',
    FAILED:"FAILED"
} as const;

export const ITransactionType = {
    SEND_MONEY:"SEND_MONEY",
    ADD_MONEY:"ADD_MONEY",
    WITHDRAW:"WITHDRAW",
    CASH_IN:"CASH_IN",
    REFUND:"REFUND"
} as const;

export const ITransactionSort = {
    ASC:"asc",
    DESC:"desc"
} as const;