import React from 'react'
import { Flex } from '@chakra-ui/react'
import NewCustomButton from '../ui/Button/NewCustomButton'
import { FaPlus, FaPenToSquare } from "react-icons/fa6";
import { usePersone } from '../../hooks/usePersone'



function TopMenu() {

    const { isExistPersone, createPersone, editPersone } = usePersone()
    
    return (
        <>
            <Flex padding={'10px 20px'} backgroundColor={'whiteAlpha.700'} borderBottom={'1px solid #ddd'} position={'sticky'} top={0} zIndex={9} backdropFilter={'blur(10px)'}  >
                <NewCustomButton w={'auto'} isFull={false} handleClick={createPersone}><FaPlus /></NewCustomButton>
                <NewCustomButton w={'auto'} isFull={false} disabled={!isExistPersone} handleClick={editPersone} ><FaPenToSquare /></NewCustomButton>
            </Flex>
        </>
    )
}

export default TopMenu
