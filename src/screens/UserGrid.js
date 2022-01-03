import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, FlatList, Modal, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Colors, Font_Size } from '../constants/constants';
const screenWidth = Math.round(Dimensions.get('window').width);
import Icon from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import Selector from '../components/Selector';
import { hideEditFilter, showEditFilter } from "../reducers/editFilterReducer";

const UserGrid = ({ navigation }) => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch()
    const globalData = useSelector(state => state.dataReducer)
    const editFilterVisible = useSelector(state => state.editFilterReducer.modalVisible)
    const [searchResult, setSearchResult] = useState(globalData);

    const searchHandler = (query) => {
        setQuery(query)
        var res = globalData.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
        setSearchResult(res)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FIcon
                    onPress={() => navigation.navigate('SelectFilter')}
                    name="arrow-left"
                    color={Colors.background}
                    style={styles.arrowLeft}
                    size={30}
                />
            </View>

            <TouchableOpacity onPress={() => dispatch(showEditFilter())} style={styles.editFilter}>
                <Text style={styles.editFilterText}>Edit Filters</Text>
                <Icon
                    name="sliders-h"
                    color={Colors.primary}
                    size={20}
                />
            </TouchableOpacity>

            <View style={styles.searchBox}>
                <Icon
                    name="search"
                    color={Colors.secondary}
                    size={20}
                />
                <TextInput
                    style={{ marginLeft: 10, fontSize: Font_Size.medium }}
                    onChangeText={searchHandler}
                    value={query}
                    placeholder="Search by name"
                    keyboardType="default"
                />
            </View>


            {Object.keys(globalData).length === 0 &&
                <Text style={styles.textboxContent}>No Result</Text>
            }

            {query.length > 0 &&
                <Text style={styles.textboxContent}>Users Found: {searchResult.length}</Text>
            }

            {query.length > 0 &&
                <FlatList
                    data={searchResult}
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={(item) => {
                        return item.name;
                    }}
                    renderItem={(post) => {
                        const item = post.item;
                        return (
                            <View style={styles.flatlistContainer}>
                                <Image style={styles.flatlistImage} source={{ uri: item.pictureUrl }} />
                                <Text style={[styles.itemType, {backgroundColor: item.type == "Bored" ? Colors.bored : Colors.primary}]}>
                                    {item.type}
                                </Text>
                                <Text style={{ padding: 10 }}>{item.name}</Text>
                            </View>
                        )
                    }}
                />
            }

            {query.length < 1 &&
                <FlatList
                    data={globalData}
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={(item) => {
                        return item.name;
                    }}
                    renderItem={(post) => {
                        const item = post.item;
                        return (
                            <View style={styles.flatlistContainer}>
                                <Image style={styles.flatlistImage} source={{ uri: item.pictureUrl }} />
                                <Text style={[styles.itemType, {backgroundColor: item.type == "Bored" ? Colors.bored : Colors.primary}]}>{item.type}</Text>
                                <Text style={{ padding: 10 }}>{item.name}</Text>
                            </View>
                        )
                    }}
                />
            }

            <Modal
                animationType="slide"
                transparent={false}
                visible={editFilterVisible}
                onRequestClose={() => dispatch(hideEditFilter())}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.heading}>Edit Filter</Text>
                        <FIcon
                            name="x"
                            onPress={() => dispatch(hideEditFilter())}
                            color={Colors.primary}
                            size={30}
                        />
                    </View>
                    <Selector />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    searchBox: {
      height: 40,
      borderWidth: 1,
      borderColor: Colors.primary,
      width: screenWidth - 40,
      paddingLeft: 15,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
  
    heading: {
      fontSize: Font_Size.extra_large,
      color: Colors.primary,
      textAlign: 'center',
      fontWeight: '600',
    },
    editFilter: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-end',
      margin: 15,
    },
    editFilterText: {
      fontSize: Font_Size.medium,
      fontWeight: '800',
      color: Colors.primary,
      textAlign: 'left',
      marginRight: 15,
    },
    arrowLeft: {
      alignSelf: 'flex-start',
      paddingTop: 15,
      paddingHorizontal: 15,
    },
    flatlistContainer: {
      backgroundColor: '#ffffff',
      shadowRadius: 2,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 5,
      margin: 10,
    },
    itemType: {
      color: Colors.background,
      fontSize: Font_Size.small,
      position: 'absolute',
      fontWeight: 'bold',
      alignSelf: 'flex-end',
      top: 10,
      right: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    flatlistImage: {
      height: screenWidth * 0.5 - 30,
      width: screenWidth * 0.5 - 30,
    },
    modalContainer: {
      backgroundColor: Colors.background,
      flex: 1,
      padding: 25,
      paddingTop: 70,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
  });
  
export default UserGrid;
