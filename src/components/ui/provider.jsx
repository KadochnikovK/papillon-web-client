import {
  ChakraProvider,
  // defaultBaseConfig,
  // createSystem
} from '@chakra-ui/react';
import React from 'react'

export const Provider = ({ children, theme }) => {
  // const system = createSystem(defaultBaseConfig, theme)
  return (
    <ChakraProvider value={theme}>
      {children}
    </ChakraProvider>
  )
}
