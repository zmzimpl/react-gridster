export declare class EventManager {
    private _plugins;
    private _eventNameToPlugin;
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
    addEventListener<K extends keyof HTMLElementEventMap>(element: HTMLElement, eventName: K, handler: Function): Function;
    /**
     * Registers a global handler for an event in a target view.
     *
     * @param target A target for global event notifications. One of "window", "document", or "body".
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     */
    addGlobalEventListener<K extends keyof HTMLElementEventMap>(target: 'window' | 'document' | 'body' | any, eventName: K, handler: Function): Function;
    /** @internal */
    _findPluginFor(eventName: string): EventManagerPlugin;
}
export declare abstract class EventManagerPlugin {
    private _doc;
    constructor(_doc: any);
    manager: EventManager;
    abstract supports(eventName: string): boolean;
    abstract addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    addGlobalEventListener(element: string, eventName: string, handler: Function): Function;
}
