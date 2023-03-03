import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";


interface UnreadNotificationRequest {
    notificationId: string;
}

type UnreadNoticationResponse = void;

@Injectable()
export class UnreadNotification {
    constructor(private notificationsRepository: NotificationsRepository) {};

    async execute(request: UnreadNotificationRequest): Promise<UnreadNoticationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);

        if (!notification) {
            throw new NotificationNotFoundError();
        }

        notification.unread();

        await this.notificationsRepository.save(notification);
    }
}