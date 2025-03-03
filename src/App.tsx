import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import RouteManager from './utils/routeManager';
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View style={style.container}>
        <View style={style.containerChild}>
          <RouteManager/>
        </View>
      </View>
    </Provider>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    ...Platform.select({
      ios: {
        paddingTop: StatusBar.currentHeight,
      },
      android: {
        paddingTop: 0,
      },
    }),
  },
  containerChild: {
    flexGrow: 1,
  },
});

export default App;
