<script>
	import { onMount } from 'svelte';

	// Constants matching your GLSL
	const TAU = Math.PI * 2;

	// Palette presets (matches thi.ng/gradients examples)
	const PRESETS = {
		Rainbow: {
			a: [0.5, 0.5, 0.5],
			b: [0.5, 0.5, 0.5],
			c: [1.0, 1.0, 1.0],
			d: [0.0, 0.33, 0.67]
		},
		Sunset: {
			a: [0.8, 0.5, 0.4],
			b: [0.2, 0.4, 0.2],
			c: [2.0, 1.0, 1.0],
			d: [0.5, 0.2, 0.25]
		},
		Ocean: {
			a: [0.3, 0.3, 0.5],
			b: [0.3, 0.3, 0.5],
			c: [0.8, 0.8, 0.5],
			d: [0.1, 0.3, 0.7]
		}
	};

	// Reactive state
	let currentPreset = $state('Rainbow');
	let a = $derived(PRESETS[currentPreset].a);
	let b = $derived(PRESETS[currentPreset].b);
	let c = $derived(PRESETS[currentPreset].c);
	let d = $derived(PRESETS[currentPreset].d);
	let svgElement;

	// GLSL-style palette function
	function palette(t, a, b, c, d) {
		return a.map((aVal, i) => {
			return aVal + b[i] * Math.cos(TAU * (c[i] * t + d[i]));
		});
	}

	// Handle preset changes
	function changePreset() {
		const preset = PRESETS[currentPreset];
		a = [...preset.a];
		b = [...preset.b];
		c = [...preset.c];
		d = [...preset.d];
		handleUpdate();
	}

	// Reactive update function
	function handleUpdate() {
		if (!svgElement) return;
		updateVisualization();
	}

	// Enhanced visualization with reactive cosine graph
	function updateVisualization() {
		const svgNS = 'http://www.w3.org/2000/svg';

		// Clear only the dynamic parts
		const oldElements = svgElement.querySelectorAll('defs, #cosine-graph');
		oldElements.forEach((el) => el.remove());

		// Create gradient band
		const defs = document.createElementNS(svgNS, 'defs');
		const gradient = document.createElementNS(svgNS, 'linearGradient');
		gradient.id = 'palette-gradient';
		gradient.setAttribute('x1', '0%');
		gradient.setAttribute('y1', '0%');
		gradient.setAttribute('x2', '100%');
		gradient.setAttribute('y2', '0%');

		for (let t = 0; t <= 1; t += 0.01) {
			const stop = document.createElementNS(svgNS, 'stop');
			stop.setAttribute('offset', `${t * 100}%`);
			const [rch, gch, bch] = palette(t, a, b, c, d);
			stop.setAttribute(
				'stop-color',
				`rgb(${Math.round(rch * 255)}, ${Math.round(gch * 255)}, ${Math.round(bch * 255)})`
			);
			gradient.appendChild(stop);
		}

		defs.appendChild(gradient);
		svgElement.appendChild(defs);

		const rect = document.createElementNS(svgNS, 'rect');
		rect.setAttribute('width', '100%');
		rect.setAttribute('height', '50');
		rect.setAttribute('fill', 'url(#palette-gradient)');
		svgElement.appendChild(rect);

		// Reactive cosine graph
		const path = document.createElementNS(svgNS, 'path');
		path.id = 'cosine-graph';
		let pathData = 'M 0 100 ';

		const frequency = c[0];
		const phase = d[0];
		const amplitude = b[0] * 30;
		console.log('Amplitude:', amplitude);

		// return a + b * cos(TAU * (c * t + d));
		for (let x = 0; x <= 1; x += 0.01) {
			const y = 100 - amplitude * Math.cos(TAU * (frequency * x + phase));
			pathData += `L ${x * 300} ${y} `;
		}

		path.setAttribute('d', pathData);
		path.setAttribute('stroke', '#0066ff');
		path.setAttribute('stroke-width', '2');
		path.setAttribute('fill', 'none');
		svgElement.appendChild(path);
	}

	// Setup event listeners for smooth dragging
	function setupSliderEvents() {
		const sliders = document.querySelectorAll('input[type="range"]');
		sliders.forEach((slider) => {
			slider.addEventListener('input', handleUpdate); // <- only need this
		});
	}

	$effect(() => {
		handleUpdate();
	});

	onMount(() => {
		updateVisualization();
		setupSliderEvents();
	});
</script>

<div class="palette-debugger debug_w">
	<h2>Color Palette Visualizer</h2>

	<div class="visualization">
		<svg bind:this={svgElement} width="100%" height="150" viewBox="0 0 300 150" />
	</div>

	<div class="export">
		<h3>GLSL Code</h3>
		<pre>
float p1_example = uv.x;			
vec3 cp1 = c_palette(
	p1_example,
	vec3({a.map((n) => n.toFixed(2)).join(', ')}),
	vec3({b.map((n) => n.toFixed(2)).join(', ')}),
	vec3({c.map((n) => n.toFixed(2)).join(', ')}),
	vec3({d.map((n) => n.toFixed(2)).join(', ')})
);</pre>
	</div>

	<div class="controls">
		<select bind:value={currentPreset} onchange={() => changePreset}>
			{#each Object.keys(PRESETS) as name}
				<option value={name}>{name}</option>
			{/each}
		</select>

		<div class="sliders">
			<h3>Vector A (Base)</h3>
			{#each [0, 1, 2] as i}
				<label>
					A[{i}]:
					<input
						type="range"
						value={a[i]}
						min={0}
						max={1}
						step={0.01}
						oninput={(e) => {
							a[i] = parseFloat(e.target.value);
							a = [...a]; // Trigger reactivity
							requestAnimationFrame(updateVisualization);
						}}
					/>
					<span class="value">{a[i].toFixed(2)}</span>
				</label>
			{/each}

			<h3>Vector B (Amplitude)</h3>
			{#each [0, 1, 2] as i}
				<label>
					B[{i}]:
					<input
						type="range"
						value={b[i]}
						min={0}
						max={1}
						step={0.01}
						oninput={(e) => {
							b[i] = parseFloat(e.target.value);
							b = [...b]; // Trigger reactivity
							updateVisualization();
						}}
					/>
					<span class="value">{b[i].toFixed(2)}</span>
				</label>
			{/each}

			<h3>Vector C (Frequency)</h3>
			{#each [0, 1, 2] as i}
				<label>
					C[{i}]: <input type="range" bind:value={c[i]} min={0} max={2} step={0.1} />
					<span class="value">{c[i].toFixed(1)}</span>
				</label>
			{/each}

			<h3>Vector D (Phase)</h3>
			{#each [0, 1, 2] as i}
				<label>
					D[{i}]: <input type="range" bind:value={d[i]} min={0} max={1} step={0.01} />
					<span class="value">{d[i].toFixed(2)}</span>
				</label>
			{/each}
		</div>
	</div>
</div>

<style>
	.palette-debugger {
		font-family: 'Inter', sans-serif;
		padding: 1.5rem;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	h2 {
		color: #333;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.controls {
		display: grid;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	select {
		padding: 0.5rem;
		font-size: 1rem;
		border-radius: 6px;
		border: 1px solid #ddd;
		width: 100%;
	}

	.sliders {
		display: grid;
		gap: 0.75rem;
	}

	h3 {
		margin: 0.5rem 0;
		font-size: 1rem;
		color: #555;
	}

	label {
		display: grid;
		grid-template-columns: 60px 1fr 50px;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.9rem;
	}

	input[type='range'] {
		width: 100%;
		height: 8px;
		accent-color: #0066ff;
	}

	.value {
		text-align: right;
		font-family: monospace;
		color: #666;
	}

	.visualization {
		background: #f8f9fa;
		padding: 1rem;
		border-radius: 8px;
		margin-bottom: 2rem;
	}

	.export {
		margin-bottom: 1.5rem;
		padding: 1rem;
		background: #f0f4f8;
		border-radius: 8px;
	}

	.export h3 {
		margin-top: 0;
	}

	pre {
		background: white;
		padding: 0.75rem;
		border-radius: 4px;
		overflow-x: auto;
		font-size: 0.85rem;
	}
</style>
