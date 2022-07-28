import React, {useEffect, useState} from 'react';
import Card from './Card';
import { Button, Input, FormGroup, Label, Col,Navbar,NavbarBrand, Nav } from 'reactstrap';



const ListTodo = () => {
    
    const [taskList, setTaskList] = useState([])
    const [taskTitle, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] =useState('');

    //set the values
    const handleChange = (e) => {
        
        const {name, value} = e.target;

        if(name === "taskTitle"){
            setTaskTitle(value)
        }else{
            setDescription(value)
        }
        let d=new Date();
        setDate(d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear()+" | "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());


    }

    // to set value in local storage
    useEffect(() => {
        let arr = localStorage.getItem("taskList")
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])

    // to delete any note from webpage as well as local storage
    const deleteTask = index => {
          // to confirm from user to delete the node
        if(window.confirm('Are your sure?')){
            let tempList = taskList
            tempList.splice(index, 1)
            localStorage.setItem("taskList", JSON.stringify(tempList))
            setTaskList(tempList)
            window.location.reload()
        }
    }

    //while updating the note below function is called where data will be updated in local storage as well
    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    //to save the note by pushing into local storage and Object
    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        
    }

    // when add note button is press below functionality takes place
    const handleSave = (e) => {
        e.preventDefault()
        
        if(taskTitle === ""){               // to verfiy whether title was passed as input or not
            alert("Title cannot be empty.");
        }
        else{
            let taskObj = {}
            taskObj["Name"] = taskTitle;
            taskObj["Description"] = description;
            taskObj["Date"] = date;
            saveTask(taskObj)
            alert("New Note added successfully");  // to confirm that the note has been added successfully
            window.location.reload();
        }
    }
    return (
        <>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Sticky Notes</NavbarBrand>
          <Nav>REACT</Nav>
        </Navbar>
            <div className = "header">
            <FormGroup row>
                <Label for="Title" sm={2}>Title</Label>
                <Col sm={10}>
                <Input type="text" name="taskTitle" id="Title" placeholder="Enter the title"  onChange = {handleChange} />
                </Col>
            </FormGroup>
            <FormGroup row>
                 <Label for="des" sm={2}>Text Area</Label>
                <Col sm={10}>
                <Input type="textarea" name="description" id="des" placeholder="Enter the description"  onChange = {handleChange}/>
                </Col>
            </FormGroup>
                <Button color="primary" onClick={handleSave}>Add Note</Button>
            </div>
            <div className = "task-container">
                {taskList.length === 0 ? "No notes to display...":
            taskList && taskList.slice(0).reverse().map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div>
        </>
    );
};

export default ListTodo;


