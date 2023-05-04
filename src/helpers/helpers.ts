import { ChatGPTRequestBody } from "../data/types";

export const MODEL = "gpt-3.5-turbo";
export const TEMPERATURE = 0;

// TODO: figure out why it ignores the input check
export const generatePromptMessage = (
	numberOfCards: string,
	topic: string,
	difficulty: string,
	length: string,
	tone?: string
) => `
	Prepare <${numberOfCards}> questions with their answers about <${topic}>. 
	The questions should be <${difficulty}> in difficulty and the answers should be <${length}> around charactes in length.
	The response should be in JSON format following this schema:
	{
		questions: [{question: string, answer: string}]
	}
`;

export const configRequestBodyGenerator =
	(model: string, temperature: number) =>
	(promptMessage: string): ChatGPTRequestBody => {
		return {
			model: model,
			temperature: temperature,
			messages: [{ role: "user", content: promptMessage }],
		};
	};

export const generateRequestBody = configRequestBodyGenerator(
	MODEL,
	TEMPERATURE
);
