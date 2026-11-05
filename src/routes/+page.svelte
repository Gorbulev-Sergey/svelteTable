<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Table from '#lib/components/Table.svelte';
	import { createRawSnippet, type Snippet } from 'svelte';

	let button = (text: string) => {
		return createRawSnippet(() => {
			return {
				render: () => `<button class='badge bg-info bg-10'>${text}</button>`
			};
		});
	};

	let data = $derived([
		{
			uid: crypto.randomUUID(),
			name: 'Serge',
			email: 'sergify@rr.r',
			status: 'Вечер'
		},
		{
			uid: crypto.randomUUID(),
			name: 'Helen',
			email: 'helen@rr.r',
			status: 'go'
		},
		{
			uid: crypto.randomUUID(),
			name: 'Max',
			email: 'max@rr.r',
			status: button('Свистай всех на палубу')
		}
	]);
</script>

{#snippet status(text: string)}
	<button class="badge bg-info bg-10" onclick={() => {}}>{text}</button>
{/snippet}

<PageTitle>
	<i class="bi bi-chevron-right"></i>
	<div class="bg-2 px-2 py-1 fs-sm rounded-3 text-uppercase ms-1">Главная</div>
</PageTitle>

<Table title="Пользователи" {data} grows={[2, 1, 1, 1]} />
