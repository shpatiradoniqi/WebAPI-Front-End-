import React, { Component } from "react";
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCatModal} from './AddCatModal';
import {EditCatModal} from './EditCatModal';


export class Category extends Component{

//ctgs=categories
    constructor(props){
        super(props);
        this.state={ctgs:[], addModalShow:false,editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'category')
        .then(response=>response.json())
        .then(data=>{
            this.setState({ctgs:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteCt(ctid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Category/'+ctid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
      
       
        const {ctgs, ctid,ctname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                       
                            <th>CategoryId</th>
                        <th>CategoryName</th>
                        <th>Options</th>
                    
                    </thead>
                    <tbody>
                        {ctgs.map(ct=>
                            <tr key={ct.CategoryId}>
                                <td>{ct.CategoryId}</td>
                                <td>{ct.CategoryName}</td>
                                

                       

                     
                    <ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        ctid:ct.CategoryId,ctname:ct.CategorytName})}>
            Edit
        </Button> 


        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteCt(ct.CategoryId)}>
            Delete
        </Button>

        <EditCatModal show={this.state.editModalShow}
        onHide={editModalClose}
        ctid={ctid}
        ctname={ctname}/>
        </ButtonToolbar>





       
       
       
       
        </tr> )}
                    </tbody>
                    </Table>
                  
                    <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addCatShow:true})}>
                    Add Category</Button>

                    <AddCatModal show={this.state.addCatShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
                  

               
                </div>
          
        )
    }
}