import React from 'react'

export const Button = ({onClick, children}:{onClick:()=> void, children: React.ReactNode}) => {
  return (
    <button onClick={onClick} className=" bg-green-600 text-white py-4 px-8 rounded font-bold hover:bg-green-900">{children}</button>
  )
}

