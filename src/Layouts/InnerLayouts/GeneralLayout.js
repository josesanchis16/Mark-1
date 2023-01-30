import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { GlobalConfig } from "../../Configuration";
import { getCanScreenGoBackAction, getSetCurrentPageTitleAction } from "../../Redux/Reducers/Config/Actions";
import store from "../../Redux/store";

const id = Math.round(Date.now());
const GeneralLayout = ({ loaded, ErrorElement, SuccessElement, children, showBackButton, title = '', rightSection, isPanel = true }) => {

    const { goBack } = useHistory();

    useEffect(() => { store.dispatch(getCanScreenGoBackAction(showBackButton)) }, [])
    useEffect(() => { store.dispatch(getSetCurrentPageTitleAction(title)) }, [title])

    const renderChildren = () => (
        <>
            {ErrorElement && <ErrorElement />}
            {SuccessElement && <SuccessElement />}
            <div className={`${isPanel ? 'p-1 p-md-4' : ''}`}>
                {children}
            </div>
        </>
    )

    return (
        <Card id={`mainCard_${id}`} className={`border-0 mx-0 mx-md-2 my-3 bg-${GlobalConfig.theme.generalLayout}`}>
            {(title || showBackButton || rightSection) &&
                <Card.Header
                    id={`card-header-${id}`}
                    className="border-bottom-0 w-100 d-flex justify-content-center align-items-center"
                    style={{ zIndex: 9, top: 0, background: 'transparent' }}>
                    <Row className="w-100">
                        <Col sm={12} md={6} className="my-1">
                            <div className="d-flex justify-content-center justify-content-md-start align-items-center">
                                {showBackButton &&
                                    <div
                                        className="d-none d-md-flex"
                                        style={{ cursor: 'pointer' }}
                                        onClick={goBack}>
                                        <Icon path={mdiArrowLeft}
                                            size="20" />
                                    </div>
                                }
                                <Card.Title style={{ textTransform: 'capitalize' }} as="h4" className="text-center mb-0 ms-md-2 ms-0">{title}</Card.Title>
                            </div>
                        </Col>
                        <Col sm={12} md={6} className="my-1">
                            <div className="d-flex justify-content-center justify-content-md-end align-items-center">
                                {rightSection}
                            </div>
                        </Col>
                    </Row>
                </Card.Header>
            }
            <Card.Body className={`mb-3 ${isPanel ? 'p-1 p-md-0 bg-white rounded shadow overflow-hidden' : ''}`}>
                {loaded === true
                    ? renderChildren()
                    : loaded === false
                        ? <Loader />
                        : renderChildren()}
            </Card.Body>
        </Card>
    )
}

export default GeneralLayout;