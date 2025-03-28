import { differenceInYears, formatDistanceToNowStrict } from "date-fns"

export function dateDiff(date: Date): string {
    const diffInTime = formatDistanceToNowStrict(date);
    const result = diffInTime.split(" ");
    return `${result[0]} ${result[1][0]}`
}

export function yearsDiff(date: Date): number {
    return differenceInYears(new Date(), date);
}

export function getYesterday(): Date {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0);
    return yesterday;
}