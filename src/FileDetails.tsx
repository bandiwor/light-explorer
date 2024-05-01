import { Stats } from "fs";
import { dirname } from "path";
import StatsTable from "./StatsTable";

export default function FileDetails({ path, stats }: { path: string, stats: Stats }) {
	return <>
		<h1>{path}</h1>
		<a href={`?path=${dirname(path)}`}>..</a>
		<details>
			<summary>Show details...</summary>
			<StatsTable stats={stats} />
		</details>
		<iframe src={`/preview?path=${path}`} style={{ width: '100%', height: '100vh', marginTop: '5vh' }}>
		</iframe>
	</>
}