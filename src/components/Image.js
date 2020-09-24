import React, {useContext, useState} from 'react'
import {useUpdateEffect} from 'react-use';
import axios from 'axios'
import DoggieContext from '../context/doggieContext'
import '../styles/Image.scss'
import OnDisplayImageButtons from './OnDisplayImageButtons'
import Modal from 'react-modal'


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
    }
  };

const Image = () => {
    //access to global state from context
    const {doggieState, modalState} = useContext(DoggieContext)
    const [isLoading, setIsLoading] = useState(false)

    useUpdateEffect(() => {
        //it its only update then fetch the image from API
        const getImg = async () => {
            const splitBeedFromSubBreed = doggieState.doggies.singleDoggie.split(' ')
            try {
                //if the dog has sub-breeds load it too if not load only with single breed
                setIsLoading(true)
                const res = await axios.get(splitBeedFromSubBreed.length === 2 ?
                    `https://dog.ceo/api/breed/${splitBeedFromSubBreed[1]}/${splitBeedFromSubBreed[0]}/images` : 
                    `https://dog.ceo/api/breed/${doggieState.doggies.singleDoggie}/images`)

                 doggieState.dispatchDoggie({
                     type: "POPULATE_IMAGES",
                     payload: res.data.message
                 })
                 setIsLoading(false)
            } catch (error) {
                doggieState.dispatchDoggie({
                    type: "FETCHING_ERROR",
                    payload: error.response
                })
            }
        }
        getImg()

    },[doggieState.doggies.singleDoggie]);

    const closeModal = () => {
        modalState.dispatchModal({
            type: 'CLOSE_MODAL'
        })
    }

    return (
        <>
        {doggieState.doggies.singleDoggie ? (
            <Modal
            isOpen={modalState.modal.modalControl}
            onRequestClose={closeModal}
            ariaHideApp={false}
            contentLabel="Doggie image interface"
            style={customStyles}
            >
                {isLoading ? (  
                    <div>
                        <h3>Loading...</h3>
                    </div>
                ) : (
                    <div className='image'>
                        <OnDisplayImageButtons closeModal={closeModal}/> 
                        <img alt="doggie" className='image__displayed-item' src={doggieState.doggies.singleImg} />
                    </div>
                    )
                } 
            </Modal>
            ) : ""}
        </>
        )
}

export default Image
