import { Image, Flex, Box } from '@chakra-ui/react'
import React from 'react'
import palm from '../../../../images/palm.svg'
import { useSelector } from 'react-redux';
import { chooseColor } from '../../../../helpers/fingerprints'

const ADIS_TAGS = [ // id - Тег АДИС, nist - номер в NIST, mask - порядок в маске (слева направо!), type - номер записи NIST
    { id: 705, cmd: -1, nist: 0, mask: 0, type: 10, name: 'Face frontal' },       // 'Фас',                          RUS-I Type-10
    { id: 706, cmd: -1, nist: 0, mask: 0, type: 10, name: 'Left profile' },       // 'Левый профиль',                RUS-I Type-10
    { id: 2200, cmd: -1, nist: 0, mask: 0, type: 10, name: 'Right profile' },       // 'Правый профиль',               RUS-I Type-10
    { id: 720, cmd: 0, nist: 1, mask: 1, type: 14, name: 'Right Thumb finger' },  // 'Правый большой',               RUS-I Type-14 - 1
    { id: 721, cmd: 1, nist: 2, mask: 2, type: 14, name: 'Right Index finger' },  // 'Правый указательный',          RUS-I Type-14 - 2
    { id: 722, cmd: 2, nist: 3, mask: 3, type: 14, name: 'Right Middle finger' },  // 'Правый средний',               RUS-I Type-14 - 3
    { id: 723, cmd: 3, nist: 4, mask: 4, type: 14, name: 'Right Ring finger' },  // 'Правый безымянный',            RUS-I Type-14 - 4
    { id: 724, cmd: 4, nist: 5, mask: 5, type: 14, name: 'Right Little finger' },  // 'Правый мизинец',               RUS-I Type-14 - 5
    { id: 725, cmd: 5, nist: 6, mask: 6, type: 14, name: 'Left Thumb finger' },  // 'Левый большой',                RUS-I Type-14 - 6
    { id: 726, cmd: 6, nist: 7, mask: 7, type: 14, name: 'Left Index finger' },  // 'Левый указательный',           RUS-I Type-14 - 7
    { id: 727, cmd: 7, nist: 8, mask: 8, type: 14, name: 'Left Middle finger' },  // 'Левый средний',                RUS-I Type-14 - 8
    { id: 728, cmd: 8, nist: 9, mask: 9, type: 14, name: 'Left Ring finger' },  // 'Левый безымянный',             RUS-I Type-14 - 9
    { id: 729, cmd: 9, nist: 10, mask: 10, type: 14, name: 'Left Little finger' },  // 'Левый мизинец',                RUS-I Type-14 - 10
    { id: 736, cmd: 12, nist: 11, mask: 3, type: 14, name: 'Plain Right thumb' },  // 'Контрольные (правый большой)', RUS-I Type-14 - 11
    { id: 735, cmd: 11, nist: 12, mask: 2, type: 14, name: 'Plain Left thumb' },  // 'Контрольные (левый большой)',  RUS-I Type-14 - 12
    { id: 737, cmd: 13, nist: 13, mask: 4, type: 14, name: 'Plain Right four fingers' }, // 'Контрольные (правые 4)',  RUS-I Type-14 - 13
    { id: 734, cmd: 10, nist: 14, mask: 1, type: 14, name: 'Plain Left four fingers' }, // 'Контрольные (левые 4),    RUS-I Type-14 - 14
    { id: 732, cmd: 14, nist: 23, mask: 1, type: 15, name: 'Left Full palm' },  // 'Левая ладонь',                 RUS-I Type-15 - 23
    { id: 740, cmd: 18, nist: 34, mask: 2, type: 15, name: 'Left Upper palm' },  // 'Левая ладонь верх',            RUS-I Type-15 - 34 ???
    { id: 742, cmd: 14, nist: 27, mask: 3, type: 15, name: 'Left lower palm' },  // 'Левая ладонь низ,              RUS-I Type-15 - 27
    { id: 738, cmd: 16, nist: 24, mask: 4, type: 15, name: 'Left Writer’s palm' },  // 'Ребро левой ладони',           RUS-I Type-15 - 24
    { id: 733, cmd: 15, nist: 21, mask: 5, type: 15, name: 'Right Full palm' },  // 'Правая ладонь',                RUS-I Type-15 - 21
    { id: 741, cmd: 19, nist: 31, mask: 6, type: 15, name: 'Right Upper palm' },  // 'Правая ладонь верх',           RUS-I Type-15 - 31 ???
    { id: 743, cmd: 15, nist: 25, mask: 7, type: 15, name: 'Right lower palm' },  // 'Правая ладонь низ',            RUS-I Type-15 - 25
    { id: 739, cmd: 17, nist: 22, mask: 8, type: 15, name: 'Right Writer’s palm' },  // 'Ребро правой ладони',          RUS-I Type-15 - 22
]

function Hands() {
    const fingerprints = useSelector(state => state.persone.data.fingerprints)
    return (
        <Flex w={'100%'} gap={'10px'} position="relative">
            <Box w={'calc(50% - 5px)'} position="relative"  >
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'77%'} top={'38%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 735)} opacity={.7} blendMode={'multiply'}></Box>
                <Box cursor={'pointer'} w="34%" aspectRatio={'.65'} position="absolute" left={'20%'} top={'5%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 734)} opacity={.7} blendMode={'multiply'} transform={'rotate(80deg)'}></Box>
                <Box cursor={'pointer'} w="18%" aspectRatio={'.35'} position="absolute" left={'27%'} top={'29.5%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 740)} opacity={.7} blendMode={'multiply'} transform={'rotate(80deg)'}></Box>
                <Box cursor={'pointer'} w="39%" aspectRatio={'.65'} position="absolute" left={'20%'} top={'52%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 732)} opacity={.7} blendMode={'multiply'} transform={'rotate(80deg)'}></Box>
                <Image src={palm} padding={'5%'} />
            </Box>
            <Box w={'calc(50% - 5px)'} position="relative" transform={"scale(-1, 1)"} >
                <Box cursor={'pointer'} w="18%" aspectRatio={1} position="absolute" left={'77%'} top={'38%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 736)} opacity={.7} blendMode={'multiply'}></Box>
                <Box cursor={'pointer'} w="34%" aspectRatio={'.65'} position="absolute" left={'20%'} top={'5%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 737)} opacity={.7} blendMode={'multiply'} transform={'rotate(80deg)'}></Box>
                <Box cursor={'pointer'} w="18%" aspectRatio={'.35'} position="absolute" left={'27%'} top={'29.5%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 741)} opacity={.7} blendMode={'multiply'} transform={'rotate(80deg)'}></Box>
                <Box cursor={'pointer'} w="39%" aspectRatio={'.65'} position="absolute" left={'20%'} top={'52%'} borderRadius="10pc" backgroundColor={chooseColor(fingerprints, 733)} opacity={.7} blendMode={'multiply'} transform={'rotate(80deg)'}></Box>
                <Image src={palm} padding={'5%'} />
            </Box>

        </Flex>
    )
}

export default Hands
