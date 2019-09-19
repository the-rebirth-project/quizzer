// A helper function to move around elements in an array (one dimensional)

// Not really performant but it serves our use case since the array will be less than 101 elements
export const arrayMove = (oldI: number, newI: number, array: any[]): any[] => {
	const backward = oldI > newI;
	const movedElem = array[oldI];

	if (backward) {
		const sortedArray = [
			...array.slice(0, newI),
			movedElem,
			...array.slice(newI, oldI),
			...array.slice(oldI + 1)
		];
		return sortedArray;
	} else {
		const sortedArray = [
			...array.slice(0, oldI),
			...array.slice(oldI + 1, newI + 1),
			movedElem,
			...array.slice(newI + 1)
		];
		return sortedArray;
	}
};
