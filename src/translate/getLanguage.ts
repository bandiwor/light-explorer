import { DefaultLang, LangType } from "./translation";

const languages: LangType[] = ['ru', 'en']

export default function getLanguage(languagesString: string): LangType {
	const splitted = languagesString.split(";").map(s => s.split(",")).flat();

	for (const language of splitted) {
		if (languages.includes(language as any)) {
			return language as LangType;
		}
	}

	return DefaultLang;
}