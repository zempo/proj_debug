<script>
	import Folder from './utils/Folder.svelte';

	const fileStructure = {
		name: 'Root',
		type: 'folder',
		items: [
			{
				name: 'Documents',
				type: 'folder',
				items: [
					{ name: 'Resume.pdf', type: 'file' },
					{ name: 'CoverLetter.docx', type: 'file' }
				]
			},
			{
				name: 'Pictures',
				type: 'folder',
				items: [
					{ name: 'Vacation.jpg', type: 'file' },
					{
						name: 'Family',
						type: 'folder',
						items: [{ name: 'Christmas2023.jpg', type: 'file' }]
					}
				]
			},
			{ name: 'README.txt', type: 'file' }
		]
	};
</script>

{#snippet mainFolder()}
	<Folder name={fileStructure.name} items={fileStructure.items} />
{/snippet}

{@render mainFolder()}
