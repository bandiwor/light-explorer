import FileDetails from "./FileDetails";
import FolderDetails from "./FolderDetails";
import NotFound from "./NotFound";
import getFiles from "./getFiles";

export default async function page(path: string, filter: string, filesType: string, sortBy: string, sortOrder: string) {
	const [stats, files] = await getFiles(path);

	return <html lang="ru" dir="ltr">
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
					<FolderDetails order={sortOrder} sortBy={sortBy} files={files} filesType={filesType} filter={filter} path={path} stats={stats} />
				) : stats ? (
					<FileDetails path={path} stats={stats} />
				) : <NotFound />
			}
		</body>
	</html >
}