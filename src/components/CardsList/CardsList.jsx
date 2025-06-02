import React, { useState, useEffect, useMemo } from 'react'
import {
    Flex,
    Button,
    Table,
    ActionBar,
    Checkbox,
    Kbd,
    Portal,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPersons } from '../../features/personsList/personsListSlice';
import { makeFullName } from '../../utils/stringUtils';
import { fetchFingers, fetchEyes, fetchText } from '../../features/persone/personeSlice';
import { resetPersone } from "../../features/persone/personeSlice";



function CardsList({ setSelection, selection, indeterminate, hasSelection }) {

    const [activeId, setActiveId] = useState(null);
    const dispatch = useDispatch()
     
   
    const personsList = useSelector(state => state.personsList.data)

    const handleClick = (e, item) => {
        if (item.employee_id === activeId) {
            setActiveId(null)
            dispatch(resetPersone())
        } else if (e.target.tagName === 'TD') {
            setActiveId(item.employee_id)
            dispatch(fetchFingers(item.employee_id))
            dispatch(fetchEyes(item.employee_id))
            dispatch(fetchText(item.employee_id))
        }
    }

    // const getPersoneData = (e, item) => {
    //     if (e.target.tagName === 'TD') {
    //         setActiveId(item.employee_id)
    //         dispatch(fetchFingers(item.employee_id))
    //         dispatch(fetchEyes(item.employee_id))
    //         dispatch(fetchText(item.employee_id))
    //     }
    // }

    useEffect(() => {
       dispatch(fetchPersons())
    }, [])

    // useEffect(() => {
    //     dispatch(fetchPersons())
    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(fetchFingers(activeId))

    const rows = useMemo(() => personsList.map((item) => {
        const isSelected = selection.includes(item.employee_id)
        const isActive = item.employee_id === activeId

        return (

            <Table.Row
                key={item.employee_id}
                bg={isActive ? 'gold' : isSelected ? 'blue.50' : 'white'}
                data-selected={isSelected ? "" : undefined}
                onClick={(e) => {
                    handleClick(e, item)
                }}
                cursor={'pointer'}
                _hover={{ bg: isActive ? 'gold' : 'gray.50' }}
            >
                <Table.Cell>
                    <Checkbox.Root
                        size="sm"
                        top="0.5"
                        aria-label="Select row"
                        checked={selection.includes(item.employee_id)}
                        onCheckedChange={(changes) => {
                            setSelection((prev) =>
                                changes.checked
                                    ? [...prev, item.employee_id]
                                    : selection.filter((id) => id !== item.employee_id)
                            );
                        }}


                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                    </Checkbox.Root>
                </Table.Cell>
                <Table.Cell>{item.employee_id}</Table.Cell>
                <Table.Cell>{makeFullName(item.first_name, item.last_name, item.surname)}</Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.address}</Table.Cell>
                <Table.Cell>{item.country_code}</Table.Cell>

            </Table.Row>
        )
    }), [personsList, activeId, selection]);

    return (
        <Flex padding={'0 20px'} bg={'white'}>
            <Table.Root borderRadius={'8px'} padding={'20px'}>
                <Table.Header borderRadius={'8px'} position={'sticky'} top={'60px'}  zIndex={1} >
                    <Table.Row bg={'whiteAlpha.700'} backdropFilter={'blur(10px)'} boxShadow={'0 1px 0 0 #ddd'}>
                        <Table.ColumnHeader w="6">
                            <Checkbox.Root
                                size="sm"
                                top="0.5"
                                aria-label="Select all rows"
                                checked={
                                    indeterminate ? "indeterminate" : selection.length > 0
                                }
                                onCheckedChange={(changes) => {
                                    setSelection(
                                        changes.checked ? personsList.map((item) => item.employee_id) : []
                                    );
                                }}
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

            <ActionBar.Root open={hasSelection}>
                <Portal>
                    <ActionBar.Positioner>
                        <ActionBar.Content>
                            <ActionBar.SelectionTrigger>
                                {selection.length} selected
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
