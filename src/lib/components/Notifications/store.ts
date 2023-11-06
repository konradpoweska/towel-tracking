import type { ToastNotificationProps } from "carbon-components-svelte/types/Notification/ToastNotification.svelte";
import { writable, type Writable } from "svelte/store";

type NotificationCreationParams = Pick<
  ToastNotificationProps,
  "kind" | "title" | "subtitle" | "caption" | "timeout" | "lowContrast"
>;

type Notification = NotificationCreationParams & {
  id: number;
};

export const notifications: Writable<Notification[]> = writable([]);

export const addNotification = (info: NotificationCreationParams) => {
  const notification: Notification = {
    timeout: 5000,
    ...info,
    id: Math.floor(Math.random() * 10000),
  };
  notifications.update((all) => {
    all.push(notification);
    return all;
  });
};

export const dismiss = (id: number) => {
  notifications.update((all) => all.filter((n) => n.id !== id));
};
