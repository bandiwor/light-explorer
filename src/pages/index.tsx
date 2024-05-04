import FileDetails from "../components/FileDetails";
import FolderDetails from "../components/FolderDetails";
import NotFound from "../components/NotFound";
import { LangType } from "../translate/translation";
import getFiles from "../utils/getFiles";

export default async function IndexPage(path: string, filter: string, filesType: string, sortBy: string, sortOrder: string, lang: LangType) {
	const [stats, files] = await getFiles(path);

	return <html lang={lang} dir="ltr">
		<head>
			<meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
			<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="stylesheet" href="/static/style.css" />
			<title>Explorer</title>
		</head>
		<body>
			{
				(files !== undefined && stats !== undefined) ? (
					<FolderDetails lang={lang} order={sortOrder} sortBy={sortBy} files={files} filesType={filesType} filter={filter} path={path} stats={stats} />
				) : stats ? (
					<FileDetails lang={lang} path={path} stats={stats} />
				) : <NotFound />
			}
		</body>
	</html >
}