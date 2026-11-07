import { query } from '$app/server';
export const getData = query(async () => {
    return [
        {
            uid: crypto.randomUUID(),
            name: 'Serge',
            email: 'sergify@rr.r',
            status: "<div class='badge bg-info bg-20'>start</div>"
        },
        {
            uid: crypto.randomUUID(),
            name: 'Helen',
            email: 'helen@rr.r',
            status: 'go'
        },
        {
            uid: crypto.randomUUID(),
            name: 'Max',
            email: 'max@rr.r',
            status: 'go'
        }
    ];
});
