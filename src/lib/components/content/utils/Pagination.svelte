<script>
	let { rows, trimRows = $bindable(5) } = $props();

	let totalRows = $derived(rows.length);
	let perPg = $state('5');
	let currPg = $state(0);

	let totalPg = $derived(Math.ceil(totalRows / Number(perPg)));
	let start = $derived(currPg * Number(perPg));
	let end = $derived(currPg === totalPg - 1 ? totalRows - 1 : start + Number(perPg) - 1);
	let end_2 = $derived(Math.min(start + Number(perPg) - 1, totalRows));

	$effect(() => {
		trimRows = rows.slice(start, end + 1);
	});
</script>

<select bind:value={perPg}>
	<option value="5" selected>5 Per Page</option>
	<option value="10">10 Per Page</option>
	<option value="25">25 Per Page</option>
</select>
{start + 1} - {end + 1} of {totalRows} records
{#if totalRows && totalRows > perPg}
	<button
		type="button"
		disabled={currPg === 0}
		onclick={() => {
			currPg -= 1;
		}}>Prev</button
	>
	<button
		type="button"
		disabled={currPg === totalPg - 1}
		onclick={() => {
			currPg += 1;
		}}>Next</button
	>
{/if}
