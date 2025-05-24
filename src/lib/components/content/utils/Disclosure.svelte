<script>
	import { fade, slide, fly } from 'svelte/transition';

	// let isOpen = $state(false);
	let { accH, accC, isOpen = false } = $props();
</script>

<div class="content_disclosure">
	<button
		aria-expanded={isOpen}
		aria-controls="disclosure-content"
		onclick={() => (isOpen = !isOpen)}
		class="disclosure_btn"
	>
		<svg
			class="mr-1"
			width="15"
			height="15"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
		>
		{#if accH}
			{@render accH()}
		{/if}
		<!-- ** simple plus -->
		<!-- <span class="icon" aria-hidden="true">{isOpen ? '−' : '+'}</span> -->
	</button>
	{#if isOpen}
		<div
			id="disclosure-content"
			role="region"
			aria-hidden={!isOpen}
			in:slide={{ y: -20, duration: 300, opacity: 0 }}
			out:slide={{ y: -20, duration: 300, opacity: 0 }}
			class="disclosure-content"
		>
			<div class="fade_wrap">
				{#if accC}
					{@render accC()}
				{/if}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	/* @import "lib/assets/scss/..." */
	svg {
		flex-shrink: 0;
		transition: transform 0.2s ease-in;
		margin: 0 0.25rem;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}

	.content_disclosure {
		width: 100%;
		border-bottom: 1px solid var(--border-color, #e1e1e1);
		.disclosure_btn {
			width: 100%;
			background: none;
			text-align: left;
			display: flex;
			align-items: center;
			border: none;
			font-size: 1.15rem;
			padding: 0.5rem 0.25rem;
			cursor: pointer;
			&:hover {
				background-color: var(--hover-bg, #f5f5f5);
			}
		}
	}
</style>
