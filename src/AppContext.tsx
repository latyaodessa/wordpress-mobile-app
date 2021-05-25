import React from 'react';
import {SafeAreaView, ScrollView, View} from "react-native";
import {Button, Divider, List, Subheading, TextInput} from "react-native-paper";
import {createStackNavigator} from '@react-navigation/stack';

export const AppContext = React.createContext<{ url: string | undefined, updateUrl?: (v: string | undefined) => void }>({url: undefined});
const Stack = createStackNavigator();

const WP_PAGES: Array<{ name: string, url: string, desc: string }> = [
  {
    name: "PlayStation.Blog",
    url: "https://blog.playstation.com",
    desc: "PlayStation Blog"
  },
  {
    name: "Spotify News",
    url: "https://newsroom.spotify.com",
    desc: "Spotify is a Swedish audio streaming and media services"
  },
  {
    name: "Beauty Is Boring",
    url: "https://beautyisboring.com",
    desc: "Beauty Is Boring"
  },
  {
    name: "Flickr Blog",
    url: "https://blog.flickr.net/en",
    desc: "Flickr Blog"
  },
  {
    name: "TechCrunch",
    url: "https://techcrunch.com",
    desc: "TechCrunch is an American online newspaper focusing on high tech and startup companies."
  },
  {
    name: "The Mozilla Blog",
    url: "https://blog.mozilla.org",
    desc: "The Mozilla Blog"
  },
  {
    name: "BBC America",
    url: "https://www.bbcamerica.co",
    desc: "BBC America Blog"
  },
  {
    name: "TED-Ed Blog",
    url: "https://blog.ted.com",
    desc: "TED-Ed celebrates the ideas of teachers and students around the world."
  }, {
    name: "The Sun",
    url: "https://www.thesun.co.uk",
    desc: "News, sport, celebrities and gossip"
  }, {
    name: "Creative Commons",
    url: "https://creativecommons.org",
    desc: "A Creative Commons license is one of several public copyright licenses"
  },
  {
    name: "O Canada",
    url: "https://o.canada.com",
    desc: "O Canada Blog"
  },
  {
    name: "Classical Music News",
    url: "https://www.classicalmusicnews.ru",
    desc: "ClassicalMusicNews.Ru - Новости академической музыки."
  },
  {
    name: "Rolling Stone Magazine",
    url: "https://www.rollingstone.com",
    desc: "Rolling Stone is an American monthly magazine that focuses on music, politics, and popular culture."
  },
  {
    name: "Sylvester Stallone Personal Blog",
    url: "https://sylvesterstallone.com",
    desc: "Sylvester Enzio Stallone is an American actor, screenwriter, director, and producer."
  }
];

export const AppContextProvider: React.FC = ({children}) => {

  const [selectedBlog, setSelectedBlog] = React.useState<string | undefined>(undefined);


  return (
      <AppContext.Provider
          value={{
            url: selectedBlog, updateUrl: (url) => {
              url && alert(`The Wordpress website "${url}" will be converted to mobile app. Reload the page to return to the main screen`);
              setSelectedBlog(url);

            }
          }}
      >

        {selectedBlog ? children :
            <Stack.Navigator>
              <Stack.Screen name="Convert Wordpress Blog To Mobile App" component={InitialScreen}/>
            </Stack.Navigator>
        }

      </AppContext.Provider>
  );
};

const InitialScreen = () => {
  const {updateUrl} = React.useContext(AppContext);
  const [freeText, setFreeText] = React.useState<string | undefined>(undefined);

  return (<SafeAreaView style={{justifyContent: "center", alignItems: "center"}}>
    <Subheading style={{padding: 10}}>
      Servus! Hi there! Turn your WordPress Blog into a Mobile App with one click.
      Here you can try out how your Mobile App will look like!
    </Subheading>

    <View style={{flexDirection: "row", width: "100%", alignItems: "center", padding: 10}}>
      <TextInput
          style={{flex: 1}}
          label="Type some Wordpress website"
          value={freeText}
          onChangeText={setFreeText}
      />
      <Button mode="contained" onPress={() => updateUrl && updateUrl(freeText)}>
        Convert to Mobile App
      </Button>
    </View>
    <ScrollView>
      <List.Section>
        <List.Subheader>Converted Wordpress Blogs</List.Subheader>
        {WP_PAGES.map(wp => {
          return (<List.Item
              title={`${wp.name} | ${wp.url}`}
              description={wp.desc}
              onPress={() => updateUrl && updateUrl(wp.url)}
          />)
        })}
      </List.Section>

    </ScrollView>
    <Divider/>
    <View style={{
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      padding: 10,
      justifyContent: "center"
    }}>
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
    </View>
  </SafeAreaView>)
}
