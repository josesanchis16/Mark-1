import React, { useState } from 'react';
import { Button, Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap';
import ReactTable from 'react-table';
import { GlobalConfig } from '../../Configuration';
import { getTrProps } from '../../Utils/GeneralFunctions';

const CustomTable = ({ totalPages, data, columns, onEventHandle }) => {

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);

    const handleOnEvent = (e) => {
        e && e.preventDefault();
        onEventHandle(0, search);
    }

    const handleOnPage = (newPage) => {
        setPage(newPage);
        onEventHandle(newPage, search);
    }

    return (
        <div className='p-1 w-100 d-flex flex-column justify-content-center align-items-end'>
            <Row className='d-flex justify-content-end w-100 mx-0'>
                <Col sm={12} md={4} lg={3} xl={2} className="px-0">
                    <Form onSubmit={handleOnEvent} className="w-100">
                        <FormGroup className='mb-2'>
                            <FormControl
                                className='shadow-none'
                                size="sm"
                                onChange={e => setSearch(e.target.value)}
                                placeholder='Search...' />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <ReactTable
                className='w-100'
                showPageSizeOptions={false}
                defaultPageSize={GlobalConfig.perPage}
                getTrProps={getTrProps}
                data={data}
                showPagination={false}
                showPageJump={false}
                columns={columns} />
            <div className='mt-2 d-flex w-100 justify-content-between align-items-center'>
                <Button disabled={page + 1 === 1} onClick={() => handleOnPage(page - 1)} variant="secondary" size="sm">Anterior</Button>
                <p className='mb-0'>{(page + 1) > totalPages ? totalPages : page + 1} de {totalPages}</p>
                <Button disabled={page + 1 === totalPages} onClick={() => handleOnPage(page + 1)} variant="secondary" size="sm">Siguiente</Button>
            </div>
        </div>
    )
}
export default CustomTable;