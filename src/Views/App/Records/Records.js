import FuzzySearch from "fuzzy-search";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ReactTable from "react-table";
import Loader from "../../../Components/Loader/Loader";
import useModalManager from "../../../Hooks/useModalManager";
import useRequest from "../../../Hooks/useRequest";
import useRoleManagement from "../../../Hooks/useRoleManagement";
import GeneralLayout from "../../../Layouts/InnerLayouts/GeneralLayout";
import DeleteRecordModal from "../../../Modal/Record/DeleteRecordModal/DeleteRecordModal";
import NewRecordModal from "../../../Modal/Record/NewRecordModal/NewRecordModal";
import ViewRecordModal from "../../../Modal/Record/ViewRecordModal/ViewRecordModal";
import { Endpoints } from "../../../Utils/Endpoints";
import { getTrProps, showModal } from "../../../Utils/GeneralFunctions";
import { ModalNames } from "../../../Utils/ModalNames";
import { RecordColumns } from "./RecordColumns";

const Records = () => {

    const post = useRequest();
    const { isAdmin } = useRoleManagement();

    const { onModalUpdate: onNewModalUpdate } = useModalManager(ModalNames.NewRecordModal);
    const { onModalUpdate: onViewModalUpdate } = useModalManager(ModalNames.ViewRecordModal);
    const { onModalUpdate: onDeleteModalUpdate } = useModalManager(ModalNames.DeleteRecordModal);

    const [loaded, setLoaded] = useState(false);
    const [records, setRecords] = useState([]);
    const [recordsSearch, setRecordsSearch] = useState([]);

    const searcher = new FuzzySearch(records, ['recordNumber', 'user.nombre', 'user.lastname', 'machine.name', 'tirada', 'startDate', 'endDate']);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (loaded) {
            onNewModalUpdate('hidden', () => fetchData());
            onViewModalUpdate('hidden', () => fetchData());
            onDeleteModalUpdate('hidden', () => fetchData());
        }
    }, [loaded]);

    const fetchData = () => {
        post(Endpoints.GET_ALL_RECORDS, {}, true)
            .then(res => {
                if (res.status) {
                    setRecords(res.records);
                    setRecordsSearch(res.records);
                }
                setLoaded(true);
            })
    }

    const handleSearch = (e) => {
        const { value } = e.target;
        let recordFound = []
        if (value) recordFound = searcher.search(value);
        else recordFound = [...records];
        setRecordsSearch(recordFound);
    }


    if (!loaded) return <Loader />
    return (
        <>
            <NewRecordModal />
            <ViewRecordModal />
            <DeleteRecordModal />

            < GeneralLayout title="Lista de registros"
                rightSection={(
                    <>
                        <Button className="d-none d-md-flex" onClick={() => showModal(ModalNames.NewRecordModal)} variant="secondary">Nuevo registro</Button>
                        <Button className="d-flex d-md-none" onClick={() => showModal(ModalNames.NewRecordModal)} variant="secondary">Añadir</Button>
                    </>
                )}>

                <Row className='mb-2 d-flex flex-row-reverse'>
                    <Col sm={12} md={6} xl={3}>
                        <Form.Group>
                            <Form.Control
                                onChange={handleSearch}
                                placeholder="Buscar..." />
                        </Form.Group>
                    </Col>
                </Row>
                <ReactTable
                    showPageSizeOptions={false}
                    defaultPageSize={10}
                    data={recordsSearch}
                    getTrProps={getTrProps}
                    columns={RecordColumns(isAdmin)} />
            </GeneralLayout>
        </>
    )
}

export default Records;