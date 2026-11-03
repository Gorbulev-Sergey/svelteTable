<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import { STORE } from '#lib/scripts/store.svelte.ts';
	import type { LayoutProps } from './$types';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';

	function toggleTheme() {
		let theme = document.querySelector('[data-bs-theme]');
		theme?.setAttribute(
			'data-bs-theme',
			theme.getAttribute('data-bs-theme') == 'light' ? 'dark' : 'light'
		);
	}

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="sticky-top w-100">
	<div
		class="d-flex align-items-center gap-1 px-4 py-2 bg-2 bg-70"
		style="backdrop-filter: blur(.7em);"
	>
		<div class="d-flex align-items-center gap-1">
			<a class="btn btn-sm bg-transparent border-0 rounded-3" href="/">Svelte <b>Table</b></a>
			{#if STORE.pageTitle}
				{@render STORE.pageTitle?.()}
			{/if}
		</div>
		<div class="flex-grow-1 d-flex align-self-center justify-content-end gap-1">
			<button title="Тема" class="btn btn-sm rounded-3" onclick={toggleTheme}>
				<i class="bi bi-sun"></i>
			</button>
			<div class="d-flex align-items-center gap-1">
				<a class="btn btn-sm rounded-3" href="/">Главная</a>
				<a class="btn btn-sm rounded-3" href="/row">Строка</a>
			</div>
		</div>
	</div>
</div>
<div class="container my-8">
	{@render children()}
</div>

<style>
	:global(:root) {
		--bs-bg-body: light-dark(var(--bs-white), var(--bs-pewter-800));
		--bs-bg-2: light-dark(var(--bs-gray-050), var(--bs-pewter-700));
	}
</style>
