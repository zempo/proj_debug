<script>
	let { data } = $props();

	const { slug, title, content } = data.snip;

	const Debug = content;
</script>

<h1 class="use_h2">GLSL: {data.snip.title}</h1>
<Debug />
