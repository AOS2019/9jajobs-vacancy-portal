// pages/api/postJob.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("jobportal");
      const job = req.body;
      const result = await db.collection("jobs").insertOne(job);
      res.status(201).json({ success: true, data: job });
    } catch (e) {
      res.status(500).json({ success: false, error: e.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
