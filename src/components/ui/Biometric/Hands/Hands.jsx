import { Image, Flex, Box } from '@chakra-ui/react'
import React from 'react'
import hand from '../../../../images/hand.svg'
import { useSelector } from 'react-redux';
import { chooseColor} from '../../../../helpers/fingerprints'

function Hands() {

    const fingerprints = useSelector(state => state.persone.data.fingerprints)

    return (
        <Flex w={'100%'} gap={'10px'} >
            <Box w={'calc(50% - 5px)'} position="relative"  >
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'81%'} top={'38%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 725)} opacity={.7} blendMode={'multiply'}></Box>
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'61.5%'} top={'7%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 726)} opacity={.7} blendMode={'multiply'}></Box>
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'42%'} top={'1%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 727)} opacity={.7} blendMode={'multiply'}></Box>
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'19.5%'} top={'6%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 728)} opacity={.7} blendMode={'multiply'}></Box>
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'1%'} top={'19%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 729)} opacity={.7} blendMode={'multiply'}></Box>
                <Image src={hand} padding={'5%'} />
            </Box>
            <Box w={'calc(50% - 5px)'} position="relative" transform={"scale(-1, 1)"} >
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'81%'} top={'38%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 720)} opacity={.7} blendMode={'multiply'}></Box>
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'61.5%'} top={'7%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 721)} opacity={.7} blendMode={'multiply'}></Box>
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'42%'} top={'1%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 722)} opacity={.7} blendMode={'multiply'}></Box>
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'19.5%'} top={'6%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 723)} opacity={.7} blendMode={'multiply'}></Box>
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'1%'} top={'19%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 724)} opacity={.7} blendMode={'multiply'}></Box>
                <Image src={hand} padding={'5%'} />
            </Box>

        </Flex>
    )
}

export default Hands
