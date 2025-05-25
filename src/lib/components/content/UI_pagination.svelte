<script>
	import Pagination from './utils/Pagination.svelte';

	let numbers = [];
	let trimNums = $state([]);
	for (let i = 1; i <= 200; i++) {
		numbers.push(i);
	}
</script>

<h2 class="use_h3">Basic Pagination</h2>
<div class="results">
	{#each trimNums as n}
		<span class="result">{n}</span>
	{/each}
</div>
<Pagination rows={numbers} bind:trimRows={trimNums} />

<style lang="scss">
	/* @import "lib/assets/scss/..." */
	.results {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 0.25rem;
		background-color: var(--color-bg-secondary);
		.result {
			padding: 0.25rem 0.5rem;
		}
	}
</style>
