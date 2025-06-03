import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
    Flex,
    Button,
    Table,
    ActionBar,
    Checkbox,
    Kbd,
    Portal,
} from "@chakra-ui/react";

import { makeFullName } from '../../utils/stringUtils';

import { usePersone } from '../../hooks/usePersone';
import { usePersonsList } from '../../hooks/usePersonsList';



function CardsList() {


    const [clickTimeout, setClickTimeout] = useState(null);

    const { editPersone, onResetPersone, getPersonsData } = usePersone()
    const { personsList, activePerson, selectedPersons, hasSelected, indeterminate, fetchPersonsList, onChangeSelection, onSelectAll, onClearSelection, isItemSelected, onChangeActive } = usePersonsList()

    // const personsList = useSelector(state => state.personsList.data)

    const handleClick = useCallback((e, item) => {
        console.log('activePerson', activePerson)
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            setClickTimeout(null);
            return;
        }

        setClickTimeout(setTimeout(() => {
            if (item.employee_id === activePerson) {
                onChangeActive(null);
                onResetPersone();
            } else if (e.target.tagName === 'TD') {
                onChangeActive(item.employee_id);
                getPersonsData(item.employee_id);
            }
            setClickTimeout(null);
        }, 200));

    }, [activePerson, clickTimeout, onResetPersone, onChangeActive, getPersonsData]);

    const handleDoubleClick = useCallback(async (e, item) => {

        if (clickTimeout) {
            clearTimeout(clickTimeout);
            setClickTimeout(null);
        }

        if (e.target.tagName === 'TD') {
            onChangeActive(item.employee_id);
            getPersonsData(item.employee_id);
            editPersone();
        }

    }, [clickTimeout, editPersone, getPersonsData, onChangeActive]);


    useEffect(() => {
        fetchPersonsList()
    }, [])


    const rows = useMemo(() => personsList.map((item) => {

        const isSelected = isItemSelected(item.employee_id)
        const isActive = item.employee_id === activePerson

        return (

            <Table.Row
                key={item.employee_id}
                bg={isActive ? 'gold' : isSelected ? 'blue.50' : 'white'}
                data-selected={isSelected ? "" : undefined}
                onClick={(e) => {
                    handleClick(e, item)
                }}
                onDoubleClick={(e) => {
                    handleDoubleClick(e, item)
                }}
                cursor={'pointer'}
                _hover={{ bg: isActive ? 'gold' : 'gray.50' }}
            >
                <Table.Cell>
                    <Checkbox.Root
                        size="sm"
                        top="0.5"
                        aria-label="Select row"
                        checked={selectedPersons.includes(item.employee_id)}
                        onCheckedChange={(changes) => onChangeSelection(item.employee_id, changes.checked)}>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                    </Checkbox.Root>
                </Table.Cell>
                <Table.Cell>{item.employee_id}</Table.Cell>
                <Table.Cell>{makeFullName(item.first_name, item.last_name, item.surname)}</Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.address}</Table.Cell>
                <Table.Cell>{item.country_code}</Table.Cell>

            </Table.Row >
        )
    }), [personsList,
        activePerson,
        selectedPersons,
        isItemSelected,
        onChangeSelection,
        handleClick,        // Now stable between renders
        handleDoubleClick]);

    return (
        <Flex padding={'0 20px'} bg={'white'}>
            <Table.Root borderRadius={'8px'} padding={'20px'}>
                <Table.Header borderRadius={'8px'} position={'sticky'} top={'60px'} zIndex={1} >
                    <Table.Row bg={'whiteAlpha.700'} backdropFilter={'blur(10px)'} boxShadow={'0 1px 0 0 #ddd'}>
                        <Table.ColumnHeader w="6">
                            <Checkbox.Root
                                size="sm"
                                top="0.5"
                                aria-label="Select all rows"
                                checked={
                                    indeterminate ? "indeterminate" : selectedPersons.length > 0
                                }
                                onCheckedChange={(changes) => changes.checked ? onSelectAll() : onClearSelection()}
                            >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />
                            </Checkbox.Root>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>Card Number</Table.ColumnHeader>
                        <Table.ColumnHeader>Full Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Title</Table.ColumnHeader>
                        <Table.ColumnHeader>Address</Table.ColumnHeader>
                        <Table.ColumnHeader>Country Code</Table.ColumnHeader>

                    </Table.Row>
                </Table.Header>
                <Table.Body>{rows}</Table.Body>
            </Table.Root>

            <ActionBar.Root open={hasSelected}>
                <Portal>
                    <ActionBar.Positioner>
                        <ActionBar.Content>
                            <ActionBar.SelectionTrigger>
                                {selectedPersons.length} selected
                            </ActionBar.SelectionTrigger>
                            <ActionBar.Separator />
                            <Button variant="outline" size="sm">
                                Delete <Kbd>⌫</Kbd>
                            </Button>
                            <Button variant="outline" size="sm">
                                Share <Kbd>T</Kbd>
                            </Button>
                        </ActionBar.Content>
                    </ActionBar.Positioner>
                </Portal>
            </ActionBar.Root>

        </Flex>
    )
}

export default React.memo(CardsList)
