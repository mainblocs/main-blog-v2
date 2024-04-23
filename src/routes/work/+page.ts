import { getAllProjects } from '$src/lib/projects';
import type { LoadEvent } from '@sveltejs/kit';
export const prerender = true;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function load({ params }: LoadEvent) {
	return { projects: getAllProjects() };
}
