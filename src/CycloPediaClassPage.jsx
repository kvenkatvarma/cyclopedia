import React,{Component} from "react";
import {getRandomUser} from "./Utility/api";

class CycloPediaClassPage extends React.Component{
        constructor(props)
        {
            super(props);
            this.state ={
                instructor: undefined,
                studentList:[],
                studentCount:0,
                hideInstructor : false,
                inputName: "",
                inputFeedback:""
            };
        }
componentDidMount=async()=>
{
    console.log("Component Did Mount");
    const response = await getRandomUser();
    this.setState((prevstate)=>{
        return{
            instructor:{
                name: response.data.first_name + " " + response.data.last_name,
                email: response.data.email,
                phone: response.data.phone_number,
            }
        }
    })   
}
componentDidUpdate(){
    console.log("Component Did Update");

}
componentWillUnmount()
{
    console.log("Component Will Unmount");

}
handleAddStudent=()=>{
    this.setState((prevstate)=>{
        return{
            studentCount : prevstate.studentCount + 1,
        }
    })
}

handleRemoveAllStudent=()=>{
    this.setState((prevstate)=>{
        return{
            studentCount : 0,
        }
    })
}
render(){
    console.log("render component");
    return(
    <div>
        {this.state.instructor && (
            <div className="p-3">
                  <span className="h4 text-success">Instructor &nbsp;</span>
                  <i className="bi bi-toggle-off btn btn-success btn-sm"></i>
                  <br/>
                  Name: {this.state.instructor.name} <br/>
                  Email: {this.state.instructor.email} <br/>
                  Phone: {this.state.instructor.phone} <br/>

            </div>
        )}
        <div className="p-3">
            <span className="h4 text-success">Feedback &nbsp;</span><br/>
            <input type="text" value={this.state.inputName} onChange={(e)=>{this.setState({inputName : e.target.value})}} placeholder="Name.."/> <br/>
            <textarea placeholder="Feedback.." value={this.state.inputFeedback} onChange={(e)=>{this.setState({inputFeedback : e.target.value})}}/>
        </div>
        <div className="p-3">
        <span className="h4 text-success">Students &nbsp;</span>
              <div>Student Count: {this.state.studentCount}</div>
              <button className="btn btn-success btn-sm" onClick={this.handleAddStudent}>Add Student</button> &nbsp;
              <button className="btn btn-danger btn-sm" onClick={this.handleRemoveAllStudent}>Remove All Students</button>
        </div>
    </div>
    );
}
}
export default CycloPediaClassPage;