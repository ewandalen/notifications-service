import { NotificationsRepository } from "src/application/repositories/notifications-repository";
import { Content } from "../application/entities/content";
import { Notification } from "../application/entities/notification";


interface SendNotificationRequest {
    recipientId: string;
    content: string;
    category: string;
}

interface SendNoticationResponde {
    notification: Notification;
}

export class SendNotification {
    constructor(private notificationsRepository: NotificationsRepository) {};

    async execute(request: SendNotificationRequest): Promise<SendNoticationResponde> {
        const { recipientId, content, category } = request;

        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category
        });

        return {
            notification
        };
    }
}