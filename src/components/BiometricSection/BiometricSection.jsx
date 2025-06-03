// components/BiometricSection/BiometricSection.jsx
import { Flex, Heading } from '@chakra-ui/react';
import { FaFileExport } from "react-icons/fa6";
import { FaFingerprint } from "react-icons/fa6";

import NewCustomButton from '../ui/Button/NewCustomButton';
import Hands from '../ui/Biometric/Hands/Hands';
import Palms from '../ui/Biometric/Hands/Palms';
import Eyes from '../ui/Biometric/Eyes/Eyes';

export const BiometricSection = ({
    isEditing,
    onScanFingers,
    setImagePreview
}) => {
    return (
        <>
            {/* <Heading size="md">Biometric Data</Heading> */}

            <Flex flexDirection="column" gap="10px">
                <Flex display={isEditing ? "flex" : "none"}>
                    <NewCustomButton padding="10px" maxWidth="max-content"
                        handleClick={onScanFingers}>
                        <FaFileExport />
                    </NewCustomButton>
                     <NewCustomButton padding="10px" maxWidth="max-content"
                        handleClick={() => console.log('Началось сканирование с ДС-45')}>
                        <FaFingerprint />
                    </NewCustomButton>
                </Flex>
                <Hands setImagePreview={setImagePreview} />
                <Palms setImagePreview={setImagePreview} />
            </Flex>

            <Flex flexDirection="column" gap="10px" borderTop="1px solid lightGrey"
                paddingTop="10px">
                <Flex display={isEditing ? "flex" : "none"}>
                    <NewCustomButton padding="10px" maxWidth="max-content">
                        <FaFileExport />
                    </NewCustomButton>
                </Flex>
                <Eyes />
            </Flex>
        </>
    );
};