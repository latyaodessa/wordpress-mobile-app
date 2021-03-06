import * as React from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {getCategories} from '../rest/WpPostsRestClient';
import {WpCategoryType} from "../types/WpCategoryType";
import {useNavigation} from "@react-navigation/native";
import {ActivityIndicator, Avatar, List} from 'react-native-paper';
import {AppContext} from "../AppContext";
import { executeDecode } from '../utils/TextUtil';

function CategoriesScreen() {

  const [categories, setCategories] = React.useState<Array<WpCategoryType> | undefined>(undefined);
  const {url} = React.useContext(AppContext);

  React.useEffect(() => {
    url && getCategories(url).then(({data}) => {
      setCategories(data);
    });
  }, [])

  if (!categories) {
    return <ActivityIndicator/>
  }

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
            data={categories}
            renderItem={({item}) => <WpCategoryItem item={item}/>}
        />
      </SafeAreaView>
  );
}


const WpCategoryItem: React.FC<{ item: WpCategoryType }> = ({item}) => {

  const navigation = useNavigation();

  return (
      <List.Item title={executeDecode(item.name)}
                 left={({style}) => <Avatar.Text style={style}
                                                 label={item?.name?.substring(0, 2)}/>}
                 onPress={() => navigation.navigate("Blog", {categoryId: item.id})}
      />
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }
});

export default CategoriesScreen;
