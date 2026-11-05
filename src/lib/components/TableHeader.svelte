<script lang="ts">
	interface IProps {
		data: any;
		grows: number[];
		sortableCell: { i: number; value: 'up' | 'down' };
		onClickPrev?: (i: number) => void;
		onClickNext?: (i: number) => void;
		onChangeGrow?: (i: number, value: number) => void;
		onClickSort?: (i: number) => void;
		_class?: string;
		_style?: string;
	}

	let {
		data,
		grows,
		sortableCell,
		onClickPrev,
		onClickNext,
		onChangeGrow,
		onClickSort,
		_class = 'bg-2 px-3 py-1 fw-bold',
		_style
	}: IProps = $props();
</script>

<div class="d-flex align-items-strech w-100">
	{#each data as cell, i}
		<div
			class="d-flex align-items-center gap-1 {_class}"
			style="flex: {grows?.[i]} {grows?.[i]} 0%; {_style}"
		>
			{cell}
			<div class="d-flex align-items-center gap-0" style="gap:3px">
				<button title="вперёд" class="btn btn-xs rounded-3 p-1" onclick={() => onClickPrev?.(i)}>
					<i class="bi bi-chevron-left"></i>
				</button>
				<button title="назад" class="btn btn-xs rounded-3 p-1" onclick={() => onClickNext?.(i)}>
					<i class="bi bi-chevron-right"></i>
				</button>
				<button
					title="доля ширины таблицы"
					class="btn btn-xs rounded-3 py-1 px-2"
					data-bs-toggle="menu"
				>
					{grows?.[i]}
				</button>
				<div class="menu border-0 rounded-3 shadow-sm">
					{#each new Array(10) as _, value}
						<button class="menu-item fs-xs rounded-3" onclick={() => onChangeGrow?.(i, value + 1)}>
							{value + 1}
						</button>
					{/each}
				</div>
			</div>
			<div class="flex-grow-1 d-flex align-items-center justify-content-end">
				<button title="" class="btn-icon btn-xs rounded-3" onclick={() => onClickSort?.(i)}>
					{#if sortableCell.i === i && sortableCell.value === 'down'}
						<i title="по убыванию" class="bi bi-chevron-down"></i>
					{:else if sortableCell.i === i && sortableCell.value === 'up'}
						<i title="по возрастанию" class="bi bi-chevron-up"></i>
					{:else}
						<i title="сортировать" class="bi bi-chevron-expand"></i>
					{/if}
				</button>
			</div>
		</div>
	{/each}
</div>
