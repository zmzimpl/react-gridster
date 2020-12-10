import { EventManager } from "./event-manager";
/**
 * Flags for renderer-specific style modifiers.
 * @publicApi
 */
export declare enum RendererStyleFlags2 {
    /**
     * Marks a style as important.
     */
    Important = 1,
    /**
     * Marks a style as using dash case naming (this-is-dash-case).
     */
    DashCase = 2
}
export declare const NAMESPACE_URIS: {
    [ns: string]: string;
};
export declare class Renderer {
    eventManager: EventManager;
    setAttribute(el: any, name: string, value: string, namespace?: string): void;
    removeAttribute(el: any, name: string, namespace?: string): void;
    addClass(el: any, name: string): void;
    removeClass(el: any, name: string): void;
    setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void;
    listen<K extends keyof HTMLElementEventMap>(target: 'window' | 'document' | 'body' | any, event: K, callback: (event: any) => boolean): () => void;
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
