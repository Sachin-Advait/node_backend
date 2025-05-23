import shortid from "shortid";
import URL from "../models/url.js";

export async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body || !body.url)
    return res.status(400).json({ status: false, message: "Url is requied" });

  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  // return res
  //   .status(201)
  //   .json({ status: true, message: "Short url created", data: result });
  return res.render("home", {
    id: shortID,
  });
}

export async function handleGetURLAndUpdateHistory(req, res) {

  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
      // createdBy: req.user._id,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).json({ message: 'Short URL not found or not authorized' });
  }

  return res.status(200).redirect(entry.redirectUrl);
}

export async function handleAllGetURL(req, res) {
  const urls = await URL.find({});

  return res.status(200).json({ status: true, message: "Urls retrived successfully", data: urls });
}
