import React from 'react'

interface PlaceholderImageProps {
  width: number
  height: number
  text?: string
}

export function PlaceholderImage({ width, height, text = 'No Image' }: PlaceholderImageProps) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        color: '#888',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '8px',
      }}
    >
      {text}
    </div>
  )
}