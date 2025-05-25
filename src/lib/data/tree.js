//  * debug pages tree

import D3_Chart from '$lib/components/content/D3_Chart.svelte';
import GlslPalette from '$lib/components/content/GLSL_Palette.svelte';
import UI_fontdebug from '$lib/components/content/UI_fontdebug.svelte';
import UI_pagination from '$lib/components/content/UI_pagination.svelte';
import UI_tree_gen from '$lib/components/content/UI_tree_gen.svelte';

export const pageTree = {
	d3: [
		{
			slug: 'chart',
			title: 'D3 Chart',
			content: D3_Chart
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
			slug: 'font_debug',
			title: 'SCSS Font Debug',
			content: UI_fontdebug
		},
		{
			slug: 'pagination',
			title: 'Pagination ($bindable)',
			content: UI_pagination
		},
		{
			slug: 'tree_gen',
			title: 'File Tree Maker',
			content: UI_tree_gen
		}
	]
};
