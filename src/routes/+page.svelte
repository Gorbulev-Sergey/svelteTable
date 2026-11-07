<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Table from '#lib/components/Table.svelte';

	let data = $state([
		{
			uid: 'https://lh3.googleusercontent.com/a/ACg8ocKuJt_jdEOr4Gm3OwIrtc_bWzRZ3pxO43AkvUlH1iIwLksKEI7M=s96-c',
			name: 'Serge',
			email: 'sergify@rr.r',
			status: snippetBlock
		},
		{
			uid: crypto.randomUUID(),
			name: 'Helen',
			email: 'helen@rr.r',
			status: snippetBlock
		},
		{
			uid: crypto.randomUUID(),
			name: 'Max',
			email: 'max@rr.r',
			status: snippetBlock
		}
	]);
</script>

<!-- Мы берём значения из data, которую мы передаём в качестве параметра в <Table> -->
{#snippet snippetBlock(d: { name: string })}
	<button class="btn btn-xs bg-primary bg-10 rounded-3" onclick={() => alert(d.name)}
		>{d.name}</button
	>
{/snippet}

<PageTitle>
	<i class="bi bi-chevron-right"></i>
	<div class="bg-2 px-2 py-1 fs-sm rounded-3 text-uppercase ms-1">Главная</div>
</PageTitle>

<Table title="Пользователи" {data} grows={[2, 1, 1, 1]} />
