import compression from "compression";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import { createReadStream } from "fs";
import { stat } from "fs/promises";
import { lookup } from "mime-types";
import { basename, dirname, join } from "path";
import { renderToString } from "react-dom/server";
import IndexPage from "./pages";
import PreviewPage from "./pages/preview";
import getLanguage from "./translate/getLanguage";

const host = 'localhost';
const port = 3000;


const app = express();
app.use(compression())
app.use('/static', express.static(join(dirname(__dirname), 'public'), {
	etag: true,
	lastModified: true,
	cacheControl: true,
}));
app.use(cookieParser())

app.get("/", async (req: Request, res: Response) => {
	res.setHeader("Content-Type", "text/html");
	res.status(200);

	const language = req.cookies.language || getLanguage(req.headers["accept-language"] || '');

	const path = String(req.query?.path ?? '');
	const filter = String(req.query?.filter ?? '');
	const fileTypes = String(req.query?.filesType ?? 'any');
	const sortBy = String(req.query?.sortBy ?? '');
	const sortOrder = String(req.query?.order ?? 'asc');
	const html = renderToString(await IndexPage(path, filter, fileTypes, sortBy, sortOrder, language));

	res.setHeader("Content-Length", html.length);

	res.end(html);
})

app.get("/preview", async (req: Request, res: Response) => {
	res.setHeader("Content-Type", "text/html");
	res.status(200);

	const path = String(req.query?.path ?? '');

	try {
		const fileStat = await stat(path);
		if (!fileStat.isFile()) {
			return res.status(400).end();
		}
		const language = req.cookies.language || getLanguage(req.headers["accept-language"] || '');

		const html = renderToString(await PreviewPage(path, language));
		res.setHeader("Content-Length", html.length);
		res.end(html);
	} catch {
		res.status(400).end();
	}
})

app.get("/view", async (req: Request, res: Response) => {
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

app.get('/download', async (req: Request, res: Response) => {
	try {
		const filePath = String(req.query.path ?? "");
		const mimeType = lookup(filePath);
		const fileStat = await stat(filePath);

		if (!filePath || !fileStat.isFile()) {
			return res.status(400).end();
		}
		res.setHeader('Content-Disposition', `attachment; filename=${basename(filePath)}`);
		res.setHeader('Content-Type', mimeType || 'application/octet-stream');
		res.setHeader('Content-Length', fileStat.size);

		const fileStream = createReadStream(filePath);
		fileStream.pipe(res);
	} catch {
		return res.status(400).end();
	}
})

app.listen(port, host, () => {
	console.log(`Server started at: ${host}:${port}`);
})
