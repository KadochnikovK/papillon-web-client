import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import CustomInput from '../ui/CustomInput/CustomInput';
import Hands from '../ui/Biometric/Hands/Hands';
import Palms from '../ui/Biometric/Hands/Palms';
import Eyes from '../ui/Biometric/Eyes/Eyes';

function SideMenu({ isFull = true }) {
    const persone = useSelector(state => state.persone.data)
    const loading = useSelector(state => state.persone.loading)
    console.log(persone)

    return (
        <Flex
            id={'sideEdit'}
            // backdropFilter={'blur(10px)'}
            position="fixed"
            right={0}
            direction="column"
            bg={'white'}
            h="100vh"
            w={loading ? '0' : '100px'}
            zIndex="999"
            minW={isFull ? '300px' : '80px'}
            p={isFull ? '10px 32px' : '10px 16px'}
            gap="20px"
            transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
            boxShadow="md"
        >
            {
                loading
                    ?
                    <div className="loader"></div>
                    :
                    <>
                        {/* {Object.entries(persone.text).map(([key, value]) => <CustomInput label={key} value={value} />)} */}
                        <Hands />
                        <Palms />
                        <Eyes />
                    </>
            }

        </Flex>
    );
}

export default React.memo(SideMenu);