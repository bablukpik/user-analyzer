import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableHighlight, Button, ActivityIndicator, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Colors, Font_Size } from '../constants/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import { toggleActive } from '../reducers/statusReducer';
import { toggleSuperActive } from '../reducers/statusReducer';
import { toggleBored } from '../reducers/statusReducer';
import { setGlobalData } from '../reducers/dataReducer';
import { changeStartDate } from '../reducers/dateReducer';
import { changeEndDate } from '../reducers/dateReducer';
import { useNavigation } from '@react-navigation/native';
import { hideEditFilter, showEditFilter } from "../reducers/editFilterReducer";
const screenWidth = Math.round(Dimensions.get('window').width);
var moment = require('moment');

export default function SelectFilter() {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const status = useSelector(state => state.statusReducer)
    const selectedDate = useSelector(state => state.dateReducer)
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);

    const onChangeFrom = (event, selectedDate) => {
        if (typeof (selectedDate) == "undefined") {
            setShowFrom(false)
            var dateToPass = new Date(2015, 1, 1).toString()
            dispatch(changeStartDate(dateToPass))
            return
        }
        setShowFrom(Platform.OS === 'ios');
        var dateToPass = selectedDate.toString()
        dispatch(changeStartDate(dateToPass))
    };

    const onChangeTo = (event, selectedDate) => {
        if (typeof (selectedDate) == "undefined") {
            setShowTo(false)
            var dateToPass = new Date(2015, 1, 1).toString()
            dispatch(changeEndDate(dateToPass))
            return
        }
        setShowTo(Platform.OS === 'ios');
        var dateToPass = selectedDate.toString()
        dispatch(changeEndDate(dateToPass))
    };

    const generateButtonHandler = () => {
        if (!status.bored && !status.active && !status.superActive) {
            alert("Please select at least one status item.")
        } else {
            var startDate = new Date(selectedDate.startDate);
            var endDate = new Date(selectedDate.endDate);
            var obj = {
                startDate: startDate,
                endDate: endDate,
                active: status.active,
                superActive: status.superActive,
                bored: status.bored
            }
            dispatch(setGlobalData(obj));
            navigation.navigate('UserGrid');
        }
    }

    const GenerateButton = () => {
        return (
            <TouchableOpacity onPress={() => {
                generateButtonHandler()
                dispatch(hideEditFilter())
            }} style={styles.button}>
                <Text style={styles.buttonText}>Generate</Text>
            </TouchableOpacity>
        )
    }

    const CheckBox = (props) => {
        return (
            <TouchableOpacity onPress={props.toggle} style={styles.checkboxContainer}>
                <View style={[styles.checkbox, { backgroundColor: props.checked ? Colors.primary : Colors.checkbox_inactive }]}>
                    <Icon
                        name="check"
                        color={props.checked ? Colors.background : null}
                        size={12}
                    />
                </View>
                <Text style={styles.checkboxLabel}>{props.label}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={styles.selectorContainer}>
                <Text style={styles.selectorHeading}>Date</Text>
                <View style={styles.dash} />
                
                <View style={styles.textboxContainer}>
                    <Text style={styles.textboxLabel}>From</Text>
                    <TouchableOpacity onPress={setShowFrom} style={styles.textbox}>
                        <Text style={styles.textboxContent}>{selectedDate.startDate}</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.textboxContainer}>
                    <Text style={styles.textboxLabel}>To</Text>
                    <TouchableOpacity onPress={setShowTo} style={styles.textbox}>
                        <Text style={styles.textboxContent}>{selectedDate.endDate}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.selectorHeading}>Status</Text>
                <View style={styles.dash} />
                
                <CheckBox toggle={() => dispatch(toggleActive())} checked={status.active} label="Active" />
                <CheckBox toggle={() => dispatch(toggleSuperActive())} checked={status.superActive} label="Super Active" />
                <CheckBox toggle={() => dispatch(toggleBored())} checked={status.bored} label="Bored" />
                
                <GenerateButton />
                
                {showFrom && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date(2016, 0, 1)}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeFrom}
                    />
                )}

                {showTo && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date(2017, 0, 1)}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeTo}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        width: screenWidth,
        height: 70,
        backgroundColor: Colors.primary,
        shadowRadius: 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        elevation: 5,
        alignItems: "center"
    },
    heading: {
        fontSize: Font_Size.extra_large,
        color: Colors.primary,
        textAlign: 'center',
        fontWeight: '600',
    },
    subHeading: {
        fontSize: Font_Size.medium,
        fontWeight: '600',
        color: Colors.secondary,
        textAlign: 'center',
        marginTop: 10,
    },
    headingContainer: {
        alignSelf: 'center',
        marginVertical: 40,
    },
    selectorContainer: {
        width: screenWidth - 50,
        borderWidth: 1,
        borderColor: Colors.primary,
        alignSelf: 'center',
    },
    selectorHeading: {
        fontSize: Font_Size.large,
        fontWeight: '800',
        color: Colors.primary,
        textAlign: 'left',
        marginLeft: 15,
        marginVertical: 5
    },
    dash: {
        width: screenWidth - 80,
        backgroundColor: Colors.secondary,
        height: 1,
        marginBottom: 10,
        alignSelf: 'center',
    },
    textboxContainer: {
        flexDirection: 'row',
        width: screenWidth - 80,
        backgroundColor: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 5
    },

    textboxLabel: {
        fontSize: Font_Size.medium,
        fontWeight: '800',
        color: Colors.primary,
        textAlign: 'left',
        marginLeft: 15,
        width: 65
    },
    textbox: {
        height: 40,
        borderWidth: 1,
        borderColor: Colors.primary,
        width: screenWidth - 160,
        justifyContent: 'center',
    },
    textboxContent: {
        fontSize: Font_Size.medium,
        fontWeight: '600',
        color: Colors.secondary,
        textAlign: 'left',
        marginLeft: 15
    },
    button: {
        backgroundColor: Colors.primary,
        shadowRadius: 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        elevation: 5,
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,

        borderRadius: 5,
        marginTop: 30,
        marginBottom: 20

    },
    buttonText: {
        fontSize: Font_Size.large,
        fontWeight: "600",
        width: 100,
        textAlign: "center",
        color: Colors.background
    },
    checkboxContainer: {
        flexDirection: "row",
        paddingVertical: 5,
        paddingLeft: 15,
        alignItems: 'center',
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 2,
        alignItems: "center",
        justifyContent: 'center',
    },
    checkboxLabel: {
        marginLeft: 15,
        color: Colors.secondary
    }

});
