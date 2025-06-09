import cron from "node-cron";
import { ListRepository } from "../repository/lists.repository";
import { UserRepository } from "../repository/users.repository";
import { Notifier } from "../service/notifer.service";

const userRepo = new UserRepository();
const listRepo = new ListRepository();
const notifier = new Notifier();

// function that runs every minute
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const upcoming = new Date(now.getTime() + 60 * 60 * 1000);

  const tasks = await listRepo.findUpcomingTasks(now, upcoming);

  for (const task of tasks) {
    const user = await userRepo.getUserByID(task.userID);
    await notifier.notify(user, task);
  }
});
