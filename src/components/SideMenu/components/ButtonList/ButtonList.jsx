import React from 'react'
import { Flex } from '@chakra-ui/react'

function ButtonList({children}) {
    return (
        <Flex direction={'column'} gap={'20px'} marginBottom={'auto'}>
            {children}
        </Flex>
    )
}

export default ButtonList
