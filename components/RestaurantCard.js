import React from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import tw from "twrnc";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const RestaurantCard = ({ id , name, travelTime }) => {
  return (
    <SafeAreaView style={tw.style(`px-4 pt-2 pb-5 mx-5`, { width: windowWidth })}>
      <Image style={styles.restaurantImage} source={require("../assets/restaurants/cafe-food.jpg")}/>
      <View style={tw`flex-row items-center justify-between pt-2 pb-1`}>
        <Text style={tw`font-medium`}>{name}</Text>
        <Image style={styles.highlyRatedIcon} source={require("../assets/highly-rated-flat.png")}/>
      </View>
      <View style={tw`flex-row items-center`}>
        <Image style={styles.oneIcon} source={require("../assets/one-icon.png")}/>
        <Text> • £1.29 Delivery Fee •</Text>
        <Text style={tw`text-gray-500`}>{travelTime?.duration?.text  || travelTime}</Text>
      </View>
    </SafeAreaView>
  )
}

export default RestaurantCard

const styles = StyleSheet.create({
  restaurantImage: {
    width: windowWidth * 0.9,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  highlyRatedIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 16,
  },
  oneIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
});
