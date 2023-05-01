import openai from "../../openAi";
import { ChatGPTRequestBody } from "../data/types";
import { generateRequestBody } from "../helpers";

export const createCompletion = (requestBody: ChatGPTRequestBody) =>
	openai.createChatCompletion(requestBody);

export const generateCards = (promptMessage: string) =>
	createCompletion(generateRequestBody(promptMessage));
