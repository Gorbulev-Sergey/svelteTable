<script lang="ts">
	interface IProps {
		data: any;
		grows?: number[];
		positionChanged?: (fn: (i: number, direction: '-' | '+') => void) => void;
		_class?: string;
		_style?: string;
	}

	let {
		data,
		grows = $bindable(Object.values(data).map((v) => 1)),
		positionChanged,
		_class = 'bg-1 px-3 py-1 bg-50',
		_style
	}: IProps = $props();

	let cells = $state(Object.values(data));
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

	$effect(() => {
		positionChanged?.((i: number, direction: '-' | '+') => {
			if (direction === '+') nextCell(cells, i);
			if (direction === '-') prevCell(cells, i);
		});
		return () => {
			positionChanged?.(() => {}); // снимаем регистрацию при размонтировании
		};
	});
</script>

<div class="d-flex align-items-strech w-100">
	{#each cells as cell, i}
		<div
			class="d-flex align-items-center gap-1 {_class}"
			style="flex: {grows[i]} {grows[i]} 0%; {_style}"
		>
			{cell}
		</div>
	{/each}
</div>
