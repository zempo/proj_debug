<script>
	// import { page } from '$app/stores';
	import { main } from '$lib/store/main.svelte';
	import { pageTree } from '$lib/data/tree.js';
	import Disclosure from '../content/utils/Disclosure.svelte';

	let activeSection = null;
	let isOpen = false;

	// Extract top-level categories
	const sections = Object.entries(pageTree).map(([key, items]) => ({
		slug: key,
		title: key.toUpperCase(),
		items
	}));

	function toggleSection(slug) {
		activeSection = activeSection === slug ? null : slug;
	}

	// Check if item is active (matches current route)
	function isActive(sectionSlug, itemSlug) {
		return main.currentPage === `/${sectionSlug}/${itemSlug}`;
	}
	function isActivePre(sectionSlug) {
		return main.currentPage.includes(`/${sectionSlug}/`);
	}
</script>

{#snippet tier_2(L)}
	<ul class="submenu_panel ${L.slug}_panel">
		{#each L.items as item}
			<li class="nav-subitem">
				<a
					href={`/${L.slug}/${item.slug}`}
					class="nav-sublink {isActive(L.slug, item.slug) ? 'is-active' : ''}"
				>
					{item.title}
					{#if item.content}
						<span class="content-indicator" aria-label="(Has live demo)">★</span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet tier_1(L)}
	<Disclosure isOpen={isActivePre(L.slug)}>
		{#snippet accH()}<span>{L.title}</span>{/snippet}
		{#snippet accC()}
			{@render tier_2(L)}
		{/snippet}
	</Disclosure>
{/snippet}

<nav class="accordion-nav" aria-label="Documentation navigation">
	<div class="home_link {main.currentPage === '/' ? 'is-active' : ''}">
		<a href="/"
			><img
				src="https://i.imgur.com/vsfRVYe.png"
				alt="Bug with magnifying glass"
				class="home_img"
			/>/</a
		>
	</div>
	{#each sections as section}
		{@render tier_1(section)}
	{/each}
	<!-- <button class="min_all">Hide</button> -->
</nav>

<style lang="scss">
	.home_link {
		width: 100%;
		border-bottom: 1px solid var(--border-color, #e1e1e1);
		img {
			// filter: invert(0);
			filter: invert(0.3);
		}
		&.is-active img {
			filter: none;
		}
	}
	.home_link a {
		margin-left: 0.5rem;
		display: block;
		width: 100%;
		text-decoration: none;
		font-size: 2.5rem;
		padding: 0.1rem;
	}
	.home_img {
		width: 2.5rem;
		height: 2.5rem;
		display: inline;
		margin-right: 0.25rem;
	}

	.submenu_panel {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.accordion-nav {
		--transition-speed: 0.2s;
		width: 100%;
		font-family: system-ui, sans-serif;
		padding: 0.5rem;
	}

	.accordion-item {
		border-bottom: 1px solid var(--border-color, #e1e1e1);
	}

	.accordion-trigger {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.95rem;
		text-align: left;
		transition: all var(--transition-speed) ease;
	}

	.accordion-trigger:hover {
		background-color: var(--hover-bg, #f5f5f5);
	}

	.accordion-trigger[aria-expanded='true'] {
		font-weight: 600;
	}

	.accordion-icon {
		font-size: 1.1em;
		transition: transform var(--transition-speed) ease;
	}

	.accordion-trigger[aria-expanded='true'] .accordion-icon {
		transform: rotate(180deg);
	}

	.nav-submenu {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.nav-subitem {
		border-top: 1px solid var(--border-subtle, #f0f0f0);
	}

	.nav-sublink {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.6rem 1rem 0.6rem 1.75rem;
		color: var(--text-color, #333);
		text-decoration: none;
		transition: all 0.2s ease;
		font-size: 0.9rem;
	}

	.nav-sublink:hover {
		background-color: var(--hover-bg-subtle, #f8f8f8);
	}

	.nav-sublink.is-active {
		font-weight: 500;
		background-color: var(--active-bg, #e0f0ff);
		color: var(--active-text, #0066cc);
	}

	.content-indicator {
		color: var(--accent-color, #ff7b00);
		font-size: 0.8em;
		margin-left: 0.5rem;
	}
</style>
