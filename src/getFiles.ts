import { Dirent, Stats } from "fs";
import { readdir, stat } from "fs/promises";

export default async function getFiles(path: string): Promise<[Stats, Dirent[]] | [Stats] | []> {
	try {
		const stats = await stat(path);
		if (stats.isFile()) {
			return [stats]
		} else if (stats.isDirectory()) {
			const dir = await readdir(path, { encoding: "utf8", withFileTypes: true });

			return [stats, dir];
		}
	} catch {
		return [];
	}

	return [];
}