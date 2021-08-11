import React, { Component } from "react";
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCarModal} from './AddCarModal';
import {EditCarModal} from './EditCarModal';


export class Car extends Component{


    constructor(props){
        super(props);
        this.state={cars:[], addModalShow:false,editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'car')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cars:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

   /* deleteCr(crid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'car/'+crid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }*/
    render(){
      
       
        const {cars, crid,crname,crcat,doj,photofilename}=this.state;
       let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                       
                            <th>CarId</th>
                        <th>CarName</th>
                        <th>Category</th>
                        <th>DateOfJoining</th>
                        <th>Options</th>

                    
                    </thead>
                    <tbody>
                        {cars.map(cr=>
                            <tr key={cr.CarId}>
                                <td>{cr.CarId}</td>
                                <td>{cr.CarName}</td>
                                <td>{cr.Category}</td>
                                <td>{cr.DateOfJoining}</td>
                             
                                
                                <ButtonToolbar>
                                <Button className="mr-2" variant="info"
                                onClick={()=>this.setState({editModalShow:true,
        crid:cr.CarId,crname:cr.CarName,crcat:cr.Category,doj:cr.DateOfJoining,photofilename:cr.PhotoFileName})}>
            Edit
        </Button> 



        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteCt(cr.CarId)}>
            Delete
        </Button>



        <EditCarModal show={this.state.editModalShow}
        onHide={editModalClose}
        crid={crid}
        crname={crname}
        crcat={crcat}
        doj={doj}
        photofilename={photofilename}/>

        </ButtonToolbar>

                     
      


                     </tr> )}
                    </tbody>
                    </Table>


       
       
       
       
                  
                    <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Car</Button>

                    
                    </ButtonToolbar>

                    <AddCarModal show={this.state.addModalShow}
                     onHide={addModalClose}/>
                  

                    
               
                    </div>
          
        )
    }
}