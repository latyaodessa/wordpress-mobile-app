import * as React from 'react';
import {ScrollView} from 'react-native';
import {ActivityIndicator, Headline, Title} from "react-native-paper";
import {RouteProp, useRoute} from '@react-navigation/native';
import {getMedia, getPostById} from '../rest/WpPostsRestClient';
import {WpPostType} from "../types/WpPostType";
import {executeDecode} from "../utils/TextUtil";
import HtmlComponent from "../components/common/HtmlComponent";
import {AppContext} from "../AppContext";
import {WpMediaType} from "../types/WpMediaType";
import ZoomableImage from "../components/common/ZoomableImage";

type DetailsTypes = {
  Details: {
    id: number;
  };
};


const WpPostDetails = () => {

  const route = useRoute<RouteProp<DetailsTypes, 'Details'>>();

  const [wpPost, setWpPost] = React.useState<WpPostType | undefined>(undefined);
  const [wpMedia, setWpMedia] = React.useState<Array<WpMediaType> | undefined>(undefined);
  const {url} = React.useContext(AppContext);

  React.useEffect(() => {
    if (url) {
      getPostById(url, route.params.id).then(({data}) => {
        setWpPost(data);
      })
      getMedia(url, route.params.id).then(({data}) => {
        setWpMedia(data);
      })
    }
  }, [route.params.id])


  if (!wpPost) {
    return <ActivityIndicator/>
  }


  return (
      <ScrollView style={{flex: 1}}>
        <Title>{executeDecode(wpPost?.title?.rendered)}</Title>
        <HtmlComponent html={wpPost?.content?.rendered}/>

        <Headline>Post Images</Headline>
        {wpMedia?.filter(media => !!media?.media_details?.sizes?.full?.source_url).map(media => (
            <ZoomableImage src={media.media_details.sizes.full.source_url}/>))}
      </ScrollView>
  );
}

export default WpPostDetails;
