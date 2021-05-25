import * as React from 'react';
import {FlatList, RefreshControl, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {getPosts} from '../rest/WpPostsRestClient';
import {WpPostType} from "../types/WpPostType";
import {ActivityIndicator, Button, Caption, Card, Searchbar, Title} from 'react-native-paper';
import HtmlComponent from '../components/common/HtmlComponent';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {executeDecode} from '../utils/TextUtil';
import {AppContext} from '../AppContext';

const INITIAL_PAGE = 1;

type HomeScreenTypes = {
  Blog: {
    categoryId?: number;
  };
};


function HomeScreen() {

  const [page, setPage] = React.useState(INITIAL_PAGE);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [posts, setPosts] = React.useState<Array<WpPostType> | undefined>(undefined);
  const [refreshing, setRefreshing] = React.useState(false);
  const {url} = React.useContext(AppContext);
  const route = useRoute<RouteProp<HomeScreenTypes, 'Blog'>>();

  React.useEffect(() => {
    url && getPosts(url, page, searchQuery, route?.params?.categoryId).then(({data}) => {
      if (posts) {
        setPosts([...posts, ...data])
      } else {
        setPosts(data);
      }
    })
  }, [page, searchQuery, route?.params?.categoryId])


  const refresh = () => {
    setRefreshing(true);
    setPage(INITIAL_PAGE);

    url && getPosts(url, INITIAL_PAGE, searchQuery).then(({data}) => {
      setPosts(data);
    }).finally(() => setRefreshing(false))
  }

  const onChangeSearch = (query: string) => {
    setPosts(undefined);
    setPage(1);
    setSearchQuery(query);
  };


  const loadMorePosts = () => {
    setPage(page + 1);
  }

  if (!posts) {
    return <ActivityIndicator/>
  }


  return (
      <SafeAreaView style={styles.container}>
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
        <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh}/>}
            data={posts}
            renderItem={({item}) => <WpPostItem item={item}/>}
            onEndReached={loadMorePosts}
            onEndReachedThreshold={2}
            keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
  );
}

const WpPostItem: React.FC<{ item: WpPostType }> = ({item}) => {

  const navigation = useNavigation();

  const thumbnail = getThumbnail(item);
  return (
      <Card onPress={() => navigation.navigate("Details", {id: item.id})}>
        <Card.Content>
          <Title>{executeDecode(item.title?.rendered)}</Title>
          <HtmlComponent html={executeDecode(item.excerpt?.rendered)}/>
        </Card.Content>
        {thumbnail && <Card.Cover
            source={{uri: thumbnail}}/>}


        <Card.Actions style={styles.actions}>
          <Caption>{new Date(item.date).toDateString()}</Caption>

          <Button onPress={() => navigation.navigate("Details", {id: item.id})}>Read more</Button>
        </Card.Actions>
      </Card>)
}

const getThumbnail = (item: WpPostType) => {
  if (item._embedded['wp:featuredmedia'] && item._embedded['wp:featuredmedia'].length > 0) {
    return item._embedded['wp:featuredmedia'][0].media_details?.sizes?.full?.source_url;
  }
  return undefined;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  actions: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between"
  }
});

export default HomeScreen;
