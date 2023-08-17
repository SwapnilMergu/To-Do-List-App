import { View, Text, TextInput, Button } from 'react-native'
import React, { useReducer } from 'react'
import ListItems from './ListItems'


const reducer= (state, action)=>{
    switch(action.type){
        case 'TAKE-NAME':
            return {...state,name:action.payload}
        case 'ADD-ITEM':
            return {...state,items:[...state.items,{id:state.count,name:state.name,flag:false}], count:state.count+1, name:''}
        case 'DELETE-ITEM':
            return {...state,items:action.payload};
        case 'UPDATE-ITEM':
            return {...state,items:action.payload,name:""};
        case 'UPDATE-ITEM-NAME':
            return  {...state,name:action.payload.name,updateid:action.payload.id}
        case 'FLAG-ITEM':
           return {...state,items:action.payload}
        default:
            return state;
    }
}


const ToDoListHome = () => {

    const [state, dispatch] = useReducer(reducer, {
        name:'',
        items:[],
        count:1,
        checkedItems:[],
        updateAdction:0,
        updateid:0
    })

    const handleChange=(newText)=>{
        dispatch({
            type: 'TAKE-NAME',
            payload: newText
        })
    } 

    const handleSubmit=()=>{
        dispatch({
            type:'ADD-ITEM'
        })
    }

    const handleDelete=(id)=>{
        const del= state.items.filter((item)=>{
            if(item.id!=id)
                return item
        })
        dispatch({
            type:'DELETE-ITEM',
            payload:del
        })

    }

    const handleUpdate= ()=> {
        const upd= state.items.filter((item)=>{
            if(state.updateid===item.id){
                item.name=state.name
            }
            return item
        })
        state.updateid=0;
        dispatch({
            type:'UPDATE-ITEM',
            payload: upd
        })
    }

    const handleState= (id)=> {
        const flagUpd= state.items.filter((item)=>{
            if(id===item.id){
                item.flag=(!item.flag)
            }
            return item
        })
        dispatch({
            type:'FLAG-ITEM',
            payload:flagUpd
        })
    }

    const handleUpdateName= (item)=> {
        dispatch({
            type:'UPDATE-ITEM-NAME',
            payload:{id:item.id,name:item.name } 
        })
    }

  return (
    <View style={{margin:5}}>
      <Text>To Do List</Text>
      <TextInput placeholder='Enter name' onChangeText={(newText)=>handleChange(newText)} defaultValue={state.name}/>
      <Button title={state.updateid===0?"Add":'Update'} onPress={state.updateid===0?handleSubmit:handleUpdate}/>
      <ListItems state={state} handleUpdateName={handleUpdateName} handleState={handleState} handleDelete={handleDelete}/>
    </View>
  )
}

export default ToDoListHome