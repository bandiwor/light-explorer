export default function SortArrows({ sortBy, filter, filesType, path }: { sortBy: string, filter: string, filesType: string, path: string }) {
	return <span>
		<a href={`?path=${path}&sortBy=${sortBy}&filter=${filter}&fileType=${filesType}&order=asc`} className="sort-arrow">↑</a>
		<a href={`?path=${path}&sortBy=${sortBy}&filter=${filter}&fileType=${filesType}&order=desc`} className="sort-arrow">↓</a>
	</span>
}