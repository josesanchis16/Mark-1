
const useMessageAlert = (id, variant = "danger") => {

    const MessageElement = ({ ...props }) => {
        return (
            <div id={id} style={{ display: 'none' }}>
                <p className="mb-0 text-white w-100 p-2 bg-danger"></p>
            </div>
        )
    }

    const setMessage = (msg, setLoaded = null) => {
        if (setLoaded) setLoaded(true);
        const element = window.$(`#${id}`);
        const child = window.$(`#${id} p`);
        child.text(`${msg}`);

        element.show('slow', () => {
            setTimeout(() => {
                element.hide('slow', () => { element.text('') })
            }, 5000);
        })

    }

    return { MessageElement, setMessage }
}

export default useMessageAlert;