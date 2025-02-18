import React,{Component} from "react";
import {getRandomUser} from "./Utility/api";
import Instructor from "./Instructor";

class CycloPediaClassPage extends React.Component{
        constructor(props)
        {
            super(props);
            this.state = JSON.parse(localStorage.getItem("cyclopediaState")) || {
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
    if(JSON.parse(localStorage.getItem("cyclopediaState")))
    {
      //  this.setState(JSON.parse(localStorage.getItem("cyclopediaState")));
    }
    else{
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
}
componentDidUpdate = async(previousProps,previousState)=>{
    console.log("Component Did Update");
    localStorage.setItem("cyclopediaState",JSON.stringify(this.state));
    if(previousState.studentCount < this.state.studentCount)
    {
        const response = await getRandomUser();
        this.setState((prevState)=>{
            return{
                studentList :[
                    ...prevState.studentList,{
                        name: response.data.first_name + " " + response.data.last_name,
                    }
                ]
            }
        })
    }
    else if(previousState.studentCount > this.state.studentCount)
    {
        this.setState((prevState)=>{
            return{
                studentList :[],
            }
        })
    }
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
};
handletoggleInstructor =()=>{
    this.setState((prevstate)=>{
        return{
            hideInstructor : !prevstate.hideInstructor,
        }
    })
}
render(){
    console.log("render component");
    return(
    <div>
        <div className="p-3">
            <span className="h4 text-success">Instructor &nbsp;</span>
            <i className={`bi ${this.state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"}  btn btn-success btn-sm`} onClick={this.handletoggleInstructor}></i>
            {!this.state.hideInstructor ? (
           <Instructor instructor ={this.state.instructor}/>
        ):null}
        </div>
       
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
              {
                this.state.studentList.map((student,index)=>{
                    return(
                        <div className="text-white" key={index}> - {student.name}</div>
                    )
                })
              }
        </div>
    </div>
    );
}
}
export default CycloPediaClassPage;