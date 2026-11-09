import type { ITableFilter } from '../models/ITableFilter.ts';
interface IProps {
    data: any;
    grows: number[];
    filter: ITableFilter;
    onClickPrev?: (i: number) => void;
    onClickNext?: (i: number) => void;
    onChangeGrow?: (i: number, value: number) => void;
    onClickSort?: (i: number) => void;
    _class?: string;
    _style?: string;
}
declare const TableHeader: import("svelte").Component<IProps, {}, "data">;
type TableHeader = ReturnType<typeof TableHeader>;
export default TableHeader;
