/**
 * Mirror of TestLab.Models.Category
 */
export const Category = {
    Economy: 0,
    Standard: 1,
    Deluxe: 2
} as const;

export type Category = typeof Category[keyof typeof Category];

/**
 * Mirror of TestLab.Models.BookingStatus
 */
export const BookingStatus = {
    Pending: 0,
    Confirmed: 1,
    Cancelled: 2,
    Completed: 3,
    Prolonged: 4
} as const;

export type BookingStatus = typeof BookingStatus[keyof typeof BookingStatus];

/**
 * Mapping for UI Labels
 */
export const CategoryLabels: Record<Category, string> = {
    [Category.Economy]: 'Economy',
    [Category.Standard]: 'Standard',
    [Category.Deluxe]: 'Deluxe',
};

export const StatusLabels: Record<BookingStatus, string> = {
    [BookingStatus.Pending]: 'Pending',
    [BookingStatus.Confirmed]: 'Confirmed',
    [BookingStatus.Cancelled]: 'Cancelled',
    [BookingStatus.Completed]: 'Completed',
    [BookingStatus.Prolonged]: 'Prolonged',
};