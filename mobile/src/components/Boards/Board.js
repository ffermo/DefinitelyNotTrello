import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, TextInput, Modal, TouchableHighlight, Button, SectionList } from 'react-native';
import {ListItem, SearchBar, Overlay} from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { createDndContext } from "react-native-easy-dnd";
import SortableList from 'react-native-sortable-list';
import {Animated} from 'react-native';
const { Provider, Droppable, Draggable } = createDndContext();
import { CheckBox } from 'react-native-elements'

export default class Board extends Component {
  static navigationOption = ({ navigation }) => 
  {     
      return {
               id: navigation.getParam('id', null)     
             }
  }
  constructor(props) {
    super(props);
    this.state = {
        boards: [], 
        boardName: '',
        newboardindex: '',
        oldboardindex: '',
        isVisible: false,
        lists: [],
        cards: [],
        boardId: props.route.params.id,
        listName: '',
        modalGoButtonValue: '', 
        modalGoButtonAction: '', 
        modalGoButtonID: '', 
        modalInputValue: '', 
        modalInputPlaceHolder: '',
        checked: false,
        currentCardCheck: ''


    };
    
  }

  componentDidMount() {
    // this.addCard("5f1bbdb9b6f43b1c840bdb85",0);
    this.fetchData();
    // console.log(this.state.boards);
    

    this.props.navigation.setOptions(
        {
            title: 'Lists',
            headerRight: () => (
              <TouchableOpacity
                style={{
                  marginRight: 20
                }}
                onPress={() => this.setIsVisible(true, "Add", "ADDLIST", "", "", "List Name")}>
  
              <Entypo name="plus" size={34} color="white" />
                </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#24a9ae',
              
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              alignSelf: 'center'
            }
          }
  
      );
    
    // console.log(this.state.boardId);
  }

  setIsVisible = (bool, goButtonValue, goButtonAction, ID, inputValue, inputPlaceHolder) => {
    
    this.setState({'isVisible' : bool, 'modalGoButtonValue': goButtonValue, 'modalGoButtonAction': goButtonAction, 'modalGoButtonID': ID, 'modalInputValue': inputValue, 'modalInputPlaceHolder': inputPlaceHolder})
  }

  fetchData = async () => {

    // try 
    // {
    //   var value = await AsyncStorage.getItem("board");
    //   if (value !== null)
    //   {
    //     value = JSON.parse(value);
    //     // console.log(value.id);
    //   }
    // } 
    // catch (e) 
    // {
    // //   console.log("Something went wrong in fetching the boards data");
    // }


    // console.log("http://3.17.45.57/api/Board/" + value.id);
    const response = await fetch("http://3.17.45.57/api/Board/" + this.state.boardId , {method:'GET',headers:{'Content-Type': 'application/json'}});
    var res = JSON.parse(await response.text());
    // console.log(res);
    this.setState(
        {
            lists: res.listString,
            cards: res.cardString
        } );
    // console.log(this.state.boards);

  }

  deleteList = async (event,listId) => 
  {
    var js = '{"_id":"'+ listId + '"}';

    // console.log(js);
    try
    {
      // alert("here");
      const response = await fetch('http://3.17.45.57/api/DeleteList',{method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});
      // alert("added successfully");
      // this.setBoardName("");
      // this.setIsVisible(false);
      // this.componentDidMount();
      var res = JSON.parse(await response.text());
      // console.log(res);
    }
    catch(e)
    {

    }
    this.componentDidMount();
  }

  deleteCard = async (cardId) => 
  {
    var js = '{"_id":"'+ cardId + '"}';

    // console.log(js);
    try
    {
      // alert("here");
      const response = await fetch('http://3.17.45.57/api/DeleteCard',{method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});
      // alert("added successfully");
      // this.setBoardName("");
      // this.setIsVisible(false);
      // this.componentDidMount();
      var res = JSON.parse(await response.text());
      // console.log(res);
    }
    catch(e)
    {

    }
    this.componentDidMount();
  }



  addList = async () => 
  {

    // try 
    // {
    //   var value = await AsyncStorage.getItem("user");
    //   if (value !== null)
    //   {
    //     value = JSON.parse(value);
    //     // console.log(value.id);
    //     // return value.id;
    //   }
    // } 
    // catch (e) 
    // {
    //   console.log("Something went wrong in fetching the users data.");
    // }

    var js = '{"listName":"'+ this.state.modalInputValue.toString() + '","index":"'+ this.state.lists.length + '","parentBoard":["'+ this.state.boardId +'"]}';
    
    // console.log(js);
    try
    {
      // alert("here");
      const response = await fetch('http://3.17.45.57/api/CreateList',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    //   alert("added successfully");
      // console.log(this.lists[0]);
      this.setModalInputValue("");
      this.setIsVisible(false, "", "", "", "");
      this.componentDidMount();
      this.setIsVisible(false, "", "", "", "", "");
    }
    catch(e)
    {

    }
  }



  addCard = async (listId, listIndex) => 
  {

    // try 
    // {
    //   var value = await AsyncStorage.getItem("user");
    //   if (value !== null)
    //   {
    //     value = JSON.parse(value);
    //     // console.log(value.id);
    //     // return value.id;
    //   }
    // } 
    // catch (e) 
    // {
    //   console.log("Something went wrong in fetching the users data.");
    // }

    var js = '{"cardName":"'+ this.state.modalInputValue + '","index":"'+ listIndex + '","parentList":"'+ listId +'"}';
    
    // console.log(js);
    try
    {
      // alert("here");
      const response = await fetch('http://3.17.45.57/api/CreateCard',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    //   alert("added successfully");
      // console.log(this.lists[0]);
      this.setModalInputValue("");
      // this.setIsVisible(false);
      this.componentDidMount();
      this.setIsVisible(false, "", "", "", "", "");
    }
    catch(e)
    {

    }
  }


  setModalInputValue = (name) => {
    // console.log(name);
    this.setState({'modalInputValue' : name})
  }
  

  updateList = async (listId) => 
  {
    var js = '{"_id":"'+ listId + '","listName":"' + this.state.modalInputValue + '"}';

    console.log(js);
    try
    {
      // alert("here");
      const response = await fetch('http://3.17.45.57/api/UpdateList',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});
      // alert("added successfully");
      // this.setBoardName("");
      // this.componentDidMount();
      var res = JSON.parse(await response.text());
      // console.log(res);
      this.setIsVisible(false, "", "", "", "", "");
    }
    catch(e)
    {

    }
    this.componentDidMount();
  }


  updateCard = async (cardId) => 
  {
    var js = '{"_id":"'+ cardId + '","cardName":"' + this.state.modalInputValue + '"}';

    // console.log(js);
    try
    {
      // alert("here");
      const response = await fetch('http://3.17.45.57/api/UpdateCard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});
      // alert("added successfully");
      // this.setBoardName("");
      // this.setIsVisible(false);
      // this.componentDidMount();
      var res = JSON.parse(await response.text());
      // console.log(res);
      this.setIsVisible(false, "", "", "", "", "");
    }
    catch(e)
    {

    }
    this.componentDidMount();
  }

  goButtonAction = () => {
    if (this.state.modalGoButtonAction === "ADDLIST")
    {
      this.addList();
    }
    else if (this.state.modalGoButtonAction === "ADDCARD")
    {
      this.addCard(this.state.modalGoButtonID,0)
    }
    else if (this.state.modalGoButtonAction === "UPDATELIST")
    {
      this.updateList(this.state.modalGoButtonID)
    }
    else if (this.state.modalGoButtonAction === "UPDATECARD")
    {
      this.updateCard(this.state.modalGoButtonID)
    }

  }

  handleCheckedCard = async (card) =>
  {
      // event.preventDefault();
      // console.log("calling checked card");
      // console.log(event.target.checked);
      // console.log(event.target.previousSibling.value);
      if (card.checked === "true")
      {
        card.checked = "false"
      }
      else
      {
        card.checked = "true"
      }
      try
      {
          var js = '{"_id":"'+ card._id + '","checked":"' + card.checked + '","listId":"' + card.parentList + '"}';

          // console.log(js);
          // const response = 
          await fetch('http://3.17.45.57/api/UpdateCard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});
          if (card.checked === "true")
          {
            this.setState({"currentCardCheck": false})
          }
          else
          {
            this.setState({"currentCardCheck": true})
          }

      }
      catch(e)
      {
          console.log("there was an error");
          console.log(e.toString());
      }
      this.componentDidMount();
  }


  handleCheckedList = async (list) =>
  {
      // event.preventDefault();
      console.log("calling checked list");
      // console.log(event.target.checked);
      // console.log(event.target.previousSibling.value);
      if (list.checked === "true")
      {
        list.checked = "false";
      }
      else
      {
        list.checked = "true"
      }
      try
      {
          var js = '{"_id":"'+ list._id + '","checked":"' + list.checked + '"}';

          console.log(js);
          // const response = 
          await fetch('http://3.17.45.57/api/UpdateList',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

      }
      catch(e)
      {
          console.log("there was an error");
          console.log(e.toString());
      }
      this.componentDidMount();
  }

  checkCheck = (value) =>
  {
    console.log("CHECKING VALUE")
    console.log(value)
    if (value.cheked === "false")
    {
      return false
    }
    else 
    {
      return true
    }
  }


  render() {

    return (

      <Provider>
        <View style={{padding: 10}}>

          {/* {console.log(this.state.lists)} */}
          {/* MODAL */}
          <View style={styles.container}>              
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.isVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>

                <View style={styles.modalView}>
                  <TextInput
                    style={styles.overlayInput}

                    // {console.log(this.state.boards)}
                    defaultValue={this.state.modalInputValue}
                    onChangeText={(name) => this.setModalInputValue(name)}
                    placeholder={this.state.modalInputPlaceHolder}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"

                  />
                  {/* {this.state.boards.map(board =>
                <Text>{board.boardName}</Text>) } */}
                  <View style={styles.overlayButtonContainer}>

                    <TouchableOpacity style={styles.overlayButton} onPress={() => this.setIsVisible(false, "", "", "", "", "")}>
                      <Text style={styles.overlayButtonText}>
                        Cancel
                  </Text>
                    </TouchableOpacity>

                    <View style={{ width: 20 }}></View>

                    <TouchableOpacity style={styles.overlayButton} onPress={() => this.goButtonAction()}>
                      <Text style={styles.overlayButtonText}>
                        {this.state.modalGoButtonValue}
                      </Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </View>
            </Modal>
          </View>

          {/* BODY OF PAGE */}



          <FlatList
            data={this.state.lists}
            ListHeaderComponentStyle={{ marginBottom: 5 }}
            extraData={this.state}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) =>
              <View style={styles.listContainer}>

                {/* justifyContent: 'space-between' */}
              <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#0b6cad' }}
              > 

              <Text style={styles.listTitle} 
                     onPress={(e) => this.setIsVisible(true, "Update", "UPDATELIST", item._id, item.listName, "List Name")}
                     >

                {item.listName}
                {console.log(item)}

                </Text>

                  <CheckBox
                    checked={item.checked === "true"}
                    checkedColor='white'
                    onPress={() => this.handleCheckedList(item)}
                    uncheckedColor='white'
                    // style={{flex: 1}}
                  />
                </View> 

              <FlatList
                data={this.state.cards[index]}
                ListHeaderComponentStyle={{ marginBottom: 5 }}
                extraData={this.state}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) =>

                <View style={{flexDirection: 'row', backgroundColor: 'white', borderRadius: 7, height: 35, justifyContent: 'space-between', 
                marginBottom: 5}}>

                
                  <Text style={{alignSelf:'center', marginLeft: 10, flex: 4,}} onPress={(e) => this.setIsVisible(true, "Update", "UPDATECARD", item._id, item.cardName, "Card Name")}
                    onLongPress={(e) => this.deleteCard(item._id)}
                  >
                    {item.cardName}
                  </Text>

                    <View style={{alignSelf:'center'}}>
                    <CheckBox
                      checked={item.checked === "true"}
                      onPress={() => this.handleCheckedCard(item)}
                      uncheckedColor='black'
                      style={{flex: 4}}
                    />
                   </View>

                    </View>
                  
                  }
                  ListHeaderComponent={this.renderHeader}

                />

                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15}}>

                <TouchableOpacity 
                style={{
                  alignSelf: 'center',
                  borderWidth: 1.5,
                  borderRadius: 7,
                  borderColor: '#FFF',
                  justifyContent: 'center',
                  height: 40,
                  width: 120,
                  backgroundColor: '#07568a', 
                  marginTop: 10,
                   }} 
                   onPress={(e) => this.deleteList(e, item._id)}>
                  <Text style={{alignSelf: 'center', color: 'white'}}>
                  Delete List
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={{
                  alignSelf: 'center',
                  borderWidth: 1.5,
                  borderRadius: 7,
                  borderColor: '#FFF',
                  justifyContent: 'center',
                  height: 40,
                  width: 120,
                  backgroundColor: '#07568a', 
                  marginTop: 10,
                   }} 
                   onPress={(e) => this.setIsVisible(true, "Add", "ADDCARD", item._id, "", "Card Name")}>
                  <Text style={{alignSelf: 'center', color: 'white'}}>
                  Add Card
                  </Text>
                </TouchableOpacity>

                </View>
                {/* <Button
                  onPress={(e) => this.deleteList(e, item._id)}
                  title="Delete List"
                /> */}
              </View>
            }
            ListHeaderComponent={this.renderHeader}

          />

          {/* {console.log(this.state.lists)} */}
          {/* {this.state.lists.map(list => */}
          {/* <View>
              <Text onPress={(e) => this.setIsVisible(true, "Update", "UPDATELIST", list._id, list.listName, "List Name")}
                onLongPress={(e) => alert("Long Pressed")}
              > */}
          {/* {console.log("CHECKING")}
                {list.listName}
                {this.state.cards[list.index].map(card =>

                  <Text onPress={(e) => this.setIsVisible(true, "Update", "UPDATECARD", card._id, card.cardName, "Card Name")}
                    onLongPress={(e) => alert("Long Pressed")}
                  >
                    {card.cardName}
                    <Text onPress={(e) => this.deleteCard(e, card._id)}>
                      Delete Card
                                        </Text>
                  </Text>

                )} */}
          {/* </Text>
              <Button
                onPress={(e) => this.setIsVisible(true, "Add", "ADDCARD", list._id, "", "Card Name")}
                title="Add Card to List"
              />
              <Button
                onPress={(e) => this.deleteList(e, list._id)}
                title="Delete List"
              /> */}
          {/* </View>)} */}

        </View>


      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  overlayContainer: {
    // height: '80%',
    // width: '80%'
  },
  overlayInput: {
    height: 40,
    width: 250,
    borderWidth: 1.5,
    borderRadius: 3,
    marginBottom: 20,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    paddingHorizontal: 10

  },
  overlayButtonContainer: {
    flexDirection: 'row',
    backgroundColor: '#24a9ae', 
    justifyContent: 'space-between',
    alignItems: 'flex-end', 
    paddingHorizontal: 0
  }, 
  overlayButton: {
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 7,
    borderColor: '#FFF',
    height: 40,
    width: 70,
    backgroundColor: '#149499',  
    paddingVertical: 15

  },
  overlayButtonText: {
    textAlign: 'center', 
    textAlignVertical: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    flexDirection: "column",
    justifyContent: 'flex-end',
    backgroundColor: "#24a9ae",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  listContainer: {
    flexDirection: 'column',
    backgroundColor: '#0b6cad', 
    borderRadius: 10, 
    padding: 12,
    marginTop: 10
  }, 
  listTitle: {
    color: 'white',
    flex: 5,
    fontSize: 18,
    marginLeft: 60,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent:'center'
  }
})

