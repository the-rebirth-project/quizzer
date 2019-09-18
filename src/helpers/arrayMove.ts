// A helper function to move around elements in an array (one dimensional)

// Not really performant but it serves our use case since the array will be less than 101 elements
export const arrayMove = (oldI: number, newI: number, array: any[]): any[] => {
	const forward = newI > oldI;
	const backward = oldI > newI;

	// forward sorting is broken. pls fix (elem to be sorted for eg does not appear at last index like it shld)
	if (forward) {
		const sortedArray = [
			...array.slice(0, oldI),
			...array.slice(oldI + 1, newI),
			array[oldI],
			...array.slice(newI)
		];
		return sortedArray;
	} else if (backward) {
		const sortedArray = [
			...array.slice(0, newI),
			array[oldI],
			...array.slice(newI, oldI),
			...array.slice(oldI + 1)
		];
		return sortedArray;
	}
	// by default, return the initial array
	return array;
};
// [2, 3, 4, 5, 1]
// [1, 2, 3, 4, 5]
// [1, 3, 2, 4, 5]
