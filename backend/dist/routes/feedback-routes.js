import express from "express";
import { saveFeedback, getStats } from "../controllers/feedback-controllers.js";
import { getUsers } from "../controllers/feedback-controllers.js";

const feedbackRoutes = express.Router();
// test
feedbackRoutes.get("/", (req, res, next) => {
    console.log("hi");
    res.send("hello from feedbackRoutes");
});
// protected API
feedbackRoutes.post("/new",  saveFeedback);
feedbackRoutes.get("/stats",  getStats);
feedbackRoutes.get("/users",  getUsers);
// chatRoutes.get("/all-chats", verifyToken, getAllChats);
// chatRoutes.delete("/delete-all-chats", verifyToken, deleteAllChats);
export default feedbackRoutes;
//# sourceMappingURL=chat-routes.js.map