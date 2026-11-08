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
			let t = titles[i];
			titles.splice(0, 1);
			titles.push(t);

			let g = growsState[i];
			growsState.splice(0, 1);
			growsState.push(g);

			for (const row of array) {
				let v = row[i];
				row.splice(0, 1);
				row.push(v);
			}
		}
	}
	function onNext(i: number, titles: string[], array: any[][]) {
		if (i < array[0].length - 1) {
			[titles[i], titles[i + 1]] = [titles[i + 1], titles[i]];
			[growsState[i], growsState[i + 1]] = [growsState[i + 1], growsState[i]];
			for (const row of array) {
				[row[i], row[i + 1]] = [row[i + 1], row[i]];
			}
		} else {
			let t = titles[i];
			titles.splice(-1, 1);
			titles.splice(0, 0, t);

			let g = growsState[i];
			growsState.splice(-1, 1);
			growsState.splice(0, 0, g);

			for (const row of array) {
				let v = row[i];
				row.splice(-1, 1);
				row.splice(0, 0, v);
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

		{#each dataStateFiltered as row}
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
