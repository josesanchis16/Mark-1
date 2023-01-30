import React, { useEffect, useState } from 'react';
import { Button, Col, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import RequiredField from '../../../../../Components/RequiredField/RequiredField';
import useMessageAlert from '../../../../../Hooks/useMessageAlert';
import useRequest from '../../../../../Hooks/useRequest';
import CardFooter from '../../../../../Layouts/InnerLayouts/CardFooter';
import GeneralLayout from '../../../../../Layouts/InnerLayouts/GeneralLayout';
import InputInfoModal from '../../../../../Modal/Settings/InputsInfo/InputsInfoModal';
import { SETTINGS_INPUTS_PATH } from '../../../../../Paths';
import { Endpoints, FolderName } from '../../../../../Utils/Endpoints';
import { showModal } from '../../../../../Utils/GeneralFunctions';
import { ModalNames } from '../../../../../Utils/ModalNames';

const EditInput = () => {

    const { replace } = useHistory();
    const { guid } = useParams();
    const request = useRequest();

    const { MessageElement, setMessage } = useMessageAlert('newInputErrorMessage');

    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        request('get', Endpoints(FolderName.INPUT).GET, { guid }, true)
            .then(res => {
                setData(res.input);
                setLoaded(true);
            }).catch(e => setMessage(e, setLoaded))
    }, [])

    const handleText = e => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value })
    }

    const handleSubmit = () => {
        if (checkForm) {
            request('post', Endpoints(FolderName.INPUT).UPDATE, { ...data }, true)
                .then(res => replace(SETTINGS_INPUTS_PATH))
                .catch(setMessage)
        } else setMessage('Comprueba los campos requeridos')
    }

    const checkForm = () => {
        const { identifier, label } = data;
        return (!!identifier && !!label);
    }

    return (
        <>
            {/* Modal */}
            <InputInfoModal />

            {/* Content */}
            <GeneralLayout
                showBackButton
                ErrorElement={MessageElement}
                rightSection={(
                    <Button size="sm" variant='secondary' onClick={() => showModal(ModalNames.InputInfo)}>
                        <i className='material-icons'>&#xe887;</i>
                    </Button>
                )}
                title='Editar entrada'>
                {/* Identifier */}
                <FormGroup controlId="identifier" className="mb-3">
                    <Row>
                        <Col sm={12} lg={8}>
                            <FormLabel className='font-weight-bold'>Identificador: <RequiredField /></FormLabel>
                        </Col>
                        <Col sm={12} lg={4}>
                            <FormControl
                                value={data.identifier || ''}
                                onChange={handleText}
                                placeholder="Identificador..." />
                        </Col>
                    </Row>
                </FormGroup>

                {/* Title */}
                <FormGroup controlId="label" className="mb-3">
                    <Row>
                        <Col sm={12} lg={8}>
                            <FormLabel className='font-weight-bold'>Título de entrada: <RequiredField /></FormLabel>
                        </Col>
                        <Col sm={12} lg={4}>
                            <FormControl
                                value={data.label || ''}
                                onChange={handleText}
                                placeholder="Título..." />
                        </Col>
                    </Row>
                </FormGroup>

                <CardFooter>
                    <Button size="sm" onClick={handleSubmit}>Actualizar</Button>
                </CardFooter>
            </GeneralLayout >
        </>
    )
}

export default EditInput;