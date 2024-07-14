import User from "../models/user-model.js";

// Define a custom dataset of messages and responses
const customDataset = [
    {
        message: "Hello",
        response: "Hi there!",
    },
    {
        message: "How are you?",
        response: "I'm good, thank you!",
    },
    // Add more custom messages and responses as needed
];

// Handler function to generate chat completions
export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message, predict } = req.body;
        console.log(predict);

        // Fetch the user's data
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json("User not registered / token malfunctioned");
        }

        // Add the user's message to the chat history
        user.chats.push({ content: message, role: "user" });

        // Find a response for the user's message in the custom dataset
        const foundResponse = customDataset.find(data => data.message.toLowerCase() === message.toLowerCase());
        const botResponse = foundResponse ? foundResponse.response : "I'm sorry, I don't understand that.";

        const predictResponse = predict;

        // Add the bot's response to the chat history
        user.chats.push({ content: predictResponse, role: "assistant" });

        // Save the updated chat history to the database
        await user.save();

        // Return the updated chat history as response
        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }

    // try {
    //     const { message} = req.body;

    //     // Fetch the user's data
    //     const user = await User.findById(res.locals.jwtData.id);
    //     if (!user) {
    //         return res.status(401).json("User not registered / token malfunctioned");
    //     }

    //     // Add the user's message to the chat history
    //     user.chats.push({ content: message, role: "user" });

    //     // Find a response for the user's message in the custom dataset
    //     const foundResponse = customDataset.find(data => data.message.toLowerCase() === message.toLowerCase());
    //     const botResponse = foundResponse ? foundResponse.response : "I'm sorry, I don't understand that.";

    //     // Add the bot's response to the chat history
    //     user.chats.push({ content: botResponse, role: "assistant" });

    //     // Save the updated chat history to the database
    //     await user.save();

    //     // Return the updated chat history as response
    //     return res.status(200).json({ chats: user.chats });
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({ message: error.message });
    // }
};

export const getAllChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id); // get variable stored in previous middleware
        if (!user)
            return res.status(401).json({
                message: "ERROR",
                cause: "User doesn't exist or token malfunctioned",
            });
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res
                .status(401)
                .json({ message: "ERROR", cause: "Permissions didn't match" });
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({ message: "ERROR", cause: err.message });
    }
};
export const deleteAllChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id); // get variable stored in previous middleware
        if (!user)
            return res.status(401).json({
                message: "ERROR",
                cause: "User doesn't exist or token malfunctioned",
            });
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res
                .status(401)
                .json({ message: "ERROR", cause: "Permissions didn't match" });
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({ message: "ERROR", cause: err.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map