//This is an example code for Bottom Navigation//
import React, { useState, useEffect, useContext} from 'react';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, Button, FlatList } from 'react-native';
import Search from '../components/Search';
import Card from '../components/Card';
import {ScrollView} from 'react-navigation';
import {User} from '../contexts/UserContext';
import {getFilmsFromSearchedText} from '../components/Api';
//import all the basic component we have used

const HomeScreen = () => {

  let { state, dispatch } = useContext(User);

  const [data, setData] = useState(null);

  const { navigate } = useNavigation();

  useEffect(() => {
    if(state.searchedText) {
     loadingData()
    }
  }, [state.searchedText])

  const loadingData = () => {
    getFilmsFromSearchedText(state.searchedText).then(data => {

      let resp = data.results;
      let concatPosterPath = "http://image.tmdb.org/t/p/w1280/"
      let list = []

      for(let i = 0; i < resp.length ; i++) {
        let dateTmp = resp[i].release_date
        let dateFormat = dateTmp.substring(0, 4)
          let format = {
            id: resp[i].id,
            title: resp[i].original_title,
            date : dateFormat,
            vote_average : resp[i].vote_average,
            popularity: resp[i].popularity,
            content : resp[i].overwiew,
            poster: concatPosterPath+""+resp[i].poster_path,
          }
          list.push(format);
      }
      setData(list)
    });
  }

  const cardGenerator = () => {
    if(data!=null) {
      return (
        <FlatList
          data={data}
          renderItem={({item}) => <Card item={item}/> }
          keyExtractor={item => item.id.toString()}
        />
      )
    }
  }

  return (
    <SafeAreaView style={{flex: 1 }}>
      <View style={styles.box}>
          <Search/>
      </View>
      <View style={styles.box}>
      </View>
      <View style={styles.box}>
        {cardGenerator()}
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  box: {
    width: "100%",
    padding: 5,
  }
});
 export  default HomeScreen;
