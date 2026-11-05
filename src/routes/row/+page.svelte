<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Table from '#lib/components/Table.svelte';
	import TableHeader from '#lib/components/TableHeader.svelte';
	import TableRow from '#lib/components/TableRow.svelte';

	let data = $state([
		{
			uid: crypto.randomUUID(),
			name: 'Serge',
			email: 'sergify@rr.r',
			status: 'go'
		},
		{
			uid: crypto.randomUUID(),
			name: 'Serge',
			email: 'sergify@rr.r',
			status: 'go'
		},
		{
			uid: crypto.randomUUID(),
			name: 'Serge',
			email: 'sergify@rr.r',
			status: 'go'
		}
	]);
	let titles = $state(['id', 'name', 'email', 'status']);
	let grows = $state([2, 1, 1, 1]);

	let rowJson = {
		uid: crypto.randomUUID(),
		name: 'Serge',
		email: 'sergify@rr.r',
		status: 'go'
	};
	let row = $state(Object.values(rowJson));

	function prevCell(array: any[], i: number) {
		let v = array[i];
		array.splice(i, 1);
		array.splice(i === 0 ? array.length : i - 1, 0, v);
	}
	function nextCell(array: any[], i: number) {
		let v = array[i];
		array.splice(i, 1);
		array.splice(i === array.length ? 0 : i + 1, 0, v);
	}

	let changePosition: null | { i: number; direction: 'left' | 'right' } = $state(null);
</script>

<PageTitle>
	<i class="bi bi-chevron-right"></i>
	<div class="bg-2 px-2 py-1 fs-sm rounded-3 text-uppercase ms-1">Строка</div>
</PageTitle>

<div class="d-flex align-items-center bg-2 rounded-3 w-100" hidden>
	{#each row as cell, i}
		<div class="d-flex align-items-center gap-1 px-3 py-1" style="flex: {grows[i]} {grows[i]} 0%">
			{cell}
			<div class="d-flex align-items-center gap-0">
				<button
					title=""
					class="btn btn-xs rounded-3 p-1"
					onclick={() => {
						prevCell(row, i);
						prevCell(grows, i);
					}}
				>
					<i class="bi bi-chevron-left"></i>
				</button>
				<button
					title=""
					class="btn btn-xs rounded-3 p-1"
					onclick={() => {
						nextCell(row, i);
						nextCell(grows, i);
					}}
				>
					<i class="bi bi-chevron-right"></i>
				</button>
				<button title="" class="btn btn-xs rounded-3 p-1" data-bs-toggle="menu">
					{grows[i]}
				</button>
				<div class="menu border-0 rounded-3 shadow-sm">
					{#each new Array(11) as _, j}
						<button
							class="menu-item fs-xs rounded-3"
							onclick={() => {
								grows[i] = j;
							}}>{j}</button
						>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>

<div class=" rounded-3 overflow-hidden" hidden>
	<TableHeader
		data={rowJson}
		{grows}
		onClickPrev={(i) => {
			changePosition = { i: i, direction: 'left' };
		}}
		onClickNext={(i) => {
			changePosition = { i: i, direction: 'right' };
		}}
	/>
	<TableRow data={rowJson} {grows} bind:changePosition />
	<TableRow data={rowJson} {grows} bind:changePosition />
	<TableRow data={rowJson} {grows} bind:changePosition />
</div>

<Table title="Пользователи" {data} {titles} bind:grows />
