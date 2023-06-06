import {User} from "./user";
import {Items} from "./items";

export class Order {
  // user: User | undefined;
  // items: Items[] | undefined;
  fullName: string|undefined;
  idNumber: string|undefined;
  email: string|undefined;
  contactNumber?: string|undefined;
  items?: string|undefined;
  userId?: string|undefined;
}
