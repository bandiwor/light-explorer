import compression from "compression";
import express, { Request, Response } from "express";
import { createReadStream } from "fs";
import { stat } from "fs/promises";
import { lookup } from "mime-types";
import { dirname, join } from "path";
import { renderToString } from "react-dom/server";
import page from "./page";

const host = 'localhost';
const port = 3000;


const app = express();
app.use(compression())
app.use('/static', express.static(join(dirname(__dirname), 'public'), {
	etag: true,
	lastModified: true,
	cacheControl: true,
}));

app.get("/", async (req: Request, res: Response) => {
	res.setHeader("Content-Type", "text/html");
	res.status(200);

	const path = String(req.query?.path ?? '');
	const filter = String(req.query?.filter ?? '');
	const fileTypes = String(req.query?.filesType ?? 'any');
	const sortBy = String(req.query?.sortBy ?? '');
	const sortOrder = String(req.query?.order ?? 'asc');

	const html = renderToString(await page(path, filter, fileTypes, sortBy, sortOrder));

	res.setHeader("Content-Length", html.length);

	res.end(html);
})

app.get("/preview", async (req: Request, res: Response) => {
	try {
		const file = String(req.query?.path ?? "");
		const fileStat = await stat(file);
		if (!fileStat.isFile()) {
			return res.status(400).end();
		}

		res.setHeader("Content-Length", fileStat.size);
		res.setHeader("Content-Type", lookup(file) || 'application/octet-stream');
		res.setHeader("Content-Disposition", "inline");

		const fileStream = createReadStream(file);
		fileStream.pipe(res);
	} catch {
		return res.status(404).end();
	}
})

app.listen(port, host, () => {
	console.log(`Server started at: ${host}:${port}`);
})
