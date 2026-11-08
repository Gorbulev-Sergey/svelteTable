import type { Snippet } from 'svelte';

interface ISTORE {
	pageTitle: Snippet<[]> | null;
	data: any[];
}

export let STORE: ISTORE = $state({
	pageTitle: null,
	data: [
		{
			uid: crypto.randomUUID(),
			name: 'Max',
			email: 'max@rr.r',
			status: 'ok'
		},
		{
			uid: crypto.randomUUID(),
			name: 'Serge',
			email: 'sergify@rr.r',
			status: 'ok'
		},
		{
			uid: crypto.randomUUID(),
			name: 'Helen',
			email: 'helen@rr.r',
			status: 'ok'
		}
	]
});
