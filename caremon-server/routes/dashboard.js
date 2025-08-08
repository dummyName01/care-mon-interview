const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  // Normally you’d validate token
  res.json({ message: `Welcome back to your personalized dashboard. This space is designed to give you a quick overview of your recent activities, updates, and performance highlights. As an Angular Tech Lead, you can monitor the latest framework changes, manage your ongoing tasks, and stay updated with project-wide announcements. 

Recent highlights include the rollout of Angular 20 with enhanced Signals API, improved SSR support, and streamlined build processes. You are encouraged to explore these new features and consider migrating existing modules to take advantage of better performance and readability.

Remember to check the notifications section regularly for messages from the admin team, updates on list items, and reminders about upcoming deadlines. Your weekly performance report is now available and shows steady progress in key areas such as code quality, pull request turnaround time, and team collaboration.

If you have any pending tasks, you can find them in the 'List' section. Keep up the great work, and feel free to reach out to the admin for feedback or questions.` });
});

module.exports = router;
