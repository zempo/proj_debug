//  * debug pages tree

import GlslPalette from '$lib/components/content/GLSL_Palette.svelte';

export const pageTree = {
	d3: [
		{
			slug: 'chart',
			title: 'D3 Chart'
		}
	],
	glsl: [
		{
			slug: 'c_palette',
			title: 'Color Palette Visualizer',
			content: GlslPalette
			//
		}
	]
};
