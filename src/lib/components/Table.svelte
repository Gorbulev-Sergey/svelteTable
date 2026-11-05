<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import TableHeader from '#lib/components/TableHeader.svelte';
	import TableRow from '#lib/components/TableRow.svelte';

	interface IProps {
		title?: string;
		data: any[];
		titles: string[];
		grows?: number[];
	}

	let {
		title,
		data,
		titles,
		grows = $bindable(Object.values(data).map((v) => 1))
	}: IProps = $props();

	let rows = $state(data.map((v) => Object.values(v)));
	let changePosition = $state<((i: number, direction: '-' | '+') => void)[]>([]);
</script>

<h4 class="ms-1 mb-3">{title}</h4>
<div class="rounded-3 overflow-hidden">
	<TableHeader
		data={titles}
		bind:grows
		onClickPrev={(i) => changePosition?.forEach((v) => v(i, '-'))}
		onClickNext={(i) => changePosition?.forEach((v) => v(i, '+'))}
		onClickSort={(i) => {
			console.log([...titles].sort((a, b) => b.localeCompare(a)));
		}}
	/>

	{#each rows as row, i}
		<TableRow data={row} bind:grows positionChanged={(fn) => (changePosition[i] = fn)} />
	{/each}
</div>
