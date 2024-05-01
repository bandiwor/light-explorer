export default function FilterForm({ path, filter, filesType }: { path: string, filter: string, filesType: string }) {
	return <form method="get" className="search-form">
		<input type="hidden" name="path" value={path} />
		<input type="search" name="filter" defaultValue={filter} placeholder="Filter..." className="search-input" />
		<br />
		<span className="fileTypeRadio">
			<label htmlFor="folders">Folders</label>
			<input defaultChecked={filesType === 'folders'} type="radio" name="filesType" value="folders" id="folders" />
		</span>
		<span className="fileTypeRadio">
			<label htmlFor="files">Files</label>
			<input defaultChecked={filesType === 'files'} type="radio" name="filesType" value="files" id="files" />
		</span>
		<span className="fileTypeRadio">
			<label htmlFor="any">Any</label>
			<input defaultChecked={filesType === 'any'} type="radio" name="filesType" value="any" id="any" />
		</span>
		<button type="submit" className="search-button">Apply</button>
	</form>
}