import React, { useState } from 'react'
import {
    Button,
    Table,
    ActionBar,
    Checkbox,
    Kbd,
    Portal,
} from "@chakra-ui/react";


function CardsList({ items, setSelection, selection, indeterminate, hasSelection }) {

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
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.cartNumber}</Table.Cell>
            <Table.Cell>{item.fullName}</Table.Cell>
            <Table.Cell>{item.fingerprints}</Table.Cell>
            <Table.Cell>{item.nationality}</Table.Cell>
            <Table.Cell>{item.address}</Table.Cell>
            <Table.Cell>{item.dateAdded}</Table.Cell>
            <Table.Cell>{item.type}</Table.Cell>
            <Table.Cell>{item.responsible}</Table.Cell>
        </Table.Row>
    ));
    return (
        <>
            <Table.Root borderRadius={'8px'}>
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
                        <Table.ColumnHeader>№</Table.ColumnHeader>
                        <Table.ColumnHeader>Cart Number</Table.ColumnHeader>
                        <Table.ColumnHeader>Full Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Fingerprints</Table.ColumnHeader>
                        <Table.ColumnHeader>Nationality</Table.ColumnHeader>
                        <Table.ColumnHeader>Address</Table.ColumnHeader>
                        <Table.ColumnHeader>Date Added</Table.ColumnHeader>
                        <Table.ColumnHeader>Type</Table.ColumnHeader>
                        <Table.ColumnHeader>Responsible</Table.ColumnHeader>
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
            {/* </HStack> */}
        </>
    )
}

export default CardsList
