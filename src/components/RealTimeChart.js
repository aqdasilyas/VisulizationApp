// src/components/RealTimeChart.js

import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart, BarChart } from "react-native-chart-kit";
import DropDownPicker from 'react-native-dropdown-picker';
import OtrixDivider from './divider';

const { width, height } = Dimensions.get('window')

const chartOptions = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${0.4})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "6",
        stroke: "#ffa726"
    }
}

const RealTimeChart = (props) => {
    const graphData = {
        labels: ['', props?.data?.id],
        datasets: [
            {
                data: [
                    0,
                    props?.data?.data,
                ]
            }
        ]
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('Line Chart');
    const [items, setItems] = useState([
        { label: 'Line Chart', value: 'Line Chart' },
        { label: 'Bar Chart', value: 'Bar Chart' }
    ]);

    return (
        <View style={{ flex: 1 }}>
            <DropDownPicker
                style={{ width: '40%', alignSelf: 'flex-end', marginVertical: 10 }}
                dropDownContainerStyle={{ width: '40%', alignSelf: 'flex-end', }}
                placeholder='please select a chart'
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            <OtrixDivider size='lg' />
            <OtrixDivider size='lg' />
            <OtrixDivider size='lg' />

            {
                value == 'Line Chart'
                    ? <LineChart
                        data={graphData}
                        width={width / 1.05} // from react-native
                        height={200}
                        chartConfig={chartOptions}
                        // bezier
                        style={styles.graphStyle}
                    />
                    : <BarChart
                        data={graphData}
                        width={width / 1.05} // from react-native
                        height={200}
                        chartConfig={chartOptions}
                        style={styles.graphStyle}
                    />
            }
        </View>
    );
};

export default RealTimeChart;

const styles = StyleSheet.create({
    graphStyle: {
        marginVertical: 8,
        borderRadius: 16
    }
})
