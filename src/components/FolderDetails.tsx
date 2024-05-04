import { Dirent, Stats } from "fs";
import { dirname } from "path";
import getTranslate, { LangType } from "../translate/translation";
import FilesTable from "./FilesTable";
import FilterForm from "./FilterForm";
import StatsTable from "./StatsTable";

export default function FolderDetails({ lang, path, filesType, filter, stats, files, order, sortBy }: { sortBy: string, order: string, path: string, filter: string, filesType: string, stats: Stats, files: Dirent[], lang: LangType }) {
	return <>
		<FilterForm lang={lang} path={path} filter={filter} filesType={filesType} />
		<details>
			<summary>{getTranslate(lang, 'statistic')}</summary>
			<StatsTable lang={lang} stats={stats} />
		</details>
		<hr />
		<a className="back-link" href={`?path=${dirname(path)}`}>{`<-${getTranslate(lang, 'back')}`}</a>
		<FilesTable lang={lang} order={order} sortBy={sortBy} path={path} filesType={filesType} files={files} filter={filter} />
	</>
}