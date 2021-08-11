import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditCarModal extends Component{
    constructor(props){
        super(props);
        this.state={ctgs:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }
    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;


    componentDidMount(){
        fetch(process.env.REACT_APP_API+'category')
        .then(response=>response.json())
        .then(data=>{
            this.setState({ctgs:data});
        });
    }




    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'car',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
             
               CarName:event.target.CarName.value,
               Category:event.target.Category.value,
               DateOfJoining:event.target.DateOfJoining.value,
               PhotoFileName:this.photofilename

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );



        fetch(process.env.REACT_APP_API+'Car/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }
    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
           Edit Car
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="CarName">
                        <Form.Label>CarName</Form.Label>
                        <Form.Control type="text" name="CarName" required 
                       
                        disabled
                        defaultValue={this.props.crname} 
                        placeholder="CarName"/>
                    </Form.Group>


                    <Form.Group controlId="Category">
                        <Form.Label>CategoryName</Form.Label>
                        <Form.Control type="text" name="CategoryName" required 
                        defaultValue={this.props.ctname}
                        placeholder="CategoryName"/>
                    </Form.Group>




                    <Form.Group controlId="DateOfJoining">
                        <Form.Label>DateOfJoining</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateOfJoining"
                        required
                        placeholder="DateOfJoining"
                        defaultValue={this.props.doj}
                        />


                      </Form.Group>


                    <Form.Group>
                    <Button variant="primary" type="submit">
                           Update Car
                     </Button>
                     </Form.Group>
                     </Form>
                     </Col>
                     <Col sm={6}>
                <Image width="200px" height="200px" 
                src={process.env.REACT_APP_PHOTOPATH+this.props.photofilename}/>
                <input onChange={this.handleFileSelected} type="File"/>
            </Col>


                  
        </Row>
      </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}