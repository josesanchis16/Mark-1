import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { InputColumns } from "../../../Utils/InputColumns";
import { ModalNames } from "../../../Utils/ModalNames";

const InputInfoModal = () => {

    return (
        <ModalLayout
            title="Entradas disponibles"
            id={ModalNames.InputInfo}>
            <ListGroup>
                {InputColumns.map((item, index) => (
                    <ListGroupItem key={index} className="border py-1">
                        <p className="mb-0">{item}</p>
                    </ListGroupItem>
                ))}

            </ListGroup>
        </ModalLayout>
    )
}
export default InputInfoModal;