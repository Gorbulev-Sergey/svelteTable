<script lang="ts">
	import TableHeader1 from '#lib/components/TableHeader1.svelte';
	import TableRow1 from '#lib/components/TableRow1.svelte';

	interface IProps {
		title?: string;
		data: any[];
		titles?: string[];
		grows?: number[];
	}

	let {
		title,
		data,
		titles = $bindable(Object.keys(data[0]).map((v) => v)),
		grows = $bindable(Object.values(data).map((v) => 1))
	}: IProps = $props();

	let array = $state(data.map((v) => Object.values(v)));

	function onPrev(i: number, titles: string[], array: any[][]) {
		if (i > 0) {
			[titles[i], titles[i - 1]] = [titles[i - 1], titles[i]];
			for (const row of array) {
				[row[i], row[i - 1]] = [row[i - 1], row[i]];
			}
		} else {
			[titles[i], titles[array.length]] = [titles[array.length], titles[i]];
			for (const row of array) {
				[row[i], row[array.length]] = [row[array.length], row[i]];
			}
		}
	}
	function onNext(i: number, titles: string[], array: any[][]) {
		if (i > array.length - 1) {
			[titles[i], titles[0]] = [titles[0], titles[i]];
			for (const row of array) {
				[row[i], row[0]] = [row[0], row[i]];
			}
		} else {
			[titles[i], titles[i + 1]] = [titles[i + 1], titles[i]];
			for (const row of array) {
				[row[i], row[i + 1]] = [row[i + 1], row[i]];
			}
		}
	}
</script>

<div>
	<h4 class="ms-1 mb-3">{title}</h4>
	<div class="rounded-3 overflow-hidden">
		<TableHeader1
			data={titles}
			bind:grows
			onClickPrev={(i) => onPrev(i, titles, array)}
			onClickNext={(i) => onNext(i, titles, array)}
			onClickSort={(i) => {}}
		/>

		{#each array as row, i}
			<TableRow1 data={row} bind:grows />
		{/each}
	</div>
</div>
