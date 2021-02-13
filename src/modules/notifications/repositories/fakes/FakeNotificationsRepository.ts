import { ObjectID } from 'mongodb';

import INotificationRepository from '../INotificationsRepository';
import ICreateNotificationDTO from '../../dtos/ICreateNotificationDTO';

import Notification from '../../infra/typeorm/schemas/Notification';

export default class FakeNotificationsRepository
  implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}
