// pages/api/jobs.js
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db("jobportal");

  if (req.method === "GET") {
    try {
      if (id) {
        // If an id query is provided, return the specific job
        const job = await db
          .collection("jobs")
          .findOne({ _id: new ObjectId(id) });
        if (!job) {
          return res.status(404).json({ success: false, message: "Job not found" });
        }
        return res.status(200).json({ success: true, data: job });
      } else {
        // Return all jobs sorted by datePosted (most recent first)
        const jobs = await db
          .collection("jobs")
          .find({})
          .toArray();
        jobs.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
        return res.status(200).json({ success: true, data: jobs });
      }
    } catch (e) {
      res.status(500).json({ success: false, error: e.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
