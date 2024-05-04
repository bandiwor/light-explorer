import { Stats } from "fs";
import { lookup } from "mime-types";
import { dirname } from "path";
import getTranslate, { LangType } from "../translate/translation";
import StatsTable from "./StatsTable";

export default function FileDetails({ path, stats, lang }: { lang: LangType, path: string, stats: Stats }) {
	return <>
		<h1>{path}</h1>
		<a className="back-link" href={`?path=${dirname(path)}`}>{'<-' + getTranslate(lang, 'back')}</a>
		<center>
			<a style={{ marginRight: '1rem' }} href={`/preview?path=${path}`}>{getTranslate(lang, 'view')} {getTranslate(lang, 'file')}</a>
			<a href={`/download?path=${path}`}>{getTranslate(lang, 'download')} {getTranslate(lang, 'file')}</a>
		</center>
		<details open>
			<summary>{getTranslate(lang, 'statistic')}</summary>
			<StatsTable mime={lookup(path) || getTranslate(lang, 'file')} lang={lang} stats={stats} />
		</details>
	</>
}