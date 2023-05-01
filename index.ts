import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { generateCards } from "./src/requests";
import { generatePromptMessage } from "./src/helpers";

const app = express();
dotenv.config();
app.use(express.json());

var corsOptions = {
	origin: "http://localhost:5173",
	optionsSuccessStatus: 200,
	allowedHeaders: ["Content-Type"],
	methods: ["POST"],
	credentials: true,
};

const length = {
	LOW: "180",
	MEDIUM: "280",
	HIGH: "400",
};

app.options("/api/create", cors(corsOptions));
app.post(
	"/api/create",
	cors(corsOptions),
	async (req: Request, res: Response) => {
		const { numberOfCards, topic, difficulty, complexity } = req.body;

		try {
			const promptMessage = generatePromptMessage(
				numberOfCards,
				topic,
				difficulty,
				length[complexity]
			);
			const modelResponse = await generateCards(promptMessage);
			res.status(200).json(modelResponse.data.choices[0].message);
		} catch (e) {
			res
				.status(500)
				.json({ error: "Something went wrong, who knows what..." });
		}
	}
);

app.listen(process.env.PORT, () => {
	console.log(
		`Server is listening on port ${process.env.PORT}. So keep quiet!`
	);
});
