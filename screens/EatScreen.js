import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';

import tw from 'twrnc';
import { selectCurrent, selectOrigin, setCurrent, setAddress, selectAddress } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useDispatch } from "react-redux";
import RestaurantCard from '../components/RestaurantCard';
import * as Location from "expo-location";
import { GOOGLE_MAPS_APIKEY } from "@env";
import axios from "axios";
import FoodTypeCards from '../components/FoodTypeCards';
import SearchBar from '../components/SearchBar';




const data = [
  {
    id: "123",
    title: "Rides",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Delivery",
    image: "https://links.papareact.com/28w",
    screen: "EatScreen",
  },
];

// const { width } = Dimensions.get("window");
// const PADDING = 16;
// const ITEM_LENGTH = width - PADDING;

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const EatScreen = () => {
  const [selected, setSelected] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      getLocation();
    } catch (error) {
      console.log("Error retrieving location permission:", error);
    }
  };

  const getLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);

      // Reverse geocoding using Google Maps API
      const apiKey = GOOGLE_MAPS_APIKEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${apiKey}`;

      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        setAddress(response.data.results[0].address_components[1].short_name);
      }

      // Find nearby restaurants using Google Places API
      const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=1000&type=restaurant&key=${apiKey}`;

      const placesResponse = await axios.get(placesUrl);
      if (placesResponse.data.results.length > 0) {
        console.log(JSON.stringify(placesResponse.data.results.name, null, 4));
        setRestaurants(placesResponse.data.results);
      }
    } catch (error) {
      console.log("Error retrieving location:", error);
    }
  };

  useEffect(() => {
    if (!location || !restaurants) return;

    const getTravelTime = async () => {
      const origins = `${location.latitude},${location.longitude}`;
      const destinations = restaurants.map((restaurant) => `${restaurant.geometry.location.lat},${restaurant.geometry.location.lng}`);

      const travelTimeUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origins}&destinations=${destinations.join('|')}&key=${GOOGLE_MAPS_APIKEY}`;

      try {
        const travelTimeResponse = await axios.get(travelTimeUrl);
        const travelTimes = travelTimeResponse.data.rows[0].elements;

        // Update the restaurants array with travel time information
        const updatedRestaurants = restaurants.map((restaurant, index) => ({
          ...restaurant,
          travelTime: travelTimes[index],
        }));

        setRestaurants(updatedRestaurants);
      } catch (error) {
        console.log('Error retrieving travel time:', error);
      }
    };

    getTravelTime();
  }, [location, restaurants, GOOGLE_MAPS_APIKEY]);

  return (
    <SafeAreaView>
      {/* New Nav Options Tabs */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item: { id, title, image, screen }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`p-2 pl-8 pt-4 m-2 w-42`}
          >
            <View
              style={tw.style(
                `flex-row items-center pb-2 ${
                  id === selected?.id ? "border-b-2 border-black" : ""
                }`
              )}
            >
              <Image style={styles.image} source={{ uri: image }} />
              <Text
                style={tw.style(
                  `mt-2 ml-2 text-lg font-semibold ${
                    id === selected?.id ? "" : "opacity-20"
                  }`
                )}
              >
                {title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* Address & Delivery Selection */}
      <View style={tw`flex-row px-4 justify-between`}>
        <View>
          <Text style={tw`font-light`}>Deliver now</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddressDetailsCard")}
            style={tw`flex-row pt-1 items-center`}
          >
            <Text style={tw`pr-2 font-semibold text-center`}>
              {location ? address && address.toString() : "Select Address"}
            </Text>
            <Icon name="chevron-down" type="entypo" size={18} />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("DeliveryOptionsCard")}
            style={tw`flex-row pt-1 items-center bg-gray-200 rounded-full p-3 mr-2`}
          >
            <Text style={tw`pr-2 text-center font-medium`}>Delivery</Text>
            <Icon name="chevron-down" type="entypo" size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("DeliveryOptionsCard")}
            style={tw`flex-row pt-1 items-center bg-black rounded-full p-3`}
          >
            <Icon
              name="shopping-cart"
              color="white"
              type="font-awesome"
              size={18}
            />
            <Text style={tw`pl-2 text-center text-white`}>0</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Food Type Section */}
      <FoodTypeCards />

      {/* Search */}
      <SearchBar />

      {/* Local Favourite */}
      <RestaurantCard
        name="Sunshine Cafe Leatherhead"
        travelTime="10-25 min"
      />

      <View style={tw`border-gray-200 border-b-8 my-5`} />

      <FlatList
        style={tw.style(``)}
        data={restaurants}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item: { place_id, name, travelTime }, item}) => (
          <RestaurantCard
            key={place_id}
            id={place_id}
            name={name}
            travelTime={travelTime}
          />
        )}
      />
    </SafeAreaView>
  );
}

export default EatScreen

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  restaurantImage: {
    width: "100%",
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  highlyRatedIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  oneIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  }
});
