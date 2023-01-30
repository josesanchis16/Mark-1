import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import Loader from '../../../Components/Loader/Loader';
import useModalManager from '../../../Hooks/useModalManager';
import useRequest from '../../../Hooks/useRequest';
import GeneralLayout from '../../../Layouts/InnerLayouts/GeneralLayout';
import NewArticleModal from '../../../Modal/Article/NewArticle/NewArticleModal';
import { Endpoints } from '../../../Utils/Endpoints';
import { getTrProps, showModal } from '../../../Utils/GeneralFunctions';
import { ModalNames } from '../../../Utils/ModalNames';
import { ArticlesColumns } from './ArticlesColumns';

const Articles = () => {

    const postData = useRequest();

    const { onModalUpdate } = useModalManager(ModalNames.NewArticleModal);

    const [articles, setArticles] = useState([]);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => { onModalUpdate('hidden', () => fetchData()) }, [])
    useEffect(() => { fetchData() }, [])

    const fetchData = () => {
        postData(Endpoints.GET_ALL_ARTICLES, {}, true)
            .then(res => {
                if (res.status) {
                    setLoaded(true);
                    setArticles(res.articles);
                } else {
                    //TODO: show error using message alert
                }
            })
    }

    if (!loaded) return <Loader />
    return (
        <>
            {/* Modals */}
            <NewArticleModal />

            {/* Content */}
            <GeneralLayout
                title='Artículos'
                rightSection={(
                    <Button variant="secondary" onClick={() => showModal(ModalNames.NewArticleModal)}>+ Nuevo artículo</Button>
                )}>
                <ReactTable
                    showPageSizeOptions={false}
                    defaultPageSize={10}
                    getTrProps={getTrProps}
                    data={articles}
                    columns={ArticlesColumns()} />
            </GeneralLayout>
        </>
    )
}

export default Articles;