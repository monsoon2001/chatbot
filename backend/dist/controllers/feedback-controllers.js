import express from 'express';
import User from "../models/user-model.js";

const router = express.Router();

// Dummy data for users
const dummyUsers = [
    {
        _id: '1',
        name: 'Monsoon Parajuli',
        email: 'john.doe@example.com',
        chats: [{}, {}, {}], // 3 chats
        feedback: [{}, {}, {}, {}], // 4 feedbacks
    },
    {
        _id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        chats: [{}], // 1 chat
        feedback: [{}, {}], // 2 feedbacks
    },
];

// Dummy data for feedback stats
const dummyFeedbackStats = {
    ratings: {
        '1 Star': 10,
        '2 Stars': 20,
        '3 Stars': 30,
        '4 Stars': 25,
        '5 Stars': 15,
    },
    sentiments: {
        Positive: 60,
        Negative: 25,
        Neutral: 15,
    },
};

export const saveFeedback = async (req, res, next) => {
    try {
        const { comment, sentiment, rating, email } = req.body;
        console.log(comment, sentiment, rating, email);
        // Fetch the user's data
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json("User not registered / token malfunctioned");
        }

        // Check if there's existing feedback and update it
        const existingFeedback = user.feedback.find(
            feedback => feedback.comment === comment && feedback.sentiment === sentiment
        );

        if (existingFeedback) {
            // Update the existing feedback
            existingFeedback.rating = rating;
        } else {
            // Add new feedback if it doesn't exist
            user.feedback.push({ comment, sentiment, rating });
        }

        // Save the updated chat history to the database
        await user.save();

        // Return the updated chat history as response
        return res.status(200).json({ feedback: user.feedback });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// export const getUsers = async (req, res) => {
//     try {
//         // Simulating fetching users from the database
//         res.status(200).json(dummyUsers);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// };

export const getUsers = async (req, res) => {
  try {
      // Fetch users from the database, excluding the password field
      const users = await User.find({}, 'name email chats feedback -_id');
      res.status(200).json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// export const getStats = async (req, res) => {
//     try {
//         // Simulating fetching feedback statistics from the database
//         res.status(200).json(dummyFeedbackStats);
//     } catch (error) {
//         console.error('Error fetching feedback statistics:', error);
//         res.status(500).json({ error: 'Failed to fetch feedback statistics' });
//     }
// };

// export const getStats = async (req, res) => {
//   try {
//       // Fetch all users and extract feedbacks for aggregation
//       const users = await User.find({}, 'feedback -_id');
//       const allFeedbacks = [];
//       users.forEach((user) => {
//           allFeedbacks.push(...user.feedback);
//       });

//       // Initialize rating stats
//       const ratingStats = {
//           '1 Star': 0,
//           '2 Stars': 0,
//           '3 Stars': 0,
//           '4 Stars': 0,
//           '5 Stars': 0,
//       };

//       // Initialize sentiment stats
//       const sentimentStats = {
//           Positive: 0,
//           Negative: 0,
//           Neutral: 0,
//       };

//       // Aggregate feedback statistics
//       allFeedbacks.forEach(feedback => {
//           // Increment rating counts
//           if (feedback.rating === 1) ratingStats['1 Star']++;
//           if (feedback.rating === 2) ratingStats['2 Stars']++;
//           if (feedback.rating === 3) ratingStats['3 Stars']++;
//           if (feedback.rating === 4) ratingStats['4 Stars']++;
//           if (feedback.rating === 5) ratingStats['5 Stars']++;
          
//           // Increment sentiment counts
//           if (feedback.sentiment in sentimentStats) {
//               sentimentStats[feedback.sentiment]++;
//           }
//       });

//       res.status(200).json({ ratings: ratingStats, sentiments: sentimentStats });
//   } catch (error) {
//       console.error('Error fetching feedbacks:', error);
//       res.status(500).json({ error: 'Failed to fetch feedbacks' });
//   }
// };

export const getStats = async (req, res) => {
  try {
      // Fetch all users and extract feedbacks for aggregation
      const users = await User.find({}, 'feedback -_id');
      const allFeedbacks = [];
      users.forEach((user) => {
          allFeedbacks.push(...user.feedback);
      });

      // Initialize rating stats
      const ratingStats = {
          '1 Star': 0,
          '2 Stars': 0,
          '3 Stars': 0,
          '4 Stars': 0,
          '5 Stars': 0,
      };

      // Initialize sentiment stats
      const sentimentStats = {
          Positive: 0,
          Negative: 0,
      };

      // Aggregate feedback statistics
      allFeedbacks.forEach(feedback => {
          // Increment rating counts
          if (feedback.rating === 1) ratingStats['1 Star']++;
          if (feedback.rating === 2) ratingStats['2 Stars']++;
          if (feedback.rating === 3) ratingStats['3 Stars']++;
          if (feedback.rating === 4) ratingStats['4 Stars']++;
          if (feedback.rating === 5) ratingStats['5 Stars']++;
          
          // Increment sentiment counts, handle null safely
          if (feedback.sentiment === "Positive") sentimentStats.Positive++;
          if (feedback.sentiment === "Negative") sentimentStats.Negative++;
      });

      res.status(200).json({ ratings: ratingStats, sentiments: sentimentStats });
  } catch (error) {
      console.error('Error fetching feedbacks:', error);
      res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
};

