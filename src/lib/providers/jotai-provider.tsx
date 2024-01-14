"use client"

import React from 'react'
import { Provider } from 'jotai'

import type { TLayoutProps } from 'types'

export default function JotaiProvider({ children }: TLayoutProps) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}
