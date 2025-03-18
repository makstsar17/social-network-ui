import { formatDistanceToNowStrict } from "date-fns"

export function dateDiff(date: Date): string {
    const diffInTime = formatDistanceToNowStrict(date);
    const result = diffInTime.split(" ");
    return `${result[0]} ${result[1][0]}`
}