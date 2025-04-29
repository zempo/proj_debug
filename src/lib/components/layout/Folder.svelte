<script>
	import Folder from './Folder.svelte';

	let { name, items = [], depth = 0, path = '' } = $props();
	let isOpen = $state(depth < 1);
</script>

{#snippet folderHeader(name, isOpen, toggle)}
	<button class="folder-header" onclick={toggle}>
		<span class="icon">{isOpen ? '📂' : '📁'}</span>
		<span class="name">{name}</span>
	</button>
{/snippet}

{#snippet fileItem(name, path, depth)}
	<a href={`${path}/${name}`} class="file" style={`--depth: ${depth}`}>
		<span class="icon">📄</span>
		<span class="name">{name}</span>
	</a>
{/snippet}

<div class="folder" style={`--depth: ${depth}`}>
	{@render folderHeader(name, isOpen, (e) => {
		console.log('Folder header clicked');
		e.stopPropagation();
		isOpen = !isOpen;
	})}

	{#if isOpen}
		<div class="folder-contents">
			{#each items as item}
				{#if item.type === 'folder'}
					<Folder
						name={item.name}
						items={item.items}
						depth={depth + 1}
						path={`${path}/${item.name}`}
					/>
				{:else}
					{@render fileItem(item.name, path, depth + 1)}
				{/if}
			{/each}
		</div>
	{/if}
</div>
