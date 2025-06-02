import React, { useCallback } from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
import logo from '../../content/images/logo.png';
import ButtonList from './components/ButtonList/ButtonList';
import NewCustomButton from '../ui/Button/NewCustomButton';
import { FaGear, FaRectangleList, FaRightFromBracket, FaArrowRight , FaArrowLeft  } from "react-icons/fa6";

function SideMenu({ isFull, setIsFull }) {

    const toggleMenu = useCallback(() => {
        setIsFull(prev => !prev);
    }, [setIsFull]);

    const handleButtonClick = useCallback((action) => {
        console.log(`${action} clicked`);
    }, []);



    return (
        <Flex
            as="nav"
            aria-label="Main navigation"
            position="fixed"
            direction="column"
            bg="white"
            h="100vh"
            w={isFull ? '300px' : '80px'}
            zIndex="999"
            minW={isFull ? '300px' : '80px'}
            p={isFull ? '10px 32px' : '10px 16px'}
            gap="60px"
            transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)" // Плавная анимация
            boxShadow="md"
        // overflow="hidden" 
        >

            <NewCustomButton

                // offsetY="48px"
                // offsetX="20px" 
                handleClick={toggleMenu}
                aria-label={isFull ? 'Collapse menu' : 'Expand menu'}
            // cursor="pointer"
            // p={2}
            // _hover={{ bg: 'gray.100' }}
            // borderRadius="md"
            // transition="transform 0.3s ease"
            // _active={{ transform: 'scale(0.95)' }}
            >
                {isFull ? <FaArrowLeft/> : <FaArrowRight />}
            </NewCustomButton>
            <Flex alignItems="center" justifyContent={isFull ? 'start' : "center"} gap={isFull ? '10px' : ''} minH="42px">

                <NewCustomButton
                    isFull={isFull}
                >
                    <Flex
                        p="4px"
                        w="34px"
                        h="34px"
                        bg="#00A8D2"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="8px"
                        flexShrink={0}
                    >
                        <Image src={logo} alt="Papillon logo" />
                    </Flex>

                    {isFull && 'Papillon'}
                </NewCustomButton>


                <Text
                    fontSize="lg"
                    color="main"
                    fontWeight="700"
                    opacity={isFull ? 1 : 0}
                    transition="opacity 0.2s ease, width 0.2s ease"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    w={isFull ? 'auto' : '0'}
                >

                </Text>
            </Flex>

            <ButtonList>
                <NewCustomButton
                    handleClick={() => handleButtonClick('Cards List')}
                    isFull={isFull}
                    title="Go to the cards list"
                    aria-label="Cards List"
                >
                    <FaRectangleList /> {isFull && 'Cards List'}
                </NewCustomButton>
                <NewCustomButton
                    handleClick={() => handleButtonClick('Settings')}
                    isFull={isFull}
                    title="Go to the settings"
                    aria-label="Settings"
                >
                    <FaGear /> {isFull && 'Setting'}
                </NewCustomButton>

            </ButtonList>

            <NewCustomButton
                handleClick={() => handleButtonClick('Logout')}
                title="Logout from the system"
                variant='solid'
                bg='colorPaletteFg'
                isFull={isFull}
            >
                <FaRightFromBracket /> {isFull && 'Log Out'}
            </NewCustomButton>
        </Flex>
    );
}

export default React.memo(SideMenu);