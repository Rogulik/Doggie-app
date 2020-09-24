
const DoggieReducer = (state, action) => {
    switch(action.type){
        case "POPULATE_DOGGIES":
            return {
                ...state,
                doggieList: action.payload,
                isLoading: false
            }
        case "GET_SINGLE_DOGGIE":
            return {
                ...state,
                singleDoggie: action.payload,
                isLoading: false
            }
        case "POPULATE_IMAGES":
            return {
                ...state,
                imgList: action.payload,
                isLoading: false
            }
        case "GET_SINGLE_IMAGE":
            return {
                ...state,
                singleImg: action.payload
            }
        case "FETCHING_ERROR":
            return {
            singleDoggie: "",
            doggieList: [],
            singleImg:"",
            imgList: [],
            error: {msg: action.payload},
            isLoading: true
        }
        default:
            return state
    }
}

export default DoggieReducer