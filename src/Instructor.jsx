import React,{Component} from "react";

class Instructor extends Component{
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
            <div className="p-3">
                <span className="h4 text-success">Instructor &nbsp;</span>
                <i className="bi bi-toggle-off btn btn-success btn-sm"></i>
                <br/>
                Name: {this.props.instructor.name} <br/>
                Email: {this.props.instructor.email} <br/>
                Phone: {this.props.instructor.phone} <br/>
            </div>
        );
    }
}
export default Instructor;