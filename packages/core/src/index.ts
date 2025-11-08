import type { Children, ElementAttributesTagNameMap, ElementPrefixedTagNameMap, PrefixedElementTag, Prettify } from "./types"
import { handleAttribute, handleChildren } from "./utils"

export function el<T extends PrefixedElementTag>(tag: T, attributes?: Prettify<ElementAttributesTagNameMap[T]> | null, ...children: Children[]): ElementPrefixedTagNameMap[T] {
    let element: ElementPrefixedTagNameMap[T]

    if (tag === 'svg' || tag.startsWith('svg:')) {
        element = document.createElementNS("http://www.w3.org/2000/svg", tag.substring(4)) as ElementPrefixedTagNameMap[T]
    } else if (tag === 'math' || tag.startsWith('math:')) {
        element = document.createElementNS("http://www.w3.org/1998/Math/MathML", tag.substring(5)) as ElementPrefixedTagNameMap[T]
    } else {
        element = document.createElement(tag) as ElementPrefixedTagNameMap[T]
    }

    if (attributes) {
        for (let key of Reflect.ownKeys(attributes)) {
            if(key === 'children') {
                if (Array.isArray(attributes.children)) attributes.children.forEach((subChildren) => handleChildren(element, subChildren))
                else handleChildren(element, attributes.children)
            } else {
                handleAttribute(element, key, attributes[key])
            }
        }
    }

    children.forEach((subChildren) => handleChildren(element, subChildren))

    return element
}
