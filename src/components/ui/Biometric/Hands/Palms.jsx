import { Image, Flex, Box } from '@chakra-ui/react'
import React from 'react'
import palm from '../../../../images/palm.svg'
import { useSelector } from 'react-redux';
import { chooseColor } from '../../../../helpers/fingerprints'
import imagePlaceholder from '../../../../images/image-placeholder.svg'

function Hands({ setImagePreview }) {
    const fingerprints = useSelector(state => state.persone.data.fingerprints)

    const chooseImage = (tag) => {
        const image = fingerprints.find(fingerprint => fingerprint.tag == tag)
        setImagePreview(image ? image.img_png : imagePlaceholder)
    }

    return (
        <Flex w={'100%'} gap={'10px'} position="relative">
            <Box w={'calc(50% - 5px)'} position="relative"  >
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'77%'} top={'38%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 735)} opacity={.7} blendMode={'multiply'} onClick={() => chooseImage(735)}></Box>
                <Box cursor={'pointer'} w="34%" aspectRatio={'.65'} position="absolute" left={'20%'} top={'5%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 734)} opacity={.7} blendMode={'multiply'} transform={'rotate(80deg)'} onClick={() => chooseImage(734)}></Box>
                <Box cursor={'pointer'} w="18%" aspectRatio={'.35'} position="absolute" left={'27%'} top={'29.5%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 740)} opacity={.7} blendMode={'multiply'} transform={'rotate(80deg)'} onClick={() => chooseImage(740)}></Box>
                <Box cursor={'pointer'} w="39%" aspectRatio={'.65'} position="absolute" left={'20%'} top={'52%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 732)} opacity={.7} blendMode={'multiply'} transform={'rotate(80deg)'} onClick={() => chooseImage(732)}></Box>
                <Image src={palm} padding={'5%'} />
            </Box>
            <Box w={'calc(50% - 5px)'} position="relative" transform={"scale(-1, 1)"} >
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'77%'} top={'38%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 736)} opacity={.7} blendMode={'multiply'} onClick={() => chooseImage(736)}></Box>
                <Box cursor={'pointer'} w="34%" aspectRatio={'.65'} position="absolute" left={'20%'} top={'5%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 737)} opacity={.7} blendMode={'multiply'} transform={'rotate(80deg)'} onClick={() => chooseImage(737)}></Box>
                <Box cursor={'pointer'} w="18%" aspectRatio={'.35'} position="absolute" left={'27%'} top={'29.5%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 741)} opacity={.7} blendMode={'multiply'} transform={'rotate(80deg)'} onClick={() => chooseImage(741)}></Box>
                <Box cursor={'pointer'} w="39%" aspectRatio={'.65'} position="absolute" left={'20%'} top={'52%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 733)} opacity={.7} blendMode={'multiply'} transform={'rotate(80deg)'} onClick={() => chooseImage(733)}></Box>
                <Image src={palm} padding={'5%'} />
            </Box>

        </Flex>
    )
}

export default Hands
