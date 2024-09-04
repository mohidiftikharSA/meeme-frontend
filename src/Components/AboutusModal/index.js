import Logo from 'Components/Logo'
import React from 'react'
import { Modal } from 'react-bootstrap'

const AboutusModal = (props) => {
    const { onHide } = props;
    return (
        <Modal className='aboutModal'
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" onClick={onHide}>
                    <i className="fa fa-angle-left" aria-hidden="true" ></i>
                </Modal.Title>
            </Modal.Header>
            <h4 className='title'>About Us</h4>
            <Modal.Body className='subTitle'>
            <div className='aboutLogo py-3'><Logo/></div>
                <p>
                MeMee is set to amalgamate the ultimate social media platform with the best content online. Users can socialize by posting memes, and short funny clips which the population of MeMee judges and rates in routine MeMee tournaments. </p>
                <p>What sets MeMee apart from other social media is that everyone gets to earn rewards for the memes they post. These rewards are given out in the form of coveted MeMee coins. These coins can be redeemed in exchange for items at the MeMee store. Users who act as judges make these coins as much as they rate memes. </p>
                
                <p>The participants compete for the top cash prizes. The top hundred participants earn coins while the top 3 make impressive bank in the form of Amazon gift vouchers.</p>
                <p> MeMee is set to be your go-to app for an engaging game experience as well as to interact with your MeMee circle online. The app boasts some of the top features you could ask for. While filters and beautifying effects are all the range, this app takes things a notch further by giving all its users free access to an editing tool where you can make your memes from scratch and perfect the quality of the pictures and video snippets you upload.</p>
                <p>With the right features users can explore and expand the Meme ground during tournaments. MeMee may just become the hub for the most engaging content on the internet. </p> 
                
            </Modal.Body>
        </Modal>
    )
}

export default AboutusModal
