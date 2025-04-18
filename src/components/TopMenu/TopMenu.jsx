import React from 'react'
import { Flex } from '@chakra-ui/react'
import CustomButton from '../ui/Button/CustomButton'

function TopMenu() {
    return (
        <>
            <Flex padding={'20px'}>
                <CustomButton icon={''}>Кнопка</CustomButton>         
            </Flex>
        </>
    )
}

export default TopMenu
