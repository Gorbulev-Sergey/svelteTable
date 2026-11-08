import { STORE } from '#lib/scripts/store.svelte.ts';
import { command, query } from '$app/server';
import * as v from 'valibot';

export const getData = query(async () => {
	return STORE.data;
});

export const editData = command(
	v.object({ i: v.number(), key: v.string(), value: v.string() }),
	async (row) => {
		STORE.data[row.i][row.key] = row.value;
	}
);
