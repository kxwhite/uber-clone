import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";

const SearchScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`flex-row items-center bg-gray-200 m-3 rounded-full`}>
      <Icon style={tw`pl-3`} name="search" type="feather" />
      <GooglePlacesAutocomplete
        styles={toInputStyles}
        placeholder="Food, shopping, drinks, etc"
        fetchDetails={true}
        returnKeyType={"search"}
        minLength={2}
        onPress={(data, details = null) => {
          dispatch(
            setDestination({
              location: details.geometry.location,
              description: data.description,
            })
          );
          navigation.navigate("RestaurantsCard");
        }}
        enablePoweredByContainer={false}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
      />
    </SafeAreaView>
  )
}

export default SearchScreen

const toInputStyles = StyleSheet.create({
  textInput: {
    borderRadius: 0,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: "transparent",
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});


const styles = StyleSheet.create({})
