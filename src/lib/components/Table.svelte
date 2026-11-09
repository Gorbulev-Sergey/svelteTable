<script lang="ts">
	import TableHeader from '#lib/components/TableHeader.svelte';
	import TableRow from '#lib/components/TableRow.svelte';
	import type { ITableFilter } from '#lib/models/ITableFilter.ts';

	interface IProps {
		title?: string;
		data: object[];
		titles?: string[];
		grows?: number[];
		_class?: { table?: string; header?: string; row?: string };
		_style?: { table?: string; header?: string; row?: string };
	}

	let { title, data = $bindable([]), titles, grows, _class, _style }: IProps = $props();

	// let dataState = $state(data.map((v) => Object.values(v)));
	let dataState = $state(Object.values(data));
	let titlesState = $state(titles || Object.keys(data[0]).map((v) => v));
	let growsState = $state(grows || Object.keys(dataState[0]).map((v) => 1));

	let filter: ITableFilter = $state({
		sort: {
			i: 0,
			direction: 'down'
		}
	});

	let dataStateFiltered = $derived.by(() => {
		const keys = Object.keys(dataState[0]);
		const sortKey = keys[filter.sort.i];

		if (filter.sort.direction === 'down') {
			return [...dataState].sort((a, b) => {
				return String(a[sortKey as keyof typeof a]).localeCompare(
					String(b[sortKey as keyof typeof b])
				);
			});
			// return dataState.sort((a, b) =>
			// 	String(a[filter.sort.i]).localeCompare(String(b[filter.sort.i]))
			// );
		}
		if (filter.sort.direction === 'up') {
			return [...dataState].sort((a, b) => {
				return String(b[sortKey as keyof typeof b]).localeCompare(
					String(a[sortKey as keyof typeof a])
				);
			});
		}
	});

	function onPrev(i: number) {
		if (i > 0) {
			[titlesState[i], titlesState[i - 1]] = [titlesState[i - 1], titlesState[i]];
			[growsState[i], growsState[i - 1]] = [growsState[i - 1], growsState[i]];
			dataState = dataState.map((v) => {
				let a = Object.entries(v);
				[a[i], a[i - 1]] = [a[i - 1], a[i]];
				return Object.fromEntries(a);
			});
		} else {
			let t = titlesState[i];
			titlesState.splice(0, 1);
			titlesState.push(t);

			let g = growsState[i];
			growsState.splice(0, 1);
			growsState.push(g);

			dataState = dataState.map((n) => {
				let a = Object.entries(n);
				let v = a[i];
				a.splice(0, 1);
				a.push(v);
				return Object.fromEntries(a);
			});
		}
	}
	function onNext(i: number) {
		let keysLength = Object.keys(dataState[0]).length - 1;
		if (i < keysLength) {
			[titlesState[i], titlesState[i + 1]] = [titlesState[i + 1], titlesState[i]];
			[growsState[i], growsState[i + 1]] = [growsState[i + 1], growsState[i]];
			dataState = dataState.map((v) => {
				let a = Object.entries(v);
				[a[i], a[i + 1]] = [a[i + 1], a[i]];
				return Object.fromEntries(a);
			});
		} else {
			let t = titlesState[i];
			titlesState.splice(-1, 1);
			titlesState.splice(0, 0, t);

			let g = growsState[i];
			growsState.splice(-1, 1);
			growsState.splice(0, 0, g);

			dataState = dataState.map((n) => {
				let a = Object.entries(n);
				let v = a[i];
				a.splice(-1, 1);
				a.splice(0, 0, v);
				return Object.fromEntries(a);
			});
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
			onClickPrev={(i) => onPrev(i)}
			onClickNext={(i) => onNext(i)}
			onChangeGrow={(i, value) => (growsState[i] = value)}
			onClickSort={(i) => {
				if (filter.sort.i != i) filter.sort = { i: i, direction: 'down' };
				else filter.sort = { i: i, direction: filter.sort.direction === 'down' ? 'up' : 'down' };
			}}
			_class={_class?.header}
			_style={_style?.header}
		/>

		{#each dataStateFiltered as row}
			<TableRow data={row} grows={growsState} _class={_class?.row} _style={_style?.row} />
		{/each}
	</div>
</div>
