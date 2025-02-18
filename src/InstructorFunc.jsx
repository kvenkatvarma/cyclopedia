import React,{Component} from "react";

class InstructorFunc extends Component{
    constructor(props){
        super(props);

    }
    componentDidMount=async()=>
        {
            console.log("Component Did Instructor- DidMount");
          
        }
        componentDidUpdate(){
            console.log("Component Did Update-Instructor");           
        
        }
        componentWillUnmount()
        {
            console.log("Component Will Unmount-Instructor");
        
        }
    render(){
        return(
            <div className="">
               
                Name: {this.props.instructor.name} <br/>
                Email: {this.props.instructor.email} <br/>
                Phone: {this.props.instructor.phone} <br/>
            </div>
        );
    }
}
export default InstructorFunc;