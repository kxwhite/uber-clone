import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import tw from "twrnc";
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const SearchBar = () => {
  const navigation = useNavigation();

  return (
    <View
      style={tw`flex-row items-center justify-between bg-gray-200 m-3 rounded-full p-2`}
    >
      <View style={tw`flex-row items-center`}>
        <Icon style={tw`px-3`} name="search" type="feather" />
        <Text
          style={tw`text-gray-500`}
          onPress={() => navigation.navigate("SearchScreen")}
        >
          Food, shopping, drinks, etc
        </Text>
      </View>
      <Icon
        style={tw`p-3 border-l border-gray-300 -my-2`}
        name="sliders"
        type="feather"
        onPress={() => navigation.navigate("FiltersScreen")}
      />
    </View>
  );
}

export default SearchBar

const styles = StyleSheet.create({})
