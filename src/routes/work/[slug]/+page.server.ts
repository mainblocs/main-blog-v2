import { getAllProjects } from '$src/lib/projects';
import type { LoadEvent } from '@sveltejs/kit';
export const prerender = true;
/**
 *
 * @imort LoadEvent from @sveltejs/kit
 *
 */
export async function load({ params, parent }: LoadEvent) {
	const slug = params.slug;
	const res = await parent();
	if (res?.projects?.length > 0) {
		const neededData = res?.projects?.find(
			(project: { slug: string | undefined }) => project.slug === slug
		);
		// find other projects thats not in the current project
		const otherProjects = res?.projects?.filter(
			(project: { slug: string | undefined }) => project.slug != slug
		);
		if (neededData?.id?.length > 0) {
			return { project: neededData, moreProjects: otherProjects };
		}
	} else {
		const projects = getAllProjects();
		const neededData = projects?.find((project) => project.slug === slug);

		const otherProjects = projects?.filter((project) => project.slug != slug);
		if (neededData?.slug && neededData?.slug?.length > 0) {
			return { project: neededData, moreProjects: otherProjects };
		}
	}
}
