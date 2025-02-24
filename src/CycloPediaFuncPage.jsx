import React,{Component, useEffect, useState} from "react";
import {getRandomUser} from "./Utility/api";
import Instructor from "./Instructor";

const CycloPediaFuncPage =()=>{
  

   const [state, setState] = useState(() => {
    return {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  });
  
   const [inputName, setInputName] = useState(()=>{
    return "";
   });
   const [inputFeedback, setInputFeedback] = useState(()=>{
      return "";
    });


    useEffect(()=>{
        console.log("This will be called on every render");
    });

    useEffect(()=>{
        console.log("This will be called on initial/first render/mount");
        const getUser = async()=>{
            const response = await getRandomUser();
            setState((prevstate)=>{
                return{...prevstate,
                    instructor:{
                        name: response.data.first_name + " " + response.data.last_name,
                        email: response.data.email,
                        phone: response.data.phone_number,
                    }
                }
            }) 
        }  ;
        getUser(); 
    },[]);

    useEffect(()=>{
        console.log("This will be called on whenever value of inputFeedback changes");
    },[inputFeedback]);

    useEffect(()=>{
        console.log("This will be called on initial/first render/mount");
        return ()=>{
            console.log("This will be called on when component will be unmounted");
        };
    },[]);

        // constructor(props)
        // {
        //     super(props);
        //     this.state = JSON.parse(localStorage.getItem("cyclopediaState")) || {
        //         instructor: undefined,
        //         studentList:[],
        //         studentCount:0,
        //         hideInstructor : false,
        //         inputName: "",
        //         inputFeedback:""
        //     };
        // }
// componentDidMount=async()=>
// {
//     console.log("Component Did Mount");
//     if(JSON.parse(localStorage.getItem("cyclopediaState")))
//     {
//       //  this.setState(JSON.parse(localStorage.getItem("cyclopediaState")));
//     }
//     else{
//     const response = await getRandomUser();
//     this.setState((prevstate)=>{
//         return{
//             instructor:{
//                 name: response.data.first_name + " " + response.data.last_name,
//                 email: response.data.email,
//                 phone: response.data.phone_number,
//             }
//         }
//     }) 
// }  
// }
// componentDidUpdate = async(previousProps,previousState)=>{
//     console.log("Component Did Update");
//     localStorage.setItem("cyclopediaState",JSON.stringify(this.state));
//     if(previousState.studentCount < this.state.studentCount)
//     {
//         const response = await getRandomUser();
//         this.setState((prevState)=>{
//             return{
//                 studentList :[
//                     ...prevState.studentList,{
//                         name: response.data.first_name + " " + response.data.last_name,
//                     }
//                 ]
//             }
//         })
//     }
//     else if(previousState.studentCount > this.state.studentCount)
//     {
//         this.setState((prevState)=>{
//             return{
//                 studentList :[],
//             }
//         })
//     }
// }
// componentWillUnmount()
// {
//     console.log("Component Will Unmount");

// }
const handleAddStudent=()=>{
    setState((prevstate)=>{
        return{
            ...prevstate,studentCount : prevstate.studentCount + 1,
        }
    })
}

const handleRemoveAllStudent=()=>{
    setState((prevstate)=>{
        return{
            ...prevstate,studentCount : 0,
        }
    })
};
const handletoggleInstructor =()=>{
    setState((prevstate)=>{
        return{
            ...prevstate,hideInstructor : !prevstate.hideInstructor,
        }
    })
}
    return(
    <div>
        <div className="p-3">
            <span className="h4 text-success">Instructor &nbsp;</span>
            <i className={`bi ${state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"}  btn btn-success btn-sm`} onClick={handletoggleInstructor}></i>
            {!state.hideInstructor && state.instructor ? (
           <Instructor instructor ={state.instructor}/>
        ):null}
        </div>
       
        <div className="p-3">
            <span className="h4 text-success">Feedback &nbsp;</span><br/>
            <input type="text" value={inputName} onChange={(e)=>{setInputName( e.target.value)}} placeholder="Name.."/> <br/>
            <textarea placeholder="Feedback.." value={inputFeedback} onChange={(e)=>{setInputFeedback( e.target.value)}}/>
        </div>
        <div className="p-3">
        <span className="h4 text-success">Students &nbsp;</span>
              <div>Student Count: {state.studentCount}</div>
              <button className="btn btn-success btn-sm" onClick={handleAddStudent}>Add Student</button> &nbsp;
              <button className="btn btn-danger btn-sm" onClick={handleRemoveAllStudent}>Remove All Students</button>
              {
                state.studentList.map((student,index)=>{
                    return(
                        <div className="text-white" key={index}> - {student.name}</div>
                    )
                })
              }
        </div>
    </div>
    );

}
export default CycloPediaFuncPage;