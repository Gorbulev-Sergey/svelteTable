<script lang="ts">
	interface IProps {
		data: object;
		grows: number[];
		_class?: string;
		_style?: string;
	}

	let {
		data = $bindable({}),
		grows,
		_class = 'bg-1 bg-50 align-items-center',
		_style
	}: IProps = $props();
</script>

<div class="d-flex align-items-strech w-100">
	{#each Object.values(data) as cell, i}
		<div
			class="d-flex gap-1 text-wrap px-3 py-1 {_class}"
			style="flex: {grows?.[i]} {grows?.[i]} 0%; {_style}"
		>
			{#if !cell.snippet}
				{@html cell}
			{:else}
				{@render cell.snippet?.(data)}
			{/if}
		</div>
	{/each}
</div>
