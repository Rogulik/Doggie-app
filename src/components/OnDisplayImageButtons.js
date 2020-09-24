import React, { useContext } from 'react'
import DoggieContext from '../context/doggieContext'



const OnDisplayImageButtons = ({closeModal}) => {
    const {doggieState, modalState} = useContext(DoggieContext)
     //click event to change the image
    const onClickShuffleImg = () => {
        doggieState.dispatchDoggie({
            type: "GET_SINGLE_IMAGE",
            payload: doggieState.doggies.imgList[Math.floor((Math.random() * doggieState.doggies.imgList.length))]
        })
    }
    //clear the image from the view
    const onClickClearStateCloseModal = () => {
        closeModal()
    }
    return (
        <div className='image__buttons'>
                <button className='image__buttons-item' onClick={onClickShuffleImg}>Fetch {doggieState.doggies.singleDoggie} again!</button>
                <button className='image__buttons-item' onClick={onClickClearStateCloseModal}>Close</button>
        </div>
    )
}

export default OnDisplayImageButtons
