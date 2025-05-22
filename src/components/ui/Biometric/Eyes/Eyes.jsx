import { Image, Flex, Box } from '@chakra-ui/react'
import React from 'react'
import eye from '../../../../images/eye.svg'
import { useSelector } from 'react-redux';
import { chooseColor } from '../../../../helpers/fingerprints'

function Hands() {

    const fingerprints = useSelector(state => state.persone.data.fingerprints)

    return (
        <Flex w={'100%'} gap={'10px'} >
            <Box w={'calc(50% - 5px)'} position="relative"  >
                <Box cursor={'pointer'} w="30%" aspectRatio={1} position="absolute" left={'37.5%'} top={'23%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 725)} opacity={.7} blendMode={'multiply'}></Box>
                <Image src={eye} padding={'5%'} />
            </Box>
            <Box w={'calc(50% - 5px)'} position="relative" transform={"scale(-1, 1)"} >
            <Box cursor={'pointer'} w="30%" aspectRatio={1} position="absolute" left={'37.5%'} top={'23%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 725)} opacity={.7} blendMode={'multiply'}></Box>                <Image src={eye} padding={'5%'} />
            </Box>

        </Flex>
    )
}

export default Hands
