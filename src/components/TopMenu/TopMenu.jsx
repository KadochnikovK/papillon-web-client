import React from 'react'
import { Flex } from '@chakra-ui/react'
import NewCustomButton from '../ui/Button/NewCustomButton'
import { FaPlus, FaPenToSquare } from "react-icons/fa6";






function TopMenu() {
    return (
        <>
            <Flex padding={'10px 20px'} backgroundColor={'white'} borderBottom={'1px solid #ddd'}>
                <NewCustomButton w={'auto'} isFull={false}><FaPlus /></NewCustomButton>
                <NewCustomButton w={'auto'} isFull={false}><FaPenToSquare /></NewCustomButton>
            </Flex>
        </>
    )
}

export default TopMenu
