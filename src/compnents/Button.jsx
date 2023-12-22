import React from 'react'

export function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    

    return (
        <button className={`px-4 py-3 rounded-lg ${bgColor} ${className}`} {...props} >
            {children}
        </button>
    )
}
