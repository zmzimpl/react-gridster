export class EventManager {
  
    /**
     * Initializes an instance of the event-manager service.
     */
    constructor() {}
  
    /**
     * Registers a handler for a specific element and event.
     *
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns  A callback function that can be used to remove the handler.
     */
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
        console.log(element);
        console.log(eventName);
        return handler;
    }
  
    /**
     * Registers a global handler for an event in a target view.
     *
     * @param target A target for global event notifications. One of "window", "document", or "body".
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns A callback function that can be used to remove the handler.
     */
    addGlobalEventListener(target: string, eventName: string, handler: Function): Function {
        console.log(target);
        console.log(eventName);
      return handler;
    }
  
    // /** @internal */
    // _findPluginFor(eventName: string): EventManagerPlugin {
    //   const plugin = this._eventNameToPlugin.get(eventName);
    //   if (plugin) {
    //     return plugin;
    //   }
  
    //   const plugins = this._plugins;
    //   for (let i = 0; i < plugins.length; i++) {
    //     const plugin = plugins[i];
    //     if (plugin.supports(eventName)) {
    //       this._eventNameToPlugin.set(eventName, plugin);
    //       return plugin;
    //     }
    //   }
    //   throw new Error(`No event manager plugin found for event ${eventName}`);
    // }
  }
  
