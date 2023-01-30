import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { Button } from "react-bootstrap";
import { hideModals } from "../../Utils/GeneralFunctions";

const ModalLayout = ({ footer, title, hideCloseButton, id, size, children }) => {
    return (
        <div className="modal fade" id={id} tabindex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
            <div className={`modal-dialog modal-${size}`}>
                <div className="modal-content p-0">
                    {title &&
                        <div className="px-2 py-1 modal-header d-flex justify-content-between align-items-center w-100">
                            <h4 className="mb-0">{title}</h4>
                            {!hideCloseButton &&
                                <Button variant="link" onClick={hideModals}>
                                    <Icon path={mdiClose} size="20" color="red" />
                                </Button>
                            }
                        </div>
                    }
                    <div className="modal-body p-0">
                        {children}
                    </div>
                    {footer &&
                        <div className="modal-footer">
                            {footer}
                        </div>
                    }
                </div>
            </div >
        </div >
    )
}

export default ModalLayout;