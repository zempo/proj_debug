import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const filePath = dirname(fileURLToPath(import.meta.url));
const sassPath = `${filePath}/src/lib/style/`;

const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$lib: `${filePath}/src/lib/`,
			$components: `${filePath}/src/lib/components/`,
			$style: `${sassPath}`
		}
	},
	preprocess: [
		mdsvex(),
		sveltePreprocess({
			scss: {
				// We can use a path relative to the root because
				// svelte-preprocess automatically adds it to `includePaths`
				// if none is defined.
				prependData: `@use '${sassPath}vars';`
			}
		})
	],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
