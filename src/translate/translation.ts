export type LangType = 'ru' | 'en';
type Phrase = 'directory' | 'filename' | 'filenames' | 'type' | 'statistic' | 'files'
	| 'file' | 'any' | 'apply' | 'filter' | 'view' | 'download' | 'settings'
	| 'theme' | 'back' | 'folder' | 'folders' | 'property' | 'value'
	| 'details';

export const DefaultLang = 'en' satisfies LangType;

const translate = {
	ru: {
		any: 'Любой',
		apply: 'Применить',
		directory: 'Директория',
		download: 'Скачать',
		file: 'Файл',
		filename: 'Имя файла',
		filenames: 'Имена файлов',
		files: 'Файлы',
		filter: 'Фильтр',
		settings: 'Настройки',
		statistic: 'Статистика',
		theme: 'Тема',
		type: 'Тип',
		view: 'Смотреть',
		back: 'Назад',
		folder: 'Папка',
		folders: 'Папки',
		property: 'Свойство',
		value: 'Значение',
		details: 'Подробности'
	},
	en: {
		any: 'Any',
		apply: 'Apply',
		directory: 'Directory',
		download: 'Download',
		file: 'File',
		filename: 'Filename',
		filenames: 'Filenames',
		files: 'Files',
		filter: 'Filter',
		settings: 'Settings',
		statistic: 'Statistic',
		theme: 'Theme',
		type: 'Type',
		view: 'View',
		back: 'Back',
		folder: 'Folder',
		folders: 'Folders',
		property: 'Property',
		value: 'Value',
		details: 'Details'
	}
} satisfies Record<LangType, Record<Phrase, string>>;


function getTranslate(lang: keyof typeof translate, phrase: keyof typeof translate[keyof typeof translate]) {
	return translate[lang][phrase];
}

export default getTranslate;
