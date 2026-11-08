<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Table from '#lib/components/Table.svelte';

	let data = $state([
		{
			uid: crypto.randomUUID(),
			name: 'Max',
			email: 'max@rr.r',
			status: 'ok',
			picture: {
				snippet: pictureSnippet,
				url: 'https://avatars.mds.yandex.net/i?id=70ac3804623c28aefe512774776838b4_l-16338923-images-thumbs&n=13',
				title: 'Воскресенье'
			}
		},
		{
			uid: crypto.randomUUID(),
			name: 'Helen',
			email: 'helen@rr.r',
			status: 'ok',
			picture: {
				snippet: pictureSnippet,
				url: 'https://avatars.mds.yandex.net/i?id=dbb82f339bab80491528cf7c02428ee4_l-10752576-images-thumbs&n=13',
				title: 'Как дела'
			}
		}
	]);
</script>

<!-- Мы берём значения из data, которую мы передаём в качестве параметра в <Table> -->
{#snippet pictureSnippet(obj: { picture: { url?: string; title?: string } })}
	<div class="d-flex flex-column gap-1 rounded-3 overflow-hidden">
		<div>{obj.picture.title}</div>
		<img class="img-fluid rounded-3" src={obj.picture.url} alt={obj.picture.title} />
	</div>
{/snippet}

<PageTitle>
	<i class="bi bi-chevron-right"></i>
	<div class="bg-2 px-2 py-1 fs-sm rounded-3 text-uppercase ms-1">Главная</div>
</PageTitle>

<Table title="Пользователи" {data} />
