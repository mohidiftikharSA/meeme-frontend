import { Button, Modal } from "react-bootstrap";
import icon from "../../Images/imagelogo.png"

export default function PostContentModal(props) {
  return (
    <Modal className={'PostContentModal'}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">
          <i className="fa fa-angle-left" aria-hidden="true"><span>Post a content</span></i>
          <Button className="btn">Continue</Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
            
        </div>
      </Modal.Body>
    </Modal>
  )
}
// import { Button, Modal } from "react-bootstrap";
// import Form from 'react-bootstrap/Form';
// import profilePost from "../../Images/profilePost.png";

// export default function PostContentModal(props) {
//   return (
//     <Modal className={'PostContentModal'}
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton={false}>
//         <Modal.Title id="contained-modal-title-vcenter">
//           <i className="fa fa-angle-left" aria-hidden="true" onClick={props.onHide}><span>Post a content</span></i>
//           <Button className="btn">Continue</Button>
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//       <Form>
//       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//         <Form.Control type="text" placeholder="Give this meme a title" />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//       <Form.Control type="text" placeholder="Description" />
//       </Form.Group>
//     </Form>
//       <div className="imgBox">
//       <img src={profilePost}alt="Icon"/></div>
//       <button className="trimbtn">Trim</button>
//       </Modal.Body>
//     </Modal>
//   )
// }


