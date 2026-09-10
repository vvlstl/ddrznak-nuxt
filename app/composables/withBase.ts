/** Префиксует путь из public/ значением app.baseURL.
 * Нужен для статического хостинга на подпути (GitHub Pages),
 * где абсолютные пути вида /images/... ведут в корень домена и дают 404.
 */
export function useBase(path: string): string {
    const baseURL = useRuntimeConfig().app.baseURL;
    return `${baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
