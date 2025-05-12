import shortid from "shortid";
import URL from "../models/url.js";

export async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body || !body.url)
    return res.status(400).json({ status: false, message: "Url is requied" });

  const shortId = shortid();

  const result = await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res
    .status(201)
    .json({ status: true, message: "Short url created", data: result });
}

export async function handleGetURLAndUpdateHistory(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  return res
    .status(200)
    .redirect(entry.redirectUrl)
    .json({ status: true, message: "Url retrived successfully", data: entry });
}

export async function handleAllGetURL(req, res) {
  const urls = await URL.find({});

  return res
    .status(200)
    .json({ status: true, message: "Urls retrived successfully", data: urls });
}
