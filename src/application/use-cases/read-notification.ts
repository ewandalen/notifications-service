import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";


interface ReadNotificationRequest {
    notificationId: string;
}

type ReadNoticationResponse = void;

@Injectable()
export class ReadNotification {
    constructor(private notificationsRepository: NotificationsRepository) {};

    async execute(request: ReadNotificationRequest): Promise<ReadNoticationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);

        if (!notification) {
            throw new NotificationNotFoundError();
        }

        notification.read();

        await this.notificationsRepository.save(notification);
    }
}