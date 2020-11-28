export class EventManager {

    private _plugins: EventManagerPlugin[] = [];
    private _eventNameToPlugin = new Map<string, EventManagerPlugin>();
  
    /**
     * Initializes an instance of the event-manager service.
     */
    constructor() {
    }
  
    /**
     * Registers a handler for a specific element and event.
     *
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     */
    addEventListener<K extends keyof HTMLElementEventMap>(element: HTMLElement, eventName: K, handler: Function): Function {
      const plugin = this._findPluginFor(eventName);
      return plugin.addEventListener(element, eventName, handler);
    }
  
    /**
     * Registers a global handler for an event in a target view.
     *
     * @param target A target for global event notifications. One of "window", "document", or "body".
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     */
    addGlobalEventListener<K extends keyof HTMLElementEventMap>(target: 'window'|'document'|'body' | any, eventName: K, handler: Function): Function {
      const plugin = this._findPluginFor(eventName);
      return plugin.addGlobalEventListener(target, eventName, handler);
    }
  
    /** @internal */
    _findPluginFor(eventName: string): EventManagerPlugin {
      const plugin = this._eventNameToPlugin.get(eventName);
      if (plugin) {
        return plugin;
      }
  
      const plugins = this._plugins;
      for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];
        if (plugin.supports(eventName)) {
          this._eventNameToPlugin.set(eventName, plugin);
          return plugin;
        }
      }
      throw new Error(`No event manager plugin found for event ${eventName}`);
    }
  }

  // function bindEvent<K extends keyof HTMLElementEventMap>(el: HTMLElement, eventName: K, callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any) {
  //   if (el.addEventListener) {
  //     el.addEventListener(eventName, callback, false);
  //   }
  // }

  function getGlobalEventTarget(doc: Document, target: string): any {
    if (target === 'window') {
      return window;
    }
    if (target === 'document') {
      return doc;
    }
    if (target === 'body') {
      return doc.body;
    }
    return null;
  }
  
//   /**
//  * Get event object of event string, the first `.` is used to split event and namespace
//  *
//  * @param  {String} event Event type string with namespace or not
//  * @return {Object} An Object with `e` and `ns` key
//  */
// function parse<K extends keyof ElementEventMap>(event: HTMLElementEventMap[K]) {
//   const dotIndex = event.indexOf('.');
//   if (dotIndex > 0) {
//     return {
//       e: event.substring(0, event.indexOf('.')),
//       ns: event.substring(dotIndex + 1, event.length)
//     };
//   }

//   return { e: event };
// }

export abstract class EventManagerPlugin {
  constructor(private _doc: any) {}

  // TODO(issue/24571): remove '!'.
  manager!: EventManager;

  abstract supports(eventName: string): boolean;

  abstract addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;

  addGlobalEventListener(element: string, eventName: string, handler: Function): Function {
    const target: HTMLElement = getGlobalEventTarget(this._doc, element);
    if (!target) {
      throw new Error(`Unsupported event target ${target} for event ${eventName}`);
    }
    return this.addEventListener(target, eventName, handler);
  }
}

