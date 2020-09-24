
const ModalReducer = (state, action) => {
    switch(action.type){
        case 'OPEN_MODAL':
            return {
                modalControl: true
            }
        case 'CLOSE_MODAL':
            return {
                modalControl: false
            }
        default:
            return state
    }
}

export default ModalReducer