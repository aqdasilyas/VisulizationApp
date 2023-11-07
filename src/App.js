import React, { useEffect, useState } from 'react';
import { StyleSheet, LogBox, Platform, PermissionsAndroid } from 'react-native';
import socket from './services/webSocket';
import { fetchSensors } from './redux/actions/dataActions';
import store from './redux/store';
import MainStack from './navigation/mainStack';
import ErrorComponent from './components/ErrorComponent';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { notificationListeners, requestUserPermission } from './helpingFunc/pushNotification';

LogBox.ignoreAllLogs();

export default function App() {
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  // ************************* fetch Sensors when Socket is connected *************************
  const connectAndFetchData = () => {
    if (!socket.connected) {
      socket.connect();
    }
    store.dispatch(fetchSensors()); // Sensors API **************************
  };

  // ************************ Socket Function ************************
  useEffect(() => {
    // ************ Socket Connection ************
    socket.on("connect", () => {
      console.log(socket.connected); // true
      console.log("User is connected: ", socket.id); // x8WIv7-mJelg7on_ALbx
      setIsSocketConnected(true);
      connectAndFetchData();
    });

    // ************ Socket Diconnected ************
    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        setTimeout(() => {
          socket.connect();
        }, 1000);
      }
      setIsSocketConnected(false);
      console.log(socket.connected); // false
      console.log("User is Disconnected: ", socket.id); // undefined
    });

    // ************ Socket Connection Error ************
    socket.on("connect_error", () => {
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });

    // ************ Socket Listeners Unmount ************
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, []);

  // ******************************* Notification Services **********************************

  // useEffect(() => {
  //   if (Platform.OS == 'android') {
  //     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((res) => {
  //       console.log("res+++++", res)
  //       if (!!res && res == 'granted') {
  //         requestUserPermission()
  //         notificationListeners()
  //       }
  //     }).catch(error => {
  //       alert('something wrong: ', error)
  //     })
  //   } else {
  //     console.log('IOS Device')
  //     requestUserPermission()
  //     notificationListeners()
  //   }
  // }, [])

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {isSocketConnected ? <MainStack /> : <ErrorComponent error={'Socket Connection is Disabled!'} />}
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
