<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Table from '#lib/components/Table.svelte';

	let data = $state([
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
			status: value
		},
		{
			uid: crypto.randomUUID(),
			name: 'Max',
			email: 'max@rr.r',
			status: value
		}
	]);
</script>

{#snippet value(status: { name: string })}
	<button class="btn btn-xs bg-primary bg-10 rounded-3" onclick={() => {}}>{status.name}</button>
{/snippet}

<PageTitle>
	<i class="bi bi-chevron-right"></i>
	<div class="bg-2 px-2 py-1 fs-sm rounded-3 text-uppercase ms-1">Главная</div>
</PageTitle>

<Table title="Пользователи" {data} grows={[2, 1, 1, 1]} />
