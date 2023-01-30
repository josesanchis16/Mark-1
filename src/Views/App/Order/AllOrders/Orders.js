import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CustomTable from '../../../../Components/CustomTable/CustomTable'
import useMessageAlert from '../../../../Hooks/useMessageAlert'
import useRequest from '../../../../Hooks/useRequest'
import GeneralLayout from '../../../../Layouts/InnerLayouts/GeneralLayout'
import NewOrderModal from '../../../../Modal/Order/NewOrderModal/NewOrderModal'
import { NEW_ORDER_PATH } from '../../../../Paths'
import { Endpoints, FolderName } from '../../../../Utils/Endpoints'
import { OrdersColumns } from './OrdersColumns'

const Orders = () => {

    const request = useRequest();

    const { MessageElement, setMessage } = useMessageAlert('allOrderMessageError');

    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { fetchData() }, []);

    const fetchData = (page = 0, search = '') => {
        request('get', Endpoints(FolderName.ORDER).GET_ALL, { page, search }, true)
            .then(res => {
                setOrders(res.orders);
                setTotalPages(res.totalPages);
                setLoaded(true);
            }).catch(e => setMessage(e, setLoaded))
    }

    return (
        <>
            {/* Modals */}
            <NewOrderModal />

            {/* Content */}
            <GeneralLayout
                loaded={loaded}
                ErrorElement={MessageElement}
                title="Órdenes de trabajo"
                rightSection={(
                    <Button as={Link} to={NEW_ORDER_PATH} size="sm">+ Nueva orden</Button>
                )
                }>

                <CustomTable
                    onEventHandle={fetchData}
                    data={orders}
                    columns={OrdersColumns()}
                    totalPages={totalPages}
                />
            </GeneralLayout >
        </>
    )
}

export default Orders;