<script lang="ts">
	interface IProps {
		data: any;
		grows: number[];
		_class?: string;
		_style?: string;
	}

	let { data, grows, _class = 'bg-1 px-3 py-1 bg-50', _style }: IProps = $props();
</script>

<div class="d-flex align-items-strech w-100">
	{#each data as cell, i}
		<div
			class="d-flex align-items-center gap-1 text-wrap {_class}"
			style="flex: {grows?.[i]} {grows?.[i]} 0%; {_style}"
		>
			{cell}
		</div>
	{/each}
</div>
