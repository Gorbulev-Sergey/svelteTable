<script lang="ts">
	import TableHeader from '#lib/components/TableHeader.svelte';
	import TableRow from '#lib/components/TableRow.svelte';

	interface IProps {
		title?: string;
		data: any[];
		titles?: string[];
		grows?: number[];
		_class: { table: string; header: string; row: string };
		_style: { table: string; header: string; row: string };
	}

	let { title, data, titles, grows, _class, _style }: IProps = $props();

	let titlesState = $state(titles || Object.keys(data[0]).map((v) => v));
	let dataState = $state(data.map((v) => Object.values(v)));
	let growsState = $state(grows || Object.keys(dataState[0]).map((v) => 1));

	let sortableCell: { i: number; value: 'up' | 'down' } = $state({ i: 0, value: 'down' });
	let sortedDataState = $derived.by(() => {
		if (sortableCell.value === 'down') {
			return [...dataState].sort((a, b) =>
				String(a[sortableCell.i]).localeCompare(String(b[sortableCell.i]))
			);
		}
		if (sortableCell.value === 'up') {
			return [...dataState].sort((a, b) =>
				String(b[sortableCell.i]).localeCompare(String(a[sortableCell.i]))
			);
		}
	});

	function onPrev(i: number, titles: string[], array: any[][]) {
		if (i > 0) {
			[titles[i], titles[i - 1]] = [titles[i - 1], titles[i]];
			[growsState[i], growsState[i - 1]] = [growsState[i - 1], growsState[i]];
			for (const row of array) {
				[row[i], row[i - 1]] = [row[i - 1], row[i]];
			}
		} else {
			[titles[i], titles[array.length]] = [titles[array.length], titles[i]];
			[growsState[i], growsState[array.length]] = [growsState[array.length], growsState[i]];
			for (const row of array) {
				[row[i], row[array.length]] = [row[array.length], row[i]];
			}
		}
	}
	function onNext(i: number, titles: string[], array: any[][]) {
		if (i > array.length - 1) {
			[titles[i], titles[0]] = [titles[0], titles[i]];
			[growsState[i], growsState[0]] = [growsState[0], growsState[i]];
			for (const row of array) {
				[row[i], row[0]] = [row[0], row[i]];
			}
		} else {
			[titles[i], titles[i + 1]] = [titles[i + 1], titles[i]];
			[growsState[i], growsState[i + 1]] = [growsState[i + 1], growsState[i]];
			for (const row of array) {
				[row[i], row[i + 1]] = [row[i + 1], row[i]];
			}
		}
	}
</script>

<div>
	<h4 class="ms-1 mb-3">{title}</h4>
	<div class="rounded-3 overflow-hidden {_class.table}" style={_style.table}>
		<TableHeader
			data={titlesState}
			grows={growsState}
			{sortableCell}
			onClickPrev={(i) => onPrev(i, titlesState, dataState)}
			onClickNext={(i) => onNext(i, titlesState, dataState)}
			onChangeGrow={(i, value) => (growsState[i] = value)}
			onClickSort={(i) => {
				if (sortableCell.i != i) sortableCell = { i: i, value: 'down' };
				else sortableCell = { i: i, value: sortableCell.value === 'down' ? 'up' : 'down' };
			}}
			_class={_class.header}
			_style={_style.header}
		/>

		{#each sortedDataState as row, i}
			<TableRow data={row} grows={growsState} _class={_class.row} _style={_style.row} />
		{/each}
	</div>
</div>
