export type RefElement = HTMLElement | HTMLCollection | NodeList | Element

export const isElement = (refElement: RefElement): refElement is Element => {
  return Object.prototype.isPrototypeOf.call(Element.prototype, refElement)
}

export const isHTMLElement = (
  refElement: RefElement
): refElement is HTMLElement => {
  return Object.prototype.isPrototypeOf.call(HTMLElement.prototype, refElement)
}

export const isNodeList = (refElement: RefElement): refElement is NodeList => {
  return NodeList.prototype.isPrototypeOf.call(NodeList.prototype, refElement)
}

export const isHTMLCollection = (
  refElement: RefElement
): refElement is HTMLCollection => {
  return Object.prototype.isPrototypeOf.call(
    HTMLCollection.prototype,
    refElement
  )
}

export const isChildOfRefElement = (
  refElement: RefElement,
  targetNode: Node
) => {
  if (isElement(refElement) || isHTMLElement(refElement)) {
    if (refElement.contains(targetNode)) {
      return true
    }
  } else if (isNodeList(refElement) || isHTMLCollection(refElement)) {
    if (Array.from(refElement).some((s) => s.contains(targetNode))) {
      return true
    }
  } else {
    throw new TypeError(
      'Allowed element types is [HTMLElement, HTMLCollection, NodeList, Element]'
    )
  }

  return false
}
