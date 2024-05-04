import { dirname } from "path";
import getTranslate, { LangType } from "../translate/translation";

export default async function PreviewPage(path: string, lang: LangType) {
	return <html lang={lang}>
		<head>
			<meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
			<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="stylesheet" href="/static/style.css" />
			<title>Explorer</title>
		</head>
		<body>
			<center><h1>{path}</h1></center>

			<a className="back-link" href={`/?path=${path}`}>{getTranslate(lang, 'back')}</a>
			<a className="back-link" href={`/?path=${dirname(path)}`}>{getTranslate(lang, 'directory')}</a>

			<iframe src={`/view?path=${path}`} style={{ width: '100%', height: '100vh' }} />
		</body>
	</html>
}