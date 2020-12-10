export declare class EventManager {
    /**
     * Initializes an instance of the event-manager service.
     */
    constructor();
    /**
     * Registers a handler for a specific element and event.
     *
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     */
    addEventListener<K extends keyof HTMLElementEventMap>(element: HTMLElement, eventName: K, handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): Function;
    /**
     * Registers a global handler for an event in a target view.
     *
     * @param target A target for global event notifications. One of "window", "document", or "body".
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     */
    addGlobalEventListener<K extends keyof HTMLElementEventMap>(target: 'window' | 'document' | 'body' | any, eventName: K, handler: Function): Function;
}
