import React from 'react'
import { Flex } from '@chakra-ui/react'
import CustomButton from '../ui/Button/CustomButton'
import add from '../../content/images/icons/add.svg'
import edit from '../../content/images/icons/create.svg'

function TopMenu() {
    return (
        <>
            <Flex padding={'20px'} backgroundColor={'white'}>
                <CustomButton icon={add}>Кнопка</CustomButton>         
                <CustomButton icon={edit}>Кнопка</CustomButton>         
            </Flex>
        </>
    )
}

export default TopMenu
