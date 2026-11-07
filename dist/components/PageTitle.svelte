<script lang="ts">
	import { STORE } from '../scripts/store.svelte.ts';
	import { onDestroy, onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		STORE.pageTitle = children;
	});
	onDestroy(() => {
		STORE.pageTitle = null;
	});
</script>
