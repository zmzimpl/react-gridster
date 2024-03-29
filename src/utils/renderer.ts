import { EventManager } from "./event-manager";

/**
 * Flags for renderer-specific style modifiers.
 * @publicApi
 */
export enum RendererStyleFlags2 {
  // TODO(misko): This needs to be refactored into a separate file so that it can be imported from
  // `node_manipulation.ts` Currently doing the import cause resolution order to change and fails
  // the tests. The work around is to have hard coded value in `node_manipulation.ts` for now.
  /**
   * Marks a style as important.
   */
  Important = 1 << 0,
  /**
   * Marks a style as using dash case naming (this-is-dash-case).
   */
  DashCase = 1 << 1
}

export const NAMESPACE_URIS: { [ns: string]: string } = {
  svg: 'http://www.w3.org/2000/svg',
  xhtml: 'http://www.w3.org/1999/xhtml',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
}

export class Renderer {

  eventManager: EventManager = new EventManager();

  setAttribute(el: any, name: string, value: string, namespace?: string): void {
    if (namespace) {
      // TODO(FW-811): Ivy may cause issues here because it's passing around
      // full URIs for namespaces, therefore this lookup will fail.
      el.setAttributeNS(
        NAMESPACE_URIS[namespace],
        namespace + ':' + name,
        value
      )
    } else {
      el.setAttribute(name, value)
    }
  }

  removeAttribute(el: any, name: string, namespace?: string): void {
    if (namespace) {
      // TODO(FW-811): Ivy may cause issues here because it's passing around
      // full URIs for namespaces, therefore this lookup will fail.
      el.removeAttributeNS(NAMESPACE_URIS[namespace], name)
    } else {
      el.removeAttribute(name)
    }
  }

  addClass(el: any, name: string): void {
    el.classList.add(name)
  }

  removeClass(el: any, name: string): void {
    el.classList.remove(name)
  }

  setStyle(
    el: any,
    style: string,
    value: any,
    flags?: RendererStyleFlags2
  ): void {
    style = style.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    const styleMap = _readStyleAttribute(el)
    if (flags && RendererStyleFlags2.Important) {
      value += ' !important'
    }
    styleMap[style] = value == null ? '' : value
    _writeStyleAttribute(el, styleMap)
  }

  
  listen<K extends keyof HTMLElementEventMap>(target: 'window'|'document'|'body'| any, event: K, callback: (event: any) => any):
  () => void {
    if (typeof target === 'string') { 
      return <() => void>this.addGlobalEventListener(
        target, event, callback);
    } else {
      return <() => void>this.addEventListener(
        target, event, callback);
    }
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


function _readStyleAttribute(element: any): { [name: string]: string } {
  const styleMap: { [name: string]: string } = {}
  const styleAttribute = element.getAttribute('style')
  if (styleAttribute) {
    const styleList = styleAttribute.split(/;+/g)
    for (let i = 0; i < styleList.length; i++) {
      const style = styleList[i].trim()
      if (style.length > 0) {
        const colonIndex = style.indexOf(':')
        if (colonIndex === -1) {
          throw new Error(`Invalid CSS style: ${style}`)
        }
        const name = style.substr(0, colonIndex).trim()
        styleMap[name] = style.substr(colonIndex + 1).trim()
      }
    }
  }
  return styleMap
}

function _writeStyleAttribute(
  element: any,
  styleMap: { [name: string]: string }
) {
  let styleAttrValue = ''
  for (const key in styleMap) {
    const newValue = styleMap[key]
    if (newValue != null) {
      styleAttrValue += key + ':' + styleMap[key] + ';'
    }
  }
  element.setAttribute('style', styleAttrValue)
}
