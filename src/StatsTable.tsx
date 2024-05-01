import { Stats } from "fs"

export default function StatsTable({ stats }: { stats: Stats }) {
	const otherParameters = {
		isDirectory: String(stats.isDirectory()),
		isFile: String(stats.isFile()),
		isBlockDevice: String(stats.isBlockDevice()),
		isCharacterDevice: String(stats.isCharacterDevice()),
		isFIFO: String(stats.isFIFO()),
		isSocket: String(stats.isSocket()),
		isSymbolicLink: String(stats.isSymbolicLink()),
	}

	const parameters = {

	}

	return <table border={0} cellPadding={2} cellSpacing={10} style={{ width: '100%' }}>
		<thead>
			<tr>
				<th>Property</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			{Object.entries(stats).map(([key, value]) => (
				<tr key={key}>
					<td>
						{key}
					</td>
					<td>
						{JSON.stringify(value)}
					</td>
				</tr>
			))}
			{Object.entries(otherParameters).map(([key, value]) => (
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
