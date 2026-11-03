<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Table from '#lib/components/Table.svelte';
	import type { Snippet } from 'svelte';

	interface ICell {
		value: number | string;
		grow?: number;
		_class?: string | null;
		isSorted?: boolean;
	}

	function Cell(
		content: number | string = '',
		grow: number = 0,
		_class?: string | null,
		isSorted: boolean = false
	): ICell {
		return {
			content,
			grow,
			_class,
			isSorted
		};
	}

	let row: ICell[] = [
		{ value: crypto.randomUUID(), isSorted: true },
		{ value: 'Serge' },
		{ value: 45 }
	];

	interface IRow {
		uid: string;
		name: string;
		email: string;
		status: '' | 'success' | 'wait' | Snippet;
		comment?: string;
	}

	let rows: IRow[] = [
		{
			uid: crypto.randomUUID(),
			name: 'Serge',
			email: 'serge@nn.com',
			status: 'wait',
			comment: 'Как дела'
		},
		{
			uid: crypto.randomUUID(),
			name: 'Helena',
			email: 'helena@nn.com',
			status: 'success',
			comment: 'Получилось не так'
		},
		{
			uid: crypto.randomUUID(),
			name: 'Max',
			email: 'max@nn.com',
			status: ''
		},
		{
			uid: crypto.randomUUID(),
			name: "<div class='d-flex align-items-baseline gap-2'><div>Ivan</div><div class='badge bg-info bg-20'>Текущий пользователь</div></div>",
			email: 'ivan@nn.com',
			status: test
		}
	];
</script>

{#snippet test(email: string)}
	<button class="btn btn-xs rounded-3 border-0" data-bs-toggle="menu"> Привет </button>
	<div class="menu rounded-3 border-0 shadow-sm">
		<a class="menu-item" href="#">{email}</a>
		<a class="menu-item" href="#">Menu item 2</a>
		<a class="menu-item" href="#">Menu item 3</a>
	</div>
{/snippet}

{#snippet Row(grow: number = 1, bg?: string, content?: string, _class?: string)}
	<div class="{bg} {_class} bg-10 px-3 py-1" style="flex: {grow} 1 0%">{content}</div>
{/snippet}

<PageTitle>
	<i class="bi bi-chevron-right"></i>
	<div class="bg-2 px-2 py-1 fs-sm rounded-3 text-uppercase ms-1">Таблица</div>
</PageTitle>

<Table
	tableTitle="Пользователи"
	{rows}
	grows={[3, 2, 2, 1, 2]}
	titles={['uid', 'имя', 'email', 'status', 'comment']}
	sorts={[true, true, true]}
/>
