import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherUpdatesScreen from '../screens/WeatherUpdatesScreen';
import MainScreen from '../screens/main'; // Assuming this is your main screen

const Stack = createNativeStackNavigator();

// ******** Deep Linking ****** //
const linking = {
    prefixes: ['yourapp://'],
    config: {
        screens: {
            WeatherUpdates: 'weather/updates',
        },
    },
};

// ******** Main Stack ****** //
function MainStack() {
    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={MainScreen} options={{ headerTitle: 'Sensors' }} />
                <Stack.Screen name="WeatherUpdates" component={WeatherUpdatesScreen} options={{ headerTitle: 'Weather' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainStack;
