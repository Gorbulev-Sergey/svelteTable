<script lang="ts">
	interface IProps {
		data: any;
		grows?: number[];
		onClickPrev?: (i: number) => void;
		onClickNext?: (i: number) => void;
		_class?: string;
		_style?: string;
	}

	let {
		data,
		grows = $bindable(Object.values(data).map((v) => 1)),
		onClickPrev,
		onClickNext,
		_class = 'bg-2 px-3 py-1 fw-bold',
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
</script>

<div class="d-flex align-items-strech w-100">
	{#each cells as cell, i}
		<div
			class="d-flex align-items-center gap-1 {_class}"
			style="flex: {grows[i]} {grows[i]} 0%; {_style}"
		>
			{cell}
			<div class="d-flex align-items-center gap-0" style="gap:3px">
				<button
					title="вперёд"
					class="btn btn-xs rounded-3 p-1"
					onclick={() => {
						prevCell(cells, i);
						prevCell(grows, i);
						onClickPrev?.(i);
					}}
				>
					<i class="bi bi-chevron-left"></i>
				</button>
				<button
					title="назад"
					class="btn btn-xs rounded-3 p-1"
					onclick={() => {
						nextCell(cells, i);
						nextCell(grows, i);
						onClickNext?.(i);
					}}
				>
					<i class="bi bi-chevron-right"></i>
				</button>
				<button
					title="доля ширины таблицы"
					class="btn btn-xs rounded-3 py-1 px-2"
					data-bs-toggle="menu"
				>
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
			<div class="flex-grow-1 d-flex align-items-center justify-content-end">
				<button title="" class="btn-icon btn-xs rounded-3">
					<i class="bi bi-chevron-expand"></i>
				</button>
			</div>
		</div>
	{/each}
</div>
