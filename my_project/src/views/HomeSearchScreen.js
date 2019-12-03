//This is an example code for Bottom Navigation//
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
//import react in our code.
import {View, StyleSheet, SafeAreaView, FlatList, Text, ActivityIndicator} from 'react-native';
import Card from '../components/Card'
import Search from '../components/Search';
import {getFilmsFromSearchedText, getUpcoming} from '../helpers/vendors/TMDB'
import {addText, getData} from "../actions";
import { NavigationEvents } from 'react-navigation';
//import all the basic component we have used


const HomeSearchScreen = () => {
    const dispatch = useDispatch()
    const searchedText = useSelector(state => state.searchedTextReducer)
    const data = useSelector(state => state.dataFromApiReducer).data
    //const user = useSelector(state => state.usersReducer).username

    // loading screen
    const [loading, setLoading] = useState(true)


    const darkMode = useSelector(state => state.darkModeReducer);

    // loading data on change of searched text
    useEffect(() => {
      if(searchedText || searchedText == "" ) {
       loadingData()
      }
    }, [searchedText])

    // call API
    // add data to store
    async function loadingData() {
        // lauching
        setLoading(true)
        if(searchedText == "") {
          await getUpcoming().then(data => {
            let resp = data.results;

            let concatPosterPath = "http://image.tmdb.org/t/p/w1280/"
            //list = resp
            let list = [];
  
            for(let i = 0; i < resp.length ; i++) {
                let dateTmp = resp[i].release_date
                let dateFormat = (dateTmp!=undefined? dateTmp.substring(0, 4) : '')
                let format = {
                    id: resp[i].id,
                    title: resp[i].original_title,
                    date : dateFormat,
                    vote_average : resp[i].vote_average,
                    popularity: resp[i].popularity,
                    content : resp[i].overview,
                    poster: concatPosterPath+""+resp[i].poster_path,
                }
                list.push(format);
          }
          dispatch(getData(list))
        });
        }else {
          await getFilmsFromSearchedText(searchedText).then(data => {
              let resp = data.results;

              let concatPosterPath = "http://image.tmdb.org/t/p/w1280/"
              //list = resp
              let list = [];

              for(let i = 0; i < resp.length ; i++) {
                  let dateTmp = resp[i].release_date
                  let dateFormat = (dateTmp!=undefined? dateTmp.substring(0, 4) : '')
                  let format = {
                      id: resp[i].id,
                      title: resp[i].original_title,
                      date : dateFormat,
                      vote_average : resp[i].vote_average,
                      popularity: resp[i].popularity,
                      content : resp[i].overview,
                      poster: concatPosterPath+""+resp[i].poster_path,
                  }
                  list.push(format);
              }
              dispatch(getData(list))
          });
        }
        // stopping
        setLoading(false)
    }

    // generate a flatList of Cards
    const cardGenerator = () => {
    if(data!="") {
      return (
        <FlatList
          style = {{backgroundColor: (darkMode) ? "black": "white"}}

          data={data}
          renderItem={({item}) => <Card item={item}/> }
          keyExtractor={item => item.id.toString()}
        />
      )
    }
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: (darkMode) ? "black": "white" }}>
        <NavigationEvents
            onDidBlur={() => {
                // refreshing component using nav event + redux
                // dispatch(getData({}))
                // dispatch(addText(""))
            }}
        />
      <View style={styles.box}>
          <Search />
      </View>
      <View style={styles.box}>
      </View>
      <View style={styles.box}>
          {/* loading screen or cards */}
          {loading==true? <ActivityIndicator size="large" color="indigo" /> : cardGenerator()}
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
 export default HomeSearchScreen;
