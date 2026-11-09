interface IProps {
    data: object;
    grows: number[];
    _class?: string;
    _style?: string;
}
declare const TableRow: import("svelte").Component<IProps, {}, "data">;
type TableRow = ReturnType<typeof TableRow>;
export default TableRow;
