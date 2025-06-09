import { IList } from "./lists.interface";
import { IUser } from "./users.interface";

export interface INotifier {
  notify(userData: Partial<IUser>, listData: Partial<IList>): Promise<void>;
}
