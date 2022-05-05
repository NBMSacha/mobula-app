export function formatName(name: string, chars: number): string {
    return name.substr(0, chars) + '...';
}