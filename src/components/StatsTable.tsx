import { Stats } from "fs";
import getTranslate, { LangType } from "../translate/translation";

function formatSize(size: number) {
	if (size < 1024) {
		return `${size}B`;
	}
	if (size < 1024 * 768) {
		return `${(size / 1024).toFixed(2)}Kb`;
	}
	return `${(size / 1024 / 1024).toFixed(2)}Mb`
}

export default function StatsTable({ stats, lang, mime }: { stats: Stats, lang: LangType, mime?: string }) {
	const timeTranslate = getTranslate(lang, "time");
	const msTranslate = " " + getTranslate(lang, "milliseconds-short");

	const parameters = {
		[mime ? 'mime' : '']: mime,
		[getTranslate(lang, "formatted") + " " + getTranslate(lang, "size")]: formatSize(stats.size),
		[getTranslate(lang, "dev")]: stats.dev,
		[getTranslate(lang, "filetype-mode")]: stats.mode,
		[getTranslate(lang, "nlink")]: stats.nlink,
		[getTranslate(lang, "uid")]: stats.uid,
		[getTranslate(lang, "gid")]: stats.gid,
		[getTranslate(lang, "rdev")]: stats.rdev,
		[getTranslate(lang, "block") + " " + getTranslate(lang, "size")]: stats.blksize,
		[getTranslate(lang, "blocks")]: stats.blocks,
		[getTranslate(lang, "ino")]: stats.ino,
		[getTranslate(lang, "size")]: stats.size,
		[timeTranslate + " " + getTranslate(lang, "access") + msTranslate]: stats.atimeMs,
		[timeTranslate + " " + getTranslate(lang, "modify") + msTranslate]: stats.mtimeMs,
		[timeTranslate + " " + getTranslate(lang, "create") + msTranslate]: stats.ctimeMs,
		[timeTranslate + " " + getTranslate(lang, "birth") + msTranslate]: stats.birthtimeMs,
		[timeTranslate + " " + getTranslate(lang, "access")]: stats.atime,
		[timeTranslate + " " + getTranslate(lang, "modify")]: stats.mtime,
		[timeTranslate + " " + getTranslate(lang, "create")]: stats.ctime,
		[timeTranslate + " " + getTranslate(lang, "birth")]: stats.birthtime,
		[getTranslate(lang, "is") + " " + getTranslate(lang, "directory")]: String(stats.isDirectory()),
		[getTranslate(lang, "is") + " " + getTranslate(lang, "file")]: String(stats.isFile()),
		[getTranslate(lang, "is") + " " + getTranslate(lang, "block-device")]: String(stats.isBlockDevice()),
		[getTranslate(lang, "is") + " " + getTranslate(lang, "character-device")]: String(stats.isCharacterDevice()),
		[getTranslate(lang, "is") + " " + getTranslate(lang, "FIFO")]: String(stats.isFIFO()),
		[getTranslate(lang, "is") + " " + getTranslate(lang, "socket")]: String(stats.isSocket()),
		[getTranslate(lang, "is") + " " + getTranslate(lang, "symbol-link")]: String(stats.isSymbolicLink()),
	}

	return <table border={0} cellPadding={2} cellSpacing={10} style={{ width: '100%' }}>
		<thead>
			<tr>
				<th>{getTranslate(lang, 'property')}</th>
				<th>{getTranslate(lang, 'value')}</th>
			</tr>
		</thead>
		<tbody>
			{Object.entries(parameters).map(([key, value]) => (
				<tr key={key}>
					<td>
						{key}
					</td>
					<td>
						{JSON.stringify(value)}
					</td>
				</tr>
			))}
		</tbody>
	</table>
}
