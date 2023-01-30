import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomTable from "../../../../Components/CustomTable/CustomTable";
import useMessageAlert from "../../../../Hooks/useMessageAlert";
import useModalManager from "../../../../Hooks/useModalManager";
import useRequest from "../../../../Hooks/useRequest";
import GeneralLayout from "../../../../Layouts/InnerLayouts/GeneralLayout";
import DeleteMachineModal from "../../../../Modal/Machine/DeleteMachineModal/DeleteMachineModal";
import { NEW_MACHINE_PATH } from "../../../../Paths";
import { Endpoints, FolderName } from "../../../../Utils/Endpoints";
import { ModalNames } from "../../../../Utils/ModalNames";
import { MachinesColumns } from "./MachinesColumns";


const Machines = () => {

    const request = useRequest();

    const { MessageElement, setMessage } = useMessageAlert('allMachinesErrorMessage');

    const { onModalUpdate } = useModalManager(ModalNames.DeleteMachineModal);

    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { onModalUpdate('hidden', fetchData) }, [])
    useEffect(() => { fetchData() }, []);

    const fetchData = (page = 0, search = '') => {
        request('get', Endpoints(FolderName.MACHINES).GET_ALL, { page, search }, true)
            .then(res => {
                setData(res.machines);
                setTotalPages(res.totalPages);
                setLoaded(true);
            }).catch(e => setMessage(e, setLoaded))
    }

    return (
        <>
            {/* Modal */}
            <DeleteMachineModal />

            {/* Content */}
            <GeneralLayout
                title="Máquinas"
                ErrorElement={MessageElement}
                rightSection={(
                    <Button size="sm" as={Link} to={NEW_MACHINE_PATH}>+ Nueva máquina</Button>
                )}>

                <CustomTable
                    onEventHandle={fetchData}
                    totalPages={totalPages}
                    data={data}
                    columns={MachinesColumns()} />
            </GeneralLayout>
        </>
    )
}

export default Machines;