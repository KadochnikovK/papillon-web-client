import React from 'react'
import { Box, Field, Input, defineStyle } from "@chakra-ui/react"
import { flexbox } from '@chakra-ui/styled-system'

function CustomInput({label, value, placeholder = ''}) {
    return (
        <Field.Root>
            <Box pos="relative" w="full">
                <Input className="peer" placeholder={placeholder} value={value} onChange={() => console.log('Изменил')}/>
                <Field.Label css={floatingStyles}>{label}</Field.Label>
            </Box>
        </Field.Root>
    )
}

const floatingStyles = defineStyle({
    // backdropFilter: 'blur(10px)',
    display: 'flex',
    // bg: 'whiteAlpha.700',
    pos: "absolute",
    bg: "white",
    px: "0.5",
    top: "-3",
    insetStart: "2",
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",  
    _peerPlaceholderShown: {
      color: "colorPaletteFg",
      top: "2.5",
      insetStart: "3",
    },
    _peerFocusVisible: {
      color: "colorPaletteFg",
      top: "-3",
      insetStart: "2",
    },
  })

export default CustomInput
