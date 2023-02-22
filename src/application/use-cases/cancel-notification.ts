import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";


interface CancelNotificationRequest {
    notificationId: string;
}

type CancelNoticationResponse = void;

@Injectable()
export class CancelNotification {
    constructor(private notificationsRepository: NotificationsRepository) {};

    async execute(request: CancelNotificationRequest): Promise<CancelNoticationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);

        if (!notification) {
            throw new NotificationNotFoundError();
        }

        notification.cancel();

        await this.notificationsRepository.save(notification);
    }
}