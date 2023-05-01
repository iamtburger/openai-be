export interface ChatGPTRequestBody {
	model: string;
	temperature: number;
	messages: [{ role: "user"; content: string }];
}
