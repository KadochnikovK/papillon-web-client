import React, { useEffect } from 'react'
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



function CardsList({ setSelection, selection, indeterminate, hasSelection }) {

    const items = useSelector(state => state.personsList.data);
    console.log(items)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPersons())
    }, []) 

    const rows = items.map((item) => (
        <Table.Row
            key={item.id}
            data-selected={selection.includes(item.id) ? "" : undefined}
            onClick={(e) => { if (e.target.tagName === 'TD') {console.log('Selected cart: ', item,e.target.tagName )}}}
            cursor={'pointer'}
        >
            <Table.Cell>
                <Checkbox.Root
                    
                    size="sm"
                    top="0.5"
                    aria-label="Select row"
                    checked={selection.includes(item.id)}
                    onCheckedChange={(changes) => {
                        
                        setSelection((prev) =>
                            changes.checked
                                ? [...prev, item.id]
                                : selection.filter((id) => id !== item.id)
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
    ));
    return (
        <Flex padding={'0 20px'} bg={'white'}>
            <Table.Root borderRadius={'8px'} padding={'20px'}>
                <Table.Header borderRadius={'8px'}>
                    <Table.Row>
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
                                        changes.checked ? items.map((item) => item.id) : []
                                    );
                                }}
                            >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />
                            </Checkbox.Root>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>Cart Number</Table.ColumnHeader>
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
