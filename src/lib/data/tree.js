//  * debug pages tree

import GlslPalette from '$lib/components/content/GLSL_Palette.svelte';
import UI_tree_gen from '$lib/components/content/UI_tree_gen.svelte';

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
			title: 'GLSL Palette Maker',
			content: GlslPalette
			//
		}
	],
	ui: [
		{
			slug: 'file_tree',
			title: 'File Tree Maker',
			content: UI_tree_gen
		}
	]
};
