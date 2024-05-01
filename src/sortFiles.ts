import { Dirent } from "fs";
import { lookup } from "mime-types";

export default function sortFiles(files: Dirent[], sortBy: string, order: string): void {
	const fileTypes = new Map<string, string>();
	files.forEach(file => {
		const type = lookup(file.name) || 'file';
		fileTypes.set(file.name, type);
	});

	function compareFiles(a: Dirent, b: Dirent): number {
		const isADirectory = a.isDirectory();
		const isBDirectory = b.isDirectory();

		if (isADirectory && !isBDirectory) {
			return order === 'asc' ? -1 : 1;
		} else if (!isADirectory && isBDirectory) {
			return order === 'asc' ? 1 : -1;
		} else {
			if (sortBy === 'filename') {
				return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
			} else { // sortBy === 'type'
				const typeA = fileTypes.get(a.name) || 'file';
				const typeB = fileTypes.get(b.name) || 'file';
				if (typeA === typeB) {
					return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
				} else {
					return order === 'asc' ? typeA.localeCompare(typeB) : typeB.localeCompare(typeA);
				}
			}
		}
	}

	files.sort(compareFiles);
}