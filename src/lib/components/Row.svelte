<script lang="ts">
	interface IProps {
		cells?: any[];
		grows?: number[];
		sorts?: boolean[];
		clickedCell?: number;
		onSort?: (i: number, clicks: number) => void;
		_class?: string;
		_style?: string;
	}

	let clicks = $state(1);
	let {
		cells,
		grows,
		sorts,
		clickedCell,
		isTitle,
		onSort,
		onLeft,
		onRight,
		_class,
		_style
	}: IProps = $props();
</script>

<div class="d-flex align-items-center w-100">
	{#each grows as _, i}
		<div
			class="{_class} d-flex align-items-center justify-content-between gap-2"
			style="flex: {grows?.[i]} 1 0%; {_style}"
		>
			<div class="d-flex align-self-center gap-1">
				{#if typeof cells?.[i] !== 'function'}
					<div>{@html cells?.[i]}</div>
				{:else}
					{@render cells?.[i]?.()}
				{/if}
			</div>

			{#if sorts?.[i]}
				<button
					title=""
					class="btn-icon btn-xs rounded-3"
					onclick={() => {
						if (clicks === 1) clicks++;
						else clicks = 1;
						onSort?.(i, clicks);
					}}
				>
					{#if clickedCell === i}
						{#if clicks == 1}
							<i class="bi bi-chevron-down"></i>
						{:else if clicks === 2}
							<i class="bi bi-chevron-up"></i>
						{/if}
					{:else}
						<i class="bi bi-chevron-expand"></i>
					{/if}
				</button>
			{/if}
		</div>
	{/each}
</div>
