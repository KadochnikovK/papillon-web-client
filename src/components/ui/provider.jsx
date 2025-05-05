import {
  ChakraProvider,
  // defaultBaseConfig,
  // createSystem
} from '@chakra-ui/react';
import { Provider } from 'react-redux';
import React from 'react'

export const MyProvider = ({ children, theme, store }) => {
  // const system = createSystem(defaultBaseConfig, theme)
  return (
    <Provider store={store}>
    <ChakraProvider value={theme}>
      {children}
    </ChakraProvider>
    </Provider>
  )
}
