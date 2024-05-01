import { Dirent } from "fs";
import { lookup } from "mime-types";
import SortArrows from './SortArrows';
import sortFiles from "./sortFiles";

type FilesTableProps = {
	path: string,
	files: Dirent[],
	filter: string,
	filesType: string,
	order: string,
	sortBy: string
}

export default function FilesTable({ files, filter, filesType, path, order, sortBy }: FilesTableProps) {
	if (sortBy) {
		sortFiles(files, sortBy, order);
	}

	return <table border={0} cellPadding={2} cellSpacing={10} style={{ width: '100%' }} >
		<thead>
			<tr>
				<th>Directory</th>
				<th>Filename <SortArrows path={path} sortBy={"filename"} filesType={filesType} filter={filter} /></th>
				<th>Type <SortArrows path={path} sortBy={"type"} filesType={filesType} filter={filter} /></th>
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
						<td>{file.isFile() ? lookup(file.name) || 'File' : 'Directory'}</td>
					</tr>
				)
			})}
		</tbody>
	</table>
}