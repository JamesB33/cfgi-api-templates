export interface WebhookPayload {
    event: string;
    data: Record<string, any>;
}