export type LangType = 'ru' | 'en';
type Phrase = 'directory' | 'filename' | 'filenames' | 'type' | 'statistic' | 'files'
	| 'file' | 'any' | 'apply' | 'filter' | 'view' | 'download' | 'settings'
	| 'theme' | 'back' | 'folder' | 'folders' | 'property' | 'value'
	| 'details' | 'is' | 'block-device' | 'socket' | 'symbol-link' | 'character-device'
	| 'FIFO' | 'birth' | 'create' | 'modify' | 'access' | 'milliseconds-short'
	| 'blocks' | 'size' | 'ino' | 'block' | 'filetype-mode' | 'dev' | 'nlink' | 'uid'
	| 'gid' | 'rdev' | 'time' | 'formatted';

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
		details: 'Подробности',
		"block-device": "Блочное устройство",
		"character-device": "Символьное устройство",
		"filetype-mode": "Тип файла и режим",
		"milliseconds-short": "мс",
		"symbol-link": "Символическая ссылка",
		access: "Доступ",
		birth: "Рождение",
		block: "Блок",
		blocks: "Блоки",
		create: "Создание",
		dev: "dev",
		FIFO: "FIFO",
		gid: "gid",
		ino: "ino",
		is: "Это",
		modify: "Изменение",
		nlink: "nlink",
		rdev: "rdev",
		size: "Размер",
		socket: "Сокет",
		uid: "UID",
		time: "Время",
		formatted: "Форматированный",
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
		details: 'Details',
		"block-device": "Block device",
		"character-device": "Character device",
		"filetype-mode": "Filetype&mode",
		"milliseconds-short": "ms",
		"symbol-link": "Symbol link",
		access: "Access",
		birth: "Birth",
		block: "Block",
		blocks: "Blocks",
		create: "Create",
		dev: "Dev",
		FIFO: "FIFO",
		gid: "Gid",
		ino: "Ino",
		is: "Is",
		modify: "Modify",
		nlink: "Nlink",
		rdev: "Rdev",
		size: "Size",
		socket: "Socket",
		uid: "Uid",
		time: "Time",
		formatted: "Formatted",
	}
} satisfies Record<LangType, Record<Phrase, string>>;


function getTranslate(lang: keyof typeof translate, phrase: keyof typeof translate[keyof typeof translate]) {
	return translate[lang][phrase];
}


export default getTranslate;
