const useModalManager = (id) => {
    const onModalUpdate = (action, callback) => {
        window.$(`#${id}`).on(`${action}.bs.modal`, () => {
            console.log(`Modal con el id: ${id} ha pasado a estado: ${action}`);
            callback && callback();
        });
    }

    const getModalData = (callback) => {
        let modalEl = window.$(`#${id}`);
        let data = null;
        modalEl.on(`show.bs.modal`, () => {
            console.log(`Modal con el id: ${id} ha recibido los siguientes datos: `, data);
            data = modalEl.data();
            return callback(data);
        });
    }

    return { onModalUpdate, getModalData }
};

export default useModalManager;