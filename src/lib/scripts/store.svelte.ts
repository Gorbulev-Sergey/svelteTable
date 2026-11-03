import type { Snippet } from 'svelte';

interface ISTORE {
	pageTitle: Snippet<[]> | null;
}

export let STORE: ISTORE = $state({
	pageTitle: null
});
