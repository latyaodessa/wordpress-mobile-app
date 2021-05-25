import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {Avatar, List} from 'react-native-paper';


function ContactScreen() {


  return (
      <SafeAreaView style={{justifyContent: "center", alignItems: "center"}}>
        <Avatar.Image size={150} source={require('../../assets/logo.jpeg')} />

        <List.Item
            title="Twitter: @bananandre_"
            left={props => <List.Icon {...props} icon="twitter"/>}
            onPress={() => window.open('https://twitter.com/bananandre_', '_blank')}
        />

        <List.Item
            title="Instagram: @andr2art"
            left={props => <List.Icon {...props} icon="instagram"/>}
            onPress={() => window.open('https://www.instagram.com/andr2art', '_blank')}
        />
        <List.Item
            title="Source code on Github"
            left={props => <List.Icon {...props} icon="github"/>}
            onPress={() => window.open('https://github.com/latyaodessa/wordpress-mobile-app', '_blank')}
        />
      </SafeAreaView>
  );
}


export default ContactScreen;
