import React, {useState} from 'react';
import {IconButton, Colors, Drawer, List, Divider} from 'react-native-paper';
import {TouchableOpacity,View,StyleSheet} from "react-native";
import {
    createDrawerNavigator
} from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HomeSearchScreen from "../views/HomeSearchScreen"
import MovieDetailScreen from "../views/MovieDetailScreen"
import AboutScreen from "../views/AboutScreen"
import ProfileScreen from "../views/ProfileScreen"
import SigninScreen from '../views/SigninScreen';
import SingnupScreen from '../views/SignupScreen';

const MyHamburger = ({navigation}) => (
    <IconButton
        icon="menu"
        color={"#9c27b0"}
        size={20}
        onPress={() => navigation.toggleDrawer()}
    />
);

const MyDrawer = ({navigation}) => {
    const [active, setActive] = useState('Home')

    function handleStateColor(screen, icon) {
        return(
            <TouchableOpacity
                onPress={() => {
                    setActive(screen)
                    navigation.navigate(screen)
                }}
                style={{
                    backgroundColor: (active == screen? 'indigo' : 'white')
                }}
            >
                <List.Item
                    titleStyle={{
                        fontWeight: 'bold', textAlign: 'center',marginLeft: -45, letterSpacing: 2, textTransform: 'uppercase', color: (active == screen? 'white' : 'black')
                    }}
                    title={screen}
                    left={props => <List.Icon {...props} icon={icon} color={active == screen? Colors.white : Colors.grey} />}
                />
            </TouchableOpacity>
        )
    }

    const signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            navigation.navigate('Signin');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View>
            {handleStateColor("Home", "magnify")}
            <Divider />
            {handleStateColor("Profile", "account")}
            <Divider />
            {handleStateColor("About", "information")}
            <Divider />
            {handleStateColor("Settings", "settings-outline")}
            <Divider />

        </View>

    )

}

const styles = StyleSheet.create({
    listItem : {
        fontWeight: 'bold', textAlign: 'center',marginLeft: -45, letterSpacing: 2, textTransform: 'uppercase', color: 'white'
    }
})





const DrawerNavigator = createDrawerNavigator({

    Home: {
        screen: HomeSearchScreen,
    },
    Profile: {
        screen: ProfileScreen,
    },
    About : {
        screen: AboutScreen
    },
},{
    contentComponent: MyDrawer,
    drawerWidth: 300
});


const MainStack = createStackNavigator({
     Signin: {
        screen: SigninScreen,
        navigationOptions: {
            header: null
        }
    },
    DrawerNavigator : {
        screen : DrawerNavigator,
        navigationOptions: ({ navigation }) => ({
        header : MyHamburger({navigation})
        })
    },
    Home: {
        screen: HomeSearchScreen,
    },
    Detail : {
        screen: MovieDetailScreen
    },
    Signup : {
        screen: SingnupScreen,
        navigationOptions: {
            header: null
        }
    }
});

// const DrawerNavigation = createAppContainer(DrawerNavigator);
const DrawerNavigation = createAppContainer(MainStack);


export default DrawerNavigation;


