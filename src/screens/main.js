import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchSingleSensors } from '../redux/actions/dataActions'
import RealTimeChart from '../components/RealTimeChart';
import OtrixDivider from '../components/divider';

function main(props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(props?.allSensors ? props?.allSensors : []);

    // ***************** customize the sensors array to adjust the data in DropDown Array ***************** 
    useEffect(() => {
        if (props?.allSensors.length > 0) {
            customizeList()
        }
    }, [props?.allSensors])

    const customizeList = async () => {
        const newArray = await props?.allSensors.map((item) => {
            return { label: item, value: item };
        })
        setItems(newArray)
        setValue(newArray[0].value)
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 10 }}>
            {/*************** List of Sensors ****************/}
            <View style={{ marginVertical: 20 }}>
                <Text>All Sensors</Text>
                <OtrixDivider size='sm' />

                <FlatList
                    data={props?.allSensors}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return <Text key={index} style={styles.TextStyles}>{`${index + 1}) ${item}`}</Text>
                    }}
                />
            </View>

            {/*************** Select a Sensors to view data on chart ****************/}
            <View>
                <Text>Please select a sensors</Text>
                <OtrixDivider size='sm' />

                {(props?.allSensors.length > 0 && Object.keys(props?.singleSensor).length > 0) &&
                    <>
                        <DropDownPicker
                            placeholder='All Sensors'
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            onChangeValue={(val) => val && props.fetchSingleSensors(val)}
                        />
                        <RealTimeChart data={Object.keys(props?.singleSensor).length > 0 && props?.singleSensor} allSenors={props?.allSensors} />
                    </>
                }
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    allSensors: state.sensor.allSensors,
    singleSensor: state.sensor.singleSensor,
});

export default connect(mapStateToProps, { fetchSingleSensors })(main);

const styles = StyleSheet.create({
    TextStyles: {
        fontSize: 12,
        color: 'black',
        margin: 5
    }
})