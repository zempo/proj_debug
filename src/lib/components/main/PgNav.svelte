<script>
	// import { page } from '$app/stores';
	import { main } from '$lib/store/main.svelte';
	import { pageTree } from '$lib/data/tree.js';

	let activeSection = null;

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
</script>

<nav class="accordion-nav" aria-label="Documentation navigation">
	{#each sections as section}
		<div class="accordion-item">
			<h3 class="accordion-heading">
				<button
					class="accordion-trigger"
					aria-expanded={activeSection === section.slug}
					aria-controls={`panel-${section.slug}`}
					on:click={() => toggleSection(section.slug)}
				>
					<span class="accordion-title">{section.title}</span>
					<span class="accordion-icon" aria-hidden="true">
						{activeSection === section.slug ? '−' : '+'}
					</span>
				</button>
			</h3>

			<div
				id={`panel-${section.slug}`}
				class="accordion-panel"
				role="region"
				in:fly={{ y: -20, duration: 200 }}
				out:fade
			>
				<ul class="nav-submenu">
					{#each section.items as item}
						<li class="nav-subitem">
							<a
								href={`/${section.slug}/${item.slug}`}
								class="nav-sublink {isActive(section.slug, item.slug) ? 'is-active' : ''}"
							>
								{item.title}
								{#if item.content}
									<span class="content-indicator" aria-label="(Has live demo)">★</span>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/each}
</nav>

<style>
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
