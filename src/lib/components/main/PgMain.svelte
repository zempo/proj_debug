<script>
	import { main } from '$lib/store/main.svelte';

	let { children } = $props();
</script>

<main class={`app_main ${main.getRouteClass(main.currentPage)}_main`}>
	{@render children()}
</main>
