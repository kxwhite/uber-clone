import React from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import tw from "twrnc";

const foodTypeData = [
  {
    id: "1",
    title: "Deals",
    image: require("../assets/foodTypes/deal.png"),
  },
  {
    id: "2",
    title: "Grocery",
    image: require("../assets/foodTypes/grocery.png"),
  },
  {
    id: "3",
    title: "Convenience",
    image: require("../assets/foodTypes/convenience.png"),
  },
  {
    id: "4",
    title: "Fast Food",
    image: require("../assets/foodTypes/fast-food.png"),
  },
  {
    id: "5",
    title: "Alcohol",
    image: require("../assets/foodTypes/alcohol.png"),
  },
  {
    id: "6",
    title: "Specialty Foods",
    image: require("../assets/foodTypes/specialty-foods.png"),
  },
  {
    id: "7",
    title: "Highly Rated",
    image: require("../assets/foodTypes/highly-rated.png"),
  },
  {
    id: "8",
    title: "Halal",
    image: require("../assets/foodTypes/halal.png"),
  },
  {
    id: "9",
    title: "Coffee & Tea",
    image: require("../assets/foodTypes/coffee-tea.png"),
  },
  {
    id: "10",
    title: "Pizza",
    image: require("../assets/foodTypes/pizza.png"),
  },
  {
    id: "11",
    title: "Healthy",
    image: require("../assets/foodTypes/healthy.png"),
  },
  {
    id: "12",
    title: "Chinese",
    image: require("../assets/foodTypes/chinese.png"),
  },
  {
    id: "13",
    title: "Indian",
    image: require("../assets/foodTypes/indian.png"),
  },
  {
    id: "14",
    title: "Caribbean",
    image: require("../assets/foodTypes/caribbean.png"),
  },
  {
    id: "15",
    title: "Greek",
    image: require("../assets/foodTypes/greek.png"),
  },
  {
    id: "16",
    title: "Mexican",
    image: require("../assets/foodTypes/mexican.png"),
  },
  {
    id: "17",
    title: "Sandwich",
    image: require("../assets/foodTypes/sandwich.png"),
  },
  {
    id: "18",
    title: "Thai",
    image: require("../assets/foodTypes/thai.png"),
  },
  {
    id: "19",
    title: "Turkish",
    image: require("../assets/foodTypes/turkish.png"),
  },
  {
    id: "20",
    title: "Wings",
    image: require("../assets/foodTypes/wings.png"),
  },
];

const FoodTypeCards = () => {
  return (
    <SafeAreaView>
      <FlatList
        style={tw`p-4 py-8`}
        data={foodTypeData}
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, image } }) => (
          <TouchableOpacity
            style={tw.style(`mx-3 items-center ${id === 20 ? "pr-1" : ""}`)}
          >
            <Image style={styles.foodTypeImage} source={image} />
            <Text style={tw`pt-2 font-medium`}>{title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

export default FoodTypeCards

const styles = StyleSheet.create({
  foodTypeImage: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
});
