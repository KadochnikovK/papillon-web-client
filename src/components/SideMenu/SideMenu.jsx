import React, { useCallback } from 'react';
import { Flex, Text, Image, Float } from '@chakra-ui/react';
import logo from '../../content/images/logo.png';
import CustomButton from '../ui/Button/CustomButton';
import DocumentIcon from '../../content/images/icons/Document.svg';
import SettingIcon from '../../content/images/icons/Setting.svg';
import ButtonList from './components/ButtonList/ButtonList';
import LogoutIcon from '../../content/images/icons/Logout-w.svg';

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
            p={isFull ? '32px' : '32px 16px'}
            gap="60px"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" // Плавная анимация
            boxShadow="md"
            // overflow="hidden" 
        >
            <Float 
                offsetY="48px" 
                // offsetX="20px" 
                onClick={toggleMenu}
                aria-label={isFull ? 'Collapse menu' : 'Expand menu'}
                cursor="pointer"
                p={2}
                _hover={{ bg: 'gray.100' }}
                borderRadius="md"
                transition="transform 0.3s ease"
                _active={{ transform: 'scale(0.95)' }}
            >
                {isFull ? '←' : '→'}
            </Float>

            <Flex alignItems="center" justifyContent={isFull ? 'start' : "center"} gap={isFull ? '10px' : ''} minH="42px">
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
                <Text 
                    fontSize="lg" 
                    color="main" 
                    fontWeight="700"
                    opacity={isFull ? 1 : 0}
                    transition="opacity 0.2s ease, width 0.3s ease"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    w={isFull ? 'auto' : '0'}
                >
                    Papillon
                </Text>
            </Flex>

            <ButtonList>
                <CustomButton 
                    handleClick={() => handleButtonClick('Carts List')} 
                    icon={DocumentIcon} 
                    title="Go to the carts list" 
                    isFull={isFull}
                    aria-label="Carts List"
                >
                    Carts List
                </CustomButton>
                <CustomButton 
                    handleClick={() => handleButtonClick('Settings')} 
                    icon={SettingIcon} 
                    title="Go to the settings" 
                    isFull={isFull}
                    aria-label="Settings"
                >
                    Setting
                </CustomButton>
            </ButtonList>

            <CustomButton 
                handleClick={() => handleButtonClick('Logout')} 
                icon={LogoutIcon} 
                title="Logout from the system" 
                isFull={isFull} 
                isColor
                aria-label="Logout"
                mt="auto"
                mb={4}
            >
                Log Out
            </CustomButton>
        </Flex>
    );
}

export default React.memo(SideMenu);