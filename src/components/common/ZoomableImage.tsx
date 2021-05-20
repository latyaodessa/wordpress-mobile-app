import React from 'react';
import {Animated, Dimensions, Image, View} from 'react-native';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  State
} from 'react-native-gesture-handler';

const DEVICE_WIDTH = Dimensions.get('window').width;

const ZoomableImage: React.FC<{ src: string }> = ({src}) => {

  const [imgDimensions, setImgDimensions] = React.useState('');

  const [componentWidth, setComponentWidth] = React.useState(undefined);

  const pinchRef = React.createRef();
  const rotationRef = React.createRef();
  const panRef = React.createRef();

  let _baseScale = new Animated.Value(1);
  const _pinchScale = new Animated.Value(1);
  const _scale = Animated.multiply(_baseScale, _pinchScale);

  let _lastScale = 1;

  const _onPinchGestureEvent = Animated.event([{nativeEvent: {scale: _pinchScale}}], {useNativeDriver: false});

  const _onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _lastScale *= event.nativeEvent.scale;
      _baseScale.setValue(_lastScale);
      _pinchScale.setValue(1);
    }
  };

  React.useEffect(() => {
    Image.getSize(src, (width, height) => {
      const aspectRatio = width / height;
      const newHeight = componentWidth / aspectRatio;
      const newWidth = newHeight * aspectRatio;


      setImgDimensions({
        width: isNaN(newWidth) || newWidth === 0 ? DEVICE_WIDTH : newWidth,
        height: isNaN(newHeight) || newHeight === 0 ? DEVICE_WIDTH : newHeight,
      });
    });
  }, [componentWidth, src, setImgDimensions]);

  if (!imgDimensions && componentWidth) {
    return <></>;
  }

  return (
      <View
          onLayout={(event) => {
            const {width} = event.nativeEvent.layout;
            setComponentWidth(width);
          }}
          style={{
            flex: 1,
          }}
      >
        <PanGestureHandler ref={panRef} minDist={10} minPointers={2} maxPointers={2} avgTouches>
          <Animated.View style={{flex: 1}}>
            <NativeViewGestureHandler ref={rotationRef} simultaneousHandlers={pinchRef}>
              <Animated.View style={{flex: 1}}>
                <PinchGestureHandler
                    ref={pinchRef}
                    onGestureEvent={_onPinchGestureEvent}
                    onHandlerStateChange={_onPinchHandlerStateChange}
                >
                  <Animated.ScrollView collapsable={false}>
                    <Animated.Image
                        // resizeMode="contain"
                        style={[
                          {
                            ...{
                              width: imgDimensions.width,
                              height: imgDimensions.height,
                            },
                          },
                          {
                            transform: [{perspective: 200}, {scale: _scale}],
                          },
                        ]}
                        source={{uri: src}}
                    />
                  </Animated.ScrollView>
                </PinchGestureHandler>
              </Animated.View>
            </NativeViewGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </View>
  );
};

export default ZoomableImage;
