import { View, Button, Image, TouchableOpacity } from 'react-native'
import {Table,Row} from 'react-native-table-component'
import React from 'react'
import greenCheck from '../src/images/greenCheck.png'
import grayCheck from '../src/images/grayCheck.png'

//install  react-native-table-component package

const ListItems = ({state,handleUpdateName,handleDelete, handleState}) => {
    const headData=['Id','Name','Update','Delete','State']
  return (
    <View style={{marginTop:4}}>

      <Table borderStyle={{borderWidth:1, borderColor:'gray'}}>
        <Row data={headData} flexArr={[1,2,2,2,2]}/>
        
        {
        state.items.map((item,index)=>(
                <Row
                    flexArr={[1,2,2,2,2]}
                    key={index}
                    data={[item.id,item.name,<View style={{margin:1}}><Button title="update" onPress={()=>handleUpdateName(item)} /></View>,<View style={{margin:1}}><Button title="Delete" onPress={()=>handleDelete(item.id)}/></View>,<TouchableOpacity style={{margin:1, alignItems:'center'}}  onPressIn={()=> handleState(item.id)}><Image source={item.flag===true ? greenCheck : grayCheck} style={{height:40,width:40}}/></TouchableOpacity>]}
                />
                
        ))
        }  
      </Table>
    </View>
  )
}

export default ListItems;