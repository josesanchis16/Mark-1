import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { Accordion, Button, Card, useAccordionButton } from 'react-bootstrap';
import { GlobalConfig } from '../../../../../Configuration';
import NavItem from './NavItem';

const NavParent = ({ item, onChildClick, active }) => {

    const [open, setOpen] = useState(false);

    const CustomHeader = ({ eventKey }) => {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            setOpen(open => !open)
        );

        return (
            <Button
                onClick={decoratedOnClick}
                variant='outline-secondary'
                className="w-100 shadow-none border-0 d-flex justify-content-between align-items-center">
                <div className='d-flex justify-content-start align-items-center w-100'>
                    <div className="pb-1">
                        <Icon
                            path={item.icon}
                            size="20" />
                    </div>
                    <div className="ms-2">
                        <p className="mb-0">
                            {item.title}
                        </p>
                    </div>
                </div >
                <div>
                    <Icon
                        size="20"
                        style={{
                            transform: open ? 'rotate(180deg)' : 'rotate(0)',
                            transition: '.5s'
                        }}
                        path={mdiChevronDown} />
                </div>
            </Button >
        );
    }

    return (
        <Accordion>
            <Card style={{ background: 'transparent' }} className="border-0">
                <CustomHeader eventKey='0' />
                <Accordion.Collapse eventKey="0" style={{ background: GlobalConfig.theme.mainLayout }}>
                    <Card.Body className='px-2 py-1'>
                        <ul style={{ listStyleType: 'none', }} className="p-0">
                            {item.children.map((item, index) => (
                                <li
                                    key={index}
                                    className="w-100 mb-2">
                                    {item.children
                                        ? <NavParent item={item} onChildClick={onChildClick} active={active} />
                                        : <NavItem active={active} onClick={onChildClick} item={item} />
                                    }
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion >
    )
}

export default NavParent;