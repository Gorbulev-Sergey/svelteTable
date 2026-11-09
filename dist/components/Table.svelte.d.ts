interface IProps {
    title?: string;
    data: object[];
    titles?: string[];
    grows?: number[];
    _class?: {
        table?: string;
        header?: string;
        row?: string;
    };
    _style?: {
        table?: string;
        header?: string;
        row?: string;
    };
}
declare const Table: import("svelte").Component<IProps, {}, "data">;
type Table = ReturnType<typeof Table>;
export default Table;
