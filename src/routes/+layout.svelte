<script>
	import { fade } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import PgNav from '$lib/components/main/PgNav.svelte';
	import PgMain from '$lib/components/main/PgMain.svelte';
	import { main } from '$lib/store/main.svelte.js';

	const { data, children } = $props();

	$effect(() => {
		main.currentPage = data.path;
	});

	const transitionIn = { easing: cubicOut, duration: 300, delay: 200 };
	const transitionOut = { easing: cubicIn, duration: 300 };
</script>

<PgNav />
{#key data.path}
	<PgMain>
		<div in:fade|global={transitionIn} out:fade|global={transitionOut}>
			{@render children()}
		</div>
	</PgMain>
{/key}
