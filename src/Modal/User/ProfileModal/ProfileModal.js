import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalLayout from "../../../Layouts/ModalLayout/ModalLayout";
import { EDIT_USER_PATH } from "../../../Paths";
import { hideModals, logout } from "../../../Utils/GeneralFunctions";
import { ModalNames } from "../../../Utils/ModalNames";

const ProfileModal = () => {

    const { email, guid, profile: { name, lastname } } = useSelector(state => state.User);

    const handleSignOut = () => {
        logout()
    }

    return (
        <ModalLayout
            id={ModalNames.ProfileModal}>
            <div className="p-3">
                <Button variant="outline-secondary" className="border-0" onClick={hideModals} style={{ position: 'absolute', top: 10, right: 10, width: 50, aspectRatio: 1 }}>
                    <Icon path={mdiClose} />
                </Button>
                <div className="py-4 d-flex flex-column justify-content-center align-items-center w-100">
                    <img src="https://picsum.photos/512/512" className="rounded-circle" style={{ width: 128, aspectRatio: 1 }} />

                    <div className="d-flex flex-column justify-content-center align-items-items mt-4">
                        <h4 className="text-center ">{`${name} ${lastname}`}</h4>
                        <p className="mb-0 text-center">{email}</p>
                    </div>

                    <div className="w-100 d-flex justify-content-center align-items-center flex-column mt-4 p-1">
                        <Button
                            as={Link}
                            to={EDIT_USER_PATH.replace(":guid", guid)}
                            onClick={hideModals}
                            variant="outline-secondary"
                            className="border-0 m-1 w-100">
                            Ver Perfil
                        </Button>
                        {/* <div className="border-bottom w-100 my-1" /> */}
                        <Button onClick={handleSignOut} variant="outline-danger" className="border-0 m-1 w-100">Cerrar sesión</Button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default ProfileModal;