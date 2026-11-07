<script lang="ts">
	import TableHeader from '../components/TableHeader.svelte';
	import TableRow from '../components/TableRow.svelte';
	import type { ITableFilter } from '../models/ITableFilter.ts';

	interface IProps {
		title?: string;
		data: any[];
		titles?: string[];
		grows?: number[];
		_class?: { table?: string; header?: string; row?: string };
		_style?: { table?: string; header?: string; row?: string };
	}

	let { title, data, titles, grows, _class, _style }: IProps = $props();

	let dataState = $state(data.map((v) => Object.values(v)));
	let titlesState = $state(titles || Object.keys(data[0]).map((v) => v));
	let growsState = $state(grows || Object.keys(dataState[0]).map((v) => 1));

	let filter: ITableFilter = $state({
		sort: {
			i: 0,
			direction: 'down'
		}
	});
	let dataStateFiltered = $derived.by(() => {
		try {
			if (filter.sort.direction === 'down') {
				return [...dataState].sort((a, b) =>
					String(a[filter.sort.i]).localeCompare(String(b[filter.sort.i]))
				);
			}
			if (filter.sort.direction === 'up') {
				return [...dataState].sort((a, b) =>
					String(b[filter.sort.i]).localeCompare(String(a[filter.sort.i]))
				);
			}
		} catch (error) {
			return [...dataState];
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
	<div class="rounded-3 overflow-hidden {_class?.table}" style={_style?.table}>
		<TableHeader
			data={titlesState}
			grows={growsState}
			{filter}
			onClickPrev={(i) => onPrev(i, titlesState, dataState)}
			onClickNext={(i) => onNext(i, titlesState, dataState)}
			onChangeGrow={(i, value) => (growsState[i] = value)}
			onClickSort={(i) => {
				if (filter.sort.i != i) filter.sort = { i: i, direction: 'down' };
				else filter.sort = { i: i, direction: filter.sort.direction === 'down' ? 'up' : 'down' };
			}}
			_class={_class?.header}
			_style={_style?.header}
		/>

		{#each dataStateFiltered as row, i}
			<TableRow
				data={row}
				grows={growsState}
				_class={_class?.row}
				_style={_style?.row}
				titles={titlesState}
			/>
		{/each}
	</div>
</div>
