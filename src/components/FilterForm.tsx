import getTranslate, { LangType } from "../translate/translation";

export default function FilterForm({ lang, path, filter, filesType }: { lang: LangType, path: string, filter: string, filesType: string }) {
	return <form method="get" className="search-form">
		<input type="hidden" name="path" value={path} />
		<input type="search" autoFocus id="filter-input" name="filter" defaultValue={filter} placeholder={`${getTranslate(lang, 'filter')}...`} className="search-input" />
		<br />
		<span className="fileTypeRadio">
			<label htmlFor="folders">{getTranslate(lang, 'folders')}</label>
			<input defaultChecked={filesType === 'folders'} type="radio" name="filesType" value="folders" id="folders" />
		</span>
		<span className="fileTypeRadio">
			<label htmlFor="files">{getTranslate(lang, 'files')}</label>
			<input defaultChecked={filesType === 'files'} type="radio" name="filesType" value="files" id="files" />
		</span>
		<span className="fileTypeRadio">
			<label htmlFor="any">{getTranslate(lang, 'any')}</label>
			<input defaultChecked={filesType === 'any'} type="radio" name="filesType" value="any" id="any" />
		</span>
		<button type="submit" className="search-button">{getTranslate(lang, 'apply')}</button>
	</form>
}