import React from 'react';
import HTML from 'react-native-render-html';
import {useTheme} from '@react-navigation/native';
import {Platform, View} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import ZoomableImage from './ZoomableImage';


const HtmlComponent: React.FC<{ html?: string }> = ({html}) => {
  const {colors} = useTheme();
  const tagsStyles: any = {};

  Object.keys(HTML_TAGS_STYLE).forEach(
      (htmlTag) =>
          (tagsStyles[htmlTag] = {
            ...HTML_TAGS_STYLE[htmlTag],
            color: colors.text,
          }),
  );

  return (
      <HTML
          html={html}
          tagsStyles={tagsStyles}
          onLinkPress={async (event, href, htmlAttribs) => {
            if (!href) {
              alert('Linking is disabled in edit mode');
            } else if (Platform.OS === 'web') {
              window.open(href, '_blank');
            } else {
              await WebBrowser.openBrowserAsync(href);
            }
          }}
          renderers={{
            img: (attr, node, styleProp) => {
              return !!attr?.src ? <ZoomableImage src={attr.src.toString()}/> : null;
            },
            iframe: (attr, node, styleProp) => {
              return !!attr?.src ? <RenderIframe src={attr.src.toString()}/> : null;
            },
            hr: () => <Divider/>,
          }}
      />
  );
};


const RenderIframe: React.FC<{ src: string }> = ({src}) => {
  const [componentWidth, setComponentWidth] = React.useState<number | undefined>(undefined);
  const {colors} = useTheme();

  const iFrameStyle = `border: 0; flex: 1; height: 100%; width: 100%; background-color: ${colors.background};`;

  return (
      <View
          onLayout={(event) => {
            const {width} = event.nativeEvent.layout;
            setComponentWidth(width);
          }}
          style={{
            display: 'flex',
            flex: 1,
          }}
      >
        {!componentWidth ? (
            <ActivityIndicator/>
        ) : (
            <WebView
                originWhitelist={['*']}
                style={{display: 'flex', flex: 1, width: componentWidth, height: "auto"}}
                source={{
                  html: `<iframe style="${iFrameStyle}" src=${src} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>`,
                }}
            />
        )}
      </View>
  );
};

const HTML_TAGS_STYLE: any = {
  a: {
    textDecorationLine: 'underline',
  },
  abbr: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
  address: {
    fontStyle: 'italic',
  },
  area: {},
  article: {},
  aside: {},
  b: {
    fontWeight: 'bold',
  },
  base: {},
  bdi: {},
  bdo: {}, //text direction not implemented,
  blockquote: {}, //not implemented
  body: {},
  button: {}, //not implemented
  canvas: {}, //not implemented
  cite: {
    fontStyle: 'italic',
  },
  code: {
    fontFamily: 'Courier',
  },
  table: {}, //not working
  tr: {},
  col: {},
  colgroup: {},
  th: {},
  div: {},
  em: {
    fontStyle: 'italic',
  },
  strong: {
    fontWeight: 'bold',
  },
  samp: {},
  kbd: {},
  var: {fontStyle: 'italic'},
  form: {},
  fieldset: {},
  h1: {
    fontWeight: '500',
    fontSize: 36,
  },
  h2: {
    fontWeight: '500',
    fontSize: 30,
  },
  h3: {
    fontWeight: '500',
    fontSize: 24,
  },
  h4: {
    fontWeight: '500',
    fontSize: 18,
  },
  h5: {
    fontWeight: '500',
    fontSize: 14,
  },
  h6: {
    fontWeight: '500',
    fontSize: 12,
  },
  html: {},
  i: {fontStyle: 'italic'},
  ol: {},
  li: {}, //dots not working
  ul: {},
  span: {
    display: 'flex',
  },
  nav: {},
  select: {},
  p: {},
  s: {
    textDecorationLine: 'line-through',
  },
  del: {
    textDecorationLine: 'line-through',
  },
  tbody: {},
  title: {},
  u: {
    textDecorationLine: 'underline',
  },
  ins: {
    textDecorationLine: 'underline',
  },
};

export default HtmlComponent;
