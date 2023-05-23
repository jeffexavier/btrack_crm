import axios from "axios"
import { verifyToken } from "@/src/backend/utils/token.js";
import { getDateCollectTask } from "@/src/backend/services/sensedata/tasks.js";

export default async function getUsersSenseData(req, res) {
  const { limit, page, group } = req.query
  try {
    // verifyToken(req.cookies.authorization)
    await axios.get(process.env.SENSEDATA_API + "tasks",{
      params: {
        limit: limit,
        page: page,
        group: group
      },
      headers: {
        Authorization: `Bearer `+ process.env.SENSEDATA_TOKEN
      }
    })
    .then(response => {
        const tasksSenseData = response.data;
        const newTasksSenseData = getDateCollectTask(tasksSenseData.tasks, limit, page, tasksSenseData.next_page)
        // res.status(200).json(tasksSenseData.tasks);
        res.status(200).json(newTasksSenseData);
      })
  } catch (error) {
    res.status(400).json(error.message)
  }

}