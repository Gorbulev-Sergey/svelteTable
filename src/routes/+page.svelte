<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import Table from '#lib/components/Table.svelte';
	import { getData } from '#lib/remotes/data.remote.ts';
	import { refreshAll } from '$app/navigation';
	import { editData } from '../lib/remotes/data.remote';

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
			name: 'Serge',
			email: 'sergify@rr.r',
			status: 'ok',
			picture: {
				snippet: pictureSnippet,
				url: 'https://yandex-images.clstorage.net/fsDt95448/abafaakjR2H7/KvdUIEWh2QxKy7AuIG8lit3AEhgAGSSRCRF4TkL3KJwANYBUHnKAQ1_RST4WoNb7MwXGbKmXigHSuLN5AoIF_i6ScGWh0dldDnsU74CuJN4cFCNMIYlk5JnRfi2VtQ-_x_PnxgmFZOZOAAh45WGEr5Zx4bu_YlxEV_kQj7UW8nu5NgWw4EHbfY5pY36iv7Y_TKHCX_Gv9pHutD9f54Yuz0QSV8Q5hrbV-7KLWFfnd2xUwtJLDzBPR6eoI69VJDG5CYV3sPGimn8cexJeEW4FPR-ygA5hLJaBjuXNr1bVjD63YJWlK9c0dRhD2Wnn5WaO9mDRO37z3HXVadE_JxVCeall5EBjsgkO3apznlEOJKzf41PcI86mI462XxyE9y4fJKKHFUn1xVRIImt4RvfGr-WD8_kMs-8m1yoxPySl0OhapjXA8RBLH_0JY07RjNWNL7MgbCO_toO8JX_PRycuPKUyBYRKBWZWyUCoKkXXNM5mg5KJDgCvN-e5A95HVHPLySXlsFOxSfx-uUAuEP-EPl9B031iDFWQbZV9H0QHXIyH8pRnWibl98rRuCg0ZcfsNqKxGn5xb_Z0WSCsVOdBGcoV9dIB8Kl9_TrwDmIPt60fgPNvom71QG5W_o5HVw7_JZP1ZPpnd1SbojsZtBXm_bQxAzlug9521egxDRaHUElJNlfxkwEYX1-48zwjHyecrHLgLDCsp6J8BJyshWcsjpXRx_XZVCWWCqM6W2UFNbxEovIpzwOvxucKw9_lxjD7e9WkYNLASA1NuGLO0Ow1LH2Cw-4incZyLPfMTeS1PB2WUhQmWUc0JqoRiLpVtvS-BEKyGT8g31RW68Mcl_UziKjFFjHicYgNrItBXNM8R21PccAscl400g50bQyUJa0ul5L09FlXBjSJ8Dk7dGSUjebDA5kPMe_HtWvg3Va0IAq7FxeRMiNI71y6EN_gPSV-_jISTAMsBRMulD79E',
				title: 'Привет'
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

	let data1 = $derived(Object.values(data));
	let data2 = $derived(data1.map((v) => Object.values(v)));

	let dataState = $derived(
		(await getData()).map((d) => {
			return {
				...d,
				picture: {
					snippet: pictureSnippet,
					url: 'https://avatars.mds.yandex.net/i?id=70ac3804623c28aefe512774776838b4_l-16338923-images-thumbs&n=13',
					title: 'Привет'
				}
			};
		})
	);
</script>

<!-- Мы берём значения из data, которую мы передаём в качестве параметра в <Table> -->
{#snippet pictureSnippet(obj: { picture: { url?: string; title?: string } })}
	<div
		class="d-flex flex-column align-items-start justify-content-start gap-1 rounded-3 overflow-hidden"
	>
		<button
			class="btn btn-xs rounded-3"
			onclick={async () => {
				await editData({ i: 0, key: 'name', value: 'Суслик' });
				await refreshAll();
			}}
		>
			{obj.picture.title}
		</button>
		<img class="img-fluid rounded-3" src={obj.picture.url} alt={obj.picture.title} />
	</div>
{/snippet}

<PageTitle>
	<i class="bi bi-chevron-right"></i>
	<div class="bg-2 px-2 py-1 fs-sm rounded-3 text-uppercase ms-1">Главная</div>
</PageTitle>

<Table title="Пользователи" data={dataState} />

<div class="d-flex flex-column gap-1">
	{#each data1 as row}
		<div>{row.name}</div>
	{/each}
</div>
