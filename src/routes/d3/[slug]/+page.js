import { error } from '@sveltejs/kit';
import { pageTree } from '$lib/data/tree.js';

export function load({ params }) {
	const snip = pageTree.d3.find((snip) => snip.slug === params.slug);

	if (!snip) error(404);

	return {
		snip
	};
}
