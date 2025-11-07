import type { ElementPrefixedTagNameMap, PrefixedElementTag, Prettify } from "../types"
import { handleSignalAttribute, handleSignalChildren } from "./utils";
import type { Children, MayBeReactiveAttributes } from "./types";

export function el<T extends PrefixedElementTag>(tag: T, attributes?: Prettify<MayBeReactiveAttributes[T]> | null, ...children: Children): ElementPrefixedTagNameMap[T] {
    let element: ElementPrefixedTagNameMap[T]

    if (tag === 'svg' || tag.startsWith('svg:')) {
        element = document.createElementNS("http://www.w3.org/2000/svg", tag === 'svg' ? 'svg' : tag.substring(4)) as ElementPrefixedTagNameMap[T]
    } else if (tag === 'math' || tag.startsWith('math:')) {
        element = document.createElementNS("http://www.w3.org/1998/Math/MathML", tag === 'math' ? 'math' : tag.substring(5)) as ElementPrefixedTagNameMap[T]
    } else {
        element = document.createElement(tag) as ElementPrefixedTagNameMap[T]
    }

    if(attributes) {
        for (let key of Reflect.ownKeys(attributes)) {
            if (key === 'children') {
                    attributes.children?.flat().forEach((child) => handleSignalChildren(element, child))
            } else {
                handleSignalAttribute(element, key, attributes[key])
            }
        }
    }

    children.flat().forEach((child) => handleSignalChildren(element, child))

    return element
}
