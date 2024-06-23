import fs from "fs";
import nextConnect from "next-connect";
import multer from "multer";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const upload = multer({
  storage: multer.diskStorage({
    destination: "/tmp",
    filename: (req, file, cb) => cb(null, `tmp-${file.originalname}`),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Some error '${error}' happen` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});

const uploadMiddleware = upload.single("file");

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
  const filename = req.file.path;
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filename),
    model: "whisper-1",
    response_format: "text",
    language: "en",
  });
  res.send({ status: 200, error: null, out: transcription, file: req.file });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
