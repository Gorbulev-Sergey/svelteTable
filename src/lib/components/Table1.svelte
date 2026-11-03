<script lang="ts">
	import Row from './Row.svelte';

	interface IProps {
		tableTitle?: string;
		rows: object[];
		grows?: number[];
		titles?: string[];
		sorts?: boolean[];
	}

	let clickedCell = $state(1);
	let { tableTitle, rows, grows, titles, sorts }: IProps = $props();
</script>

<h4 class="px-1 mb-3">{tableTitle}</h4>
<div class="rounded-3 overflow-hidden bg-1 bg-50 w-100 overflow-x-auto">
	<Row
		cells={titles}
		{grows}
		{sorts}
		{clickedCell}
		onSort={(i, clicks) => {
			clickedCell = i;
			if (clicks === 1)
				rows = [...Object.values(rows)].sort((a, b) =>
					Object.values(b)[i].localeCompare(Object.values(a)[i])
				);
			else if (clicks === 2)
				rows = [...Object.values(rows)].sort((a, b) =>
					Object.values(a)[i].localeCompare(Object.values(b)[i])
				);
		}}
		_class="px-3 py-1 fw-bold bg-1 bg-70"
	/>
	{#each rows as row}
		<Row cells={Object.values(row)} {grows} _class="px-3 py-2" />
	{/each}
</div>
