import * as React from 'react';
import {ScrollView} from 'react-native';
import {Title} from "react-native-paper";
import {RouteProp, useRoute} from '@react-navigation/native';
import {getPostById} from '../rest/WpPostsRestClient';
import {WpPostType} from "../types/WpPostType";
import {executeDecode} from "../utils/TextUtil";
import HtmlComponent from "../components/common/HtmlComponent";

type DetailsTypes = {
  Details: {
    id: number;
  };
};


const WpPostDetails = () => {

  const route = useRoute<RouteProp<DetailsTypes, 'Details'>>();

  const [wpPost, setWpPost] = React.useState<WpPostType | undefined>(undefined);

  React.useEffect(() => {
    getPostById(route.params.id).then(({data}) => {
      setWpPost(data);
    })
  }, [route.params.id])


  return (
      <ScrollView style={{flex: 1}}>
        <Title>{executeDecode(wpPost?.title?.rendered)}</Title>
        <HtmlComponent html={wpPost?.content?.rendered}/>
      </ScrollView>
  );
}

export default WpPostDetails;
