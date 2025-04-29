<script>
	let { data } = $props();

	const { slug, title, content } = data.snip;

	const Debug = content;
</script>

<h1>{data.snip.title}</h1>
<Debug />
