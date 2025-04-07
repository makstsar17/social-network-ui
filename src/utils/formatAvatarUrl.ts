export function getAvatarUrl() {
    const apiUrl = import.meta.env.VITE_API_URL as string;
    return apiUrl.endsWith("/") ? apiUrl : apiUrl + "/"
}