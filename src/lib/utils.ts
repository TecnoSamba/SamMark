import React from "react"

export function getStringChildren(children: React.ReactNode): string {
    return React.Children.toArray(children)
        .map(child => {
            if (typeof child === 'string' || typeof child === 'number') {
                console.log('String found: ', child)

                return String(child)
            }

            if (React.isValidElement(child)) {
                return getStringChildren((child.props as any).children)
            }

            return ''
        })
        .join(' ')
}