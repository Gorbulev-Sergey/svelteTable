<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Table from '#lib/components/Table.svelte';
	import { toast, Toaster } from '@gorbulevsv/toaster';

	let data = $state([
		{
			uid: crypto.randomUUID(),
			name: 'Serge',
			email: 'sergify@rr.r',
			status: block
		},
		{
			uid: crypto.randomUUID(),
			name: 'Helen',
			email: 'helen@rr.r',
			status: block
		},
		{
			uid: crypto.randomUUID(),
			name: 'Max',
			email: 'max@rr.r',
			status: block
		}
	]);
</script>

{#snippet block(object: { name: string })}
	<button
		class="btn btn-xs bg-primary bg-10 rounded-3"
		onclick={() => {
			toast({
				title: 'Сообщение',
				content: `Кнопка от <b>${object.name}</b> нажата`,
				shadow: 'shadow-sm',
				bg: 'body',
				opacity: '20'
			});
		}}>{object.name}</button
	>
{/snippet}

<PageTitle>
	<i class="bi bi-chevron-right"></i>
	<div class="bg-2 px-2 py-1 fs-sm rounded-3 text-uppercase ms-1">Главная</div>
</PageTitle>

<Table title="Пользователи" {data} grows={[2, 1, 1, 1]} />

<Toaster />
