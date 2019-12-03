import React, { useState, useEffect } from 'react';
import {Animated, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {IconButton, Colors, Drawer, List, Divider} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { NavigationEvents } from 'react-navigation';

import i118n from '../components/i118n';



const FadeInView = (props, duration) => {
    const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start();
    }, [])

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim,         // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
}

const FeaturesHistoryScreen = () => {

    const [myWipe, setMyWipe] = useState(false)

    // all features from lang
    const allFeatures = [
        i118n.t("features.forms"),
        i118n.t("features.auth"),
        i118n.t("features.storefb"),
        i118n.t("features.api"),
        i118n.t("features.favorites"),
        i118n.t("features.storerx"),
        i118n.t("features.video"),
        i118n.t("features.btmbar"),
        i118n.t("features.drawer"),
        i118n.t("features.languages"),
        i118n.t("features.dk"),
        i118n.t("features.animations"),
        i118n.t("features.loading"),
        i118n.t("features.star"),
        i118n.t("features.hooks"),
        i118n.t("features.ux"),
        i118n.t("features.navigationEvents")
    ]

    // quick function helper
    const myAnimation = (iterator, text, delay) => {
        return (
            <>
                <Animatable.Text animation="fadeInDown" delay={1000*delay} iterationCount={1} direction="normal"
                                 style={{fontSize: 12, textAlign: 'center', margin: 10, textTransform: 'uppercase', fontWeight : 'bold'}}
                >{iterator} - {text}
                </Animatable.Text>
                <Divider />
            </>
        )
    }

    // diplaying animations
    const display = () => {
        if(myWipe){
            return (
                <>
                    <FadeInView style={{height: 50}}>
                        <Text style={{
                            fontSize: 18, textAlign: 'center', textTransform: 'uppercase', fontWeight : 'bold', color: 'indigo'
                        }}
                        >{i118n.t("features.seum")}</Text>

                    </FadeInView>
                    <View style={{marginTop: 20}}>

                        {myAnimation(1, allFeatures[0], 1)}
                        {myAnimation(2, allFeatures[1], 2)}
                        {myAnimation(3, allFeatures[2], 3)}
                        {myAnimation(4, allFeatures[3], 4)}
                        {myAnimation(5, allFeatures[4], 5)}
                        {myAnimation(6, allFeatures[5], 6)}
                        {myAnimation(7, allFeatures[6], 7)}
                        {myAnimation(8, allFeatures[7], 8)}
                        {myAnimation(9, allFeatures[8], 9)}
                        {myAnimation(10, allFeatures[9], 10)}
                        {myAnimation(11, allFeatures[10], 11)}
                        {myAnimation(12, allFeatures[11], 12)}
                        {myAnimation(13, allFeatures[12], 13)}
                        {myAnimation(14, allFeatures[13], 14)}
                        {myAnimation(15, allFeatures[14], 15)}
                        {myAnimation(16, allFeatures[15], 16)}
                        {myAnimation(17, allFeatures[16], 17)}
                    </View>
                </>
            )
        }
    }

    return (
        <ScrollView >
            {/* restart animation */}
            <NavigationEvents
                onDidBlur={() => {
                    setMyWipe(false)
                }}
                onWillFocus={() => {
                    setMyWipe(true)
                }}
            />
            {display()}


        </ScrollView>

    )
}

export default FeaturesHistoryScreen;
