import React from 'react'

export default function ProductsLayout({
    children
}:{
    children: React.ReactNode;
}) {
  return (
    <div>
      {
        children
      }
    </div>
  )
}
