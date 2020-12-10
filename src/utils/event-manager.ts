export class EventManager {

  
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
    addEventListener<K extends keyof HTMLElementEventMap>(element: HTMLElement, eventName: K, handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): Function {
      element.addEventListener(eventName, handler);
      return function () {
        element.removeEventListener(eventName, handler);
      };
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
      const t = getGlobalEventTarget(document, target);
      t.addEventListener(eventName, handler);
      return () => {
        t.removeEventListener(eventName, handler);
      }
    }
  }

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

