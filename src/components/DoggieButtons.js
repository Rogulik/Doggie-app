import React, { useContext, useEffect } from 'react'
import '../styles/DoggieButtons.scss'
import DoggieContext from '../context/doggieContext'
import axios from 'axios'


const Buttons = () => {
    //access to global state
   const {doggieState, modalState} = useContext(DoggieContext)

    useEffect(() => {
        doggieState.dispatchDoggie({
            type: "GET_SINGLE_IMAGE",
            //getting radnom image of specific breed for the view
            payload: doggieState.doggies.imgList[Math.floor((Math.random() * doggieState.doggies.imgList.length))]
        })
    },[doggieState.doggies.imgList])

    useEffect(() => {
        let arr = []
        const doggiesList = async () => {
            try {
                //getting the names with the sub breeds if they exists on the dog if not display only breed
                const { data } = await axios.get('https://dog.ceo/api/breeds/list/all')
                for (const [key, value] of Object.entries(data.message)) {
                    if(value.length > 0){
                        value.map(i => arr.push(`${i} ${key}`.trim()))
                    } else if (value.length === 0) {
                        arr.push(`${key} ${value}`.trim())
                    }   
                doggieState.dispatchDoggie({
                    type: "POPULATE_DOGGIES",
                    payload: arr
                })
                
            }
            } catch (error) {
                doggieState.dispatchDoggie({
                    type: "FETCHING_ERROR",
                    payload: error.response
                })
            }        
    }
        doggiesList()
        
    }, [])
    //click event for showing the first image when clicking on name of the dog
    const onClickShowImg = (e) => {
        modalState.dispatchModal({
            type:'OPEN_MODAL'
        })
        doggieState.dispatchDoggie({
            type:"GET_SINGLE_DOGGIE",
            payload: e.target.name
        })
    }
   return doggieState.doggies.doggieList.length > 0 ? (
        <div className="buttons__container">
            {doggieState.doggies.doggieList.map(i => (
                <button 
                className="buttons__item"
                key={i}
                name={i}
                onClick={ (e) => onClickShowImg(e)}
                >
                    {i}
                </button>
            ))}
        </div>
    ) : <div>
        <p>Loading...</p>
    </div>
}

export default Buttons
