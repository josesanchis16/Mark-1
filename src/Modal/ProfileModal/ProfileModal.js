import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { DEFAULT_PATH } from "../../Paths";
import { hideModals } from "../../Utils/GeneralFunctions";
import { ModalNames } from "../../Utils/ModalNames";

const ProfileModal = () => {

    const { replace } = useHistory();

    const handleSignOut = () => {
        hideModals(replace(DEFAULT_PATH));
    }

    return (
        <div className="modal fade" id={ModalNames.ProfileModal} tabindex="-1" aria-labelledby={`${ModalNames.ProfileModal}Label`} aria-hidden="true">
            <div className="modal-dialog modal-md">
                <div className="modal-content">
                    <div className="modal-body d-flex flex-column justify-content-center align-items-center w-100 position-relative p-5">
                        <Button variant="outline-secondary" className="border-0" onClick={hideModals} style={{ position: 'absolute', top: 5, right: 5, width: 50, aspectRatio: 1 }}>
                            <Icon path={mdiClose} />
                        </Button>
                        <div className="d-flex flex-column justify-content-center align-items-center w-100">
                            <img src="https://picsum.photos/512/512" className="rounded-circle" style={{ width: 128, aspectRatio: 1 }} />

                            <div className="d-flex flex-column justify-content-center align-items-items mt-4">
                                <h4 className="text-center ">Jose Sanchis</h4>
                                <p className="mb-0 text-center">sanchisbeldajose@gmail.com</p>
                            </div>

                            <div className="w-100 d-flex justify-content-center align-items-center flex-column mt-4 border rounded p-1">
                                <Button variant="outline-secondary" className="border-0 m-1 w-100">Profile</Button>
                                <Button variant="outline-secondary" className="border-0 m-1 w-100">Edit Profile</Button>
                                <div className="border-bottom w-100 my-1" />
                                <Button variant="outline-secondary" className="border-0 m-1 w-100">Account Settings</Button>
                                <Button onClick={handleSignOut} variant="outline-danger" className="border-0 m-1 w-100">Sign out</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfileModal;