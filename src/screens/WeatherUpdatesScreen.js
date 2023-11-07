// WeatherUpdatesScreen.js
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchWeatherData } from '../redux/actions/dataActions'

function WeatherUpdatesScreen(props) {
    // Display weather updates or perform actions related to weather updates
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        if (route?.name === 'WeatherUpdates') {
            // Handle the deep link action, e.g., navigate to specific content
            // You can use the "action" value from the notification data
            console.log(route?.name)
            if (route?.params?.action === 'weatherUpdates') {
                // Perform the action, e.g., display weather updates
                // You can also fetch and display the weather data here
                console.log(route?.params?.action)
                props.fetchWeatherData()
            }
        }
    }, [route?.params]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 20 }}>
            <Text style={{ textAlign: "justify" }}>Weather Data Not Availble because you the weather API is not working and you did not set the "darkSkyApiKey = process.env.DARKSKY_API_KEY" in your data source (backend)</Text>
        </View>
    );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { fetchWeatherData })(WeatherUpdatesScreen);
