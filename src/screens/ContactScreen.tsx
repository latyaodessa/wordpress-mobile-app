import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {List} from 'react-native-paper';


function ContactScreen() {


  return (
      <SafeAreaView>
        <List.Item
            title="Twitter: @bananandre_"
            left={props => <List.Icon {...props} icon="twitter"/>}
            onPress={() => window.open('https://twitter.com/bananandre_', '_blank')}
        />
        <List.Item
            title="Source code on Github"
            left={props => <List.Icon {...props} icon="github"/>}
        />
      </SafeAreaView>
  );
}


export default ContactScreen;
