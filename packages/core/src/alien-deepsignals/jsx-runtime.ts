import { Computed, computed, isComputed, isSignal } from "alien-deepsignals"
import { el } from "."
import type { DomElement, PrefixedElementTag, Prettify } from "../types"
import type { Children, ElementAttributesTagNameMap } from "./types"
import { childrenToNodes } from "../utils"
import { reactiveChildrenToNodes } from "./utils"

export function jsx<T extends PrefixedElementTag | JSX.ElementClass | typeof Fragment = PrefixedElementTag> (
    type: T,
    props: JSX.IntrinsicAttributes,
    key: unknown,
    isStaticChildren: unknown,
    __source: unknown,
    __self: unknown
): JSX.Element {
    if (typeof type === 'function') return type(props)
    if (type === Fragment) {
        return computed(() => {
            const children = Array.isArray(props.children) ? props.children.flat() : [props.children]

            return children.flatMap((child) => {
                if (isSignal(child) || isComputed(child)) return reactiveChildrenToNodes(child)
                else return childrenToNodes(child)
            })
        })
    }
    return el<PrefixedElementTag>(type, props)
}

export const jsxs = jsx
export const jsxDEV = jsx

export const Fragment = Symbol('Fragment')

export namespace JSX {
    export type Fragment = Computed<Node[]>
    export type Element = DomElement | Fragment
    export type ElementClass = (props: IntrinsicAttributes) => Element
    export interface IntrinsicAttributes {
        children?: Children | Children[];
        [key: string | symbol]: unknown;
	}
    export type IntrinsicElements = {
        [T in PrefixedElementTag]: Prettify<ElementAttributesTagNameMap[T]>
    }
}
