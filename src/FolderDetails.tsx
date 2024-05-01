import { Dirent, Stats } from "fs";
import { dirname } from "path";
import FilesTable from "./FilesTable";
import FilterForm from "./FilterForm";
import StatsTable from "./StatsTable";

export default function FolderDetails({ path, filesType, filter, stats, files, order, sortBy }: { sortBy: string, order: string, path: string, filter: string, filesType: string, stats: Stats, files: Dirent[] }) {
	return <>
		<FilterForm path={path} filter={filter} filesType={filesType} />
		<details>
			<summary>Stat info...</summary>
			<StatsTable stats={stats} />
		</details>
		<hr />
		<a href={`?path=${dirname(path)}`}>..</a>
		<FilesTable order={order} sortBy={sortBy} path={path} filesType={filesType} files={files} filter={filter} />
	</>
}