import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import { Card, Title, IconButton, Colors } from 'react-native-paper';
import { useNavigation } from 'react-navigation-hooks'
import {useSelector, useDispatch} from 'react-redux';
import {deleteFromFirestore} from '../helpers/vendors/Firebase'
import { removeFavorite } from '../actions';

const Favorite = ({item}) => {

  console.log("item", item);

  const data = item
  const { navigate } = useNavigation();
  const darkMode = useSelector(state => state.darkModeReducer);
  const user = useSelector(state => state.signReducer).email;

  const dispatch = useDispatch();


  // call crud firebase (d)
  async function deleteThisFavorite() {
    dispatch(removeFavorite({username : user, id:data.id}))

  }

  return (
    <View style={{ width : 400, marginBottom: 5, marginTop: 5,}}>
      <Card style={{ borderWidth: 0.5, borderColor: 'lightgray', elevation: 5,backgroundColor: (darkMode) ? "black": "white"}}>
        <Card.Content>
          <View style={{flexDirection: "row"}}>
            <View style={{width : '80%', justifySelf: 'center'}}>
              <TouchableOpacity 
              onPress={() => {
                navigate('Detail', {
                  data: data,
                });
              } }
              >
                <Title style={{fontSize: 14, textTransform: 'uppercase',color:"grey"}}>{item.title}</Title>
              </TouchableOpacity>
            </View>
            <View style={{width : '20%',flexDirection: 'row', justifyContent: 'flex-end'}}>
              <IconButton
                icon="delete"
                color={Colors.red500}
                size={20}
                onPress={async () => {
                  deleteThisFavorite()
                }}
              />
            </View>

          </View>
        </Card.Content>
      </Card>
    </View>

  )
}
export default Favorite;
