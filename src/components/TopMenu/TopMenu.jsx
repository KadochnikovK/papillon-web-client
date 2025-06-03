import React from 'react'
import { Flex } from '@chakra-ui/react'
import NewCustomButton from '../ui/Button/NewCustomButton'
import { FaPlus, FaPenToSquare } from "react-icons/fa6";
import { usePersone } from '../../hooks/usePersone'

import { FaPrint } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { usePersonsList } from '../../hooks/usePersonsList';


function TopMenu() {

    const { isExistPersone, createPersone, editPersone } = usePersone()
    const { activePerson } = usePersonsList()

    return (
        <>
            <Flex padding={'10px 20px'} backgroundColor={'whiteAlpha.700'} borderBottom={'1px solid #ddd'} position={'sticky'} top={0} zIndex={9} backdropFilter={'blur(10px)'}  >
                <NewCustomButton w={'auto'} isFull={false} handleClick={createPersone}><FaPlus /></NewCustomButton>
                <NewCustomButton w={'auto'} isFull={false} disabled={!activePerson} handleClick={editPersone} ><FaPenToSquare /></NewCustomButton>
                <NewCustomButton disabled={!activePerson} padding="10px" maxWidth="max-content"
                    handleClick={() => console.log('Началось сканирование с ДС-45')}>
                    <FaPrint />
                </NewCustomButton>
                <NewCustomButton disabled={!activePerson} padding="10px" maxWidth="max-content"
                    handleClick={() => console.log('Началось сканирование с ДС-45')}>
                    <FaDownload />
                </NewCustomButton>
            </Flex>
        </>
    )
}

export default TopMenu
