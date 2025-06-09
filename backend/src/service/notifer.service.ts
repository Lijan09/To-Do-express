import { INotifier } from "../interface/notifier.interface";
import { IUser } from "../interface/users.interface";
import { IList } from "../interface/lists.interface";

export class Notifier implements INotifier {
  async notify(userData: Partial<IUser>, listData: Partial<IList>) {
    console.log(
      `Deadline notification for user ${userData.userName} for list ${listData.title}`
    );
  }
}
