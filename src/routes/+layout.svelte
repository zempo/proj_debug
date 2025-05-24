<script>
	import { fade } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	const { data, children } = $props();

	$effect(() => {
		main.currentPage = data.path;
	});

	const transitionIn = { easing: cubicOut, duration: 300, delay: 200 };
	const transitionOut = { easing: cubicIn, duration: 300 };
</script>
