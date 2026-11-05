export interface ICell {
	value: number | string;
	grow?: number;
	_class?: string | null;
	isSorted?: boolean;
}

export function Cell(
	value: number | string = '',
	grow: number = 0,
	_class?: string | null,
	isSorted: boolean = false
): ICell {
	return {
		value,
		grow,
		_class,
		isSorted
	};
}
