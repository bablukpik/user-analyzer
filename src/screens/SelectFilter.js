import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableHighlight, Button, ActivityIndicator, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Colors, Font_Size } from '../constants/constants';
import Selector from '../components/Selector';
const screenWidth = Math.round(Dimensions.get('window').width);

export default function SelectFilter() {
    return (
        <View style={styles.container}>
            <View style={styles.header} />
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>User Analyzer</Text>
                <Text style={styles.subHeading}>Select Filters To Generate Report</Text>
            </View>
            <Selector/>
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

});
