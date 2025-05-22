import React from 'react'
import { Flex } from '@chakra-ui/react'
import NewCustomButton from '../ui/Button/NewCustomButton'
import { FaPlus, FaPenToSquare } from "react-icons/fa6";






function TopMenu() {
    return (
        <>
            <Flex padding={'10px 20px'} backgroundColor={'whiteAlpha.700'} borderBottom={'1px solid #ddd'} position={'sticky'} top={0} zIndex={9}  backdropFilter={'blur(10px)'} >
                <NewCustomButton w={'auto'} isFull={false}><FaPlus /></NewCustomButton>
                <NewCustomButton w={'auto'} isFull={false}><FaPenToSquare /></NewCustomButton>
            </Flex>
        </>
    )
}

export default TopMenu
