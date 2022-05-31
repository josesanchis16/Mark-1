import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import { getCanScreenGoBackAction, getSetCurrentPageTitleAction } from "../../Redux/Reducers/Config/Actions";
import store from "../../Redux/store";

const id = Math.round(Date.now());
const GeneralLayout = ({ children, showBackButton, title = 'This will be the title', rightSection }) => {

    const history = useHistory();

    useEffect(() => {
        store.dispatch(getCanScreenGoBackAction(showBackButton));
        store.dispatch(getSetCurrentPageTitleAction(title));
    }, [])

    return (
        <Card className="border-0 mx-2 mt-3 mb-3">
            {(title || showBackButton || rightSection) &&
                <Card.Header id={`card-header-${id}`} className="w-100 bg-white d-flex justify-content-between align-items-center bg-white"
                    style={{
                        zIndex: 9,
                        top: 0,
                    }}>
                    <div className="d-flex justify-content-start align-items-center">
                        {showBackButton &&
                            <div style={{ cursor: 'pointer' }} onClick={() => history.goBack()}>
                                <Icon path={mdiArrowLeft}
                                    size="20" />
                            </div>
                        }
                        <Card.Title as="h4" className="mb-0 ms-2">{title}</Card.Title>
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                        {rightSection}
                    </div>
                </Card.Header>
            }
            <Card.Body className="px-4">
                {children}
            </Card.Body>
        </Card>
    )
}

export default GeneralLayout;