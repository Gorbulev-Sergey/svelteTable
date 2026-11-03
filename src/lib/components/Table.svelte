<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import TableHeader from '#lib/components/TableHeader.svelte';
	import TableRow from '#lib/components/TableRow.svelte';

	interface IProps {
		data: any[];
		titles: string[];
		grows?: number[];
	}

	let { data, titles, grows = $bindable(Object.values(data).map((v) => 1)) }: IProps = $props();

	let rows = $state(Object.values(data));
	let changePosition = $state<((i: number, direction: '-' | '+') => void)[]>([]);
</script>

<PageTitle>
	<i class="bi bi-chevron-right"></i>
	<div class="bg-2 px-2 py-1 fs-sm rounded-3 text-uppercase ms-1">Строка</div>
</PageTitle>

<div class="rounded-3 overflow-hidden">
	<TableHeader
		data={titles}
		{grows}
		onClickPrev={(i) => changePosition?.forEach((v) => v(i, '-'))}
		onClickNext={(i) => changePosition?.forEach((v) => v(i, '+'))}
	/>

	{#each rows as row, i}
		<TableRow data={row} {grows} positionChanged={(fn) => (changePosition[i] = fn)} />
	{/each}
</div>
