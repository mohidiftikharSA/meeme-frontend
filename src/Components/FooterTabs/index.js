import React from 'react'
import { Modal} from 'react-bootstrap'
import TabDetails from 'Components/Tabs'

const FooterTabs = (props) => {
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
          <i className="fa fa-angle-left" aria-hidden="true"></i>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='subTitle' style={{background:'transparent' , padding: '0' , margin: '0'}}  >
        <TabDetails isPublic footer tabTitle={props.tabTitles}/>
      </Modal.Body>
    </Modal>
  )
}

export default FooterTabs

