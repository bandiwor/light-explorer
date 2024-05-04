import { Dirent } from "fs";
import { lookup } from "mime-types";
import getTranslate, { LangType } from "../translate/translation";
import sortFiles from "../utils/sortFiles";
import SortArrows from './SortArrows';

type FilesTableProps = {
	path: string,
	files: Dirent[],
	filter: string,
	filesType: string,
	order: string,
	sortBy: string,
	lang: LangType
}

export default function FilesTable({ lang, files, filter, filesType, path, order, sortBy }: FilesTableProps) {
	if (sortBy) {
		sortFiles(files, sortBy, order);
	}

	const fileTranslate = getTranslate(lang, "file");
	const folderTranslate = getTranslate(lang, "folder");

	return <table border={0} cellPadding={2} cellSpacing={10} style={{ width: '100%' }} >
		<thead>
			<tr>
				<th>{getTranslate(lang, 'directory')}</th>
				<th>{getTranslate(lang, 'filename')} <SortArrows path={path} sortBy={"filename"} filesType={filesType} filter={filter} /></th>
				<th>{getTranslate(lang, 'type')} <SortArrows path={path} sortBy={"type"} filesType={filesType} filter={filter} /></th>
			</tr>
		</thead>
		<tbody>
			{files.map(file => {
				if (filter && !file.name.toLowerCase().includes(filter.toLowerCase())) {
					return null;
				}
				if (!(filesType === 'any' || (filesType === 'files' && file.isFile()) || (filesType === 'folders' && (file.isDirectory() || file.isSymbolicLink())))) {
					return null;
				}

				return (
					<tr key={file.name}>
						<td>{file.path}</td>
						<td>
							<a href={`?path=${file.path + '/' + file.name}`}>
								{file.name}
							</a>
						</td>
						<td>{file.isFile() ? lookup(file.name) || fileTranslate : folderTranslate}</td>
					</tr>
				)
			})}
		</tbody>
	</table>
}