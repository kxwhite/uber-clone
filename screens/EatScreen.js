import React, { useState } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';

import tw from 'twrnc';
import { selectOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';


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

const EatScreen = () => {
  const [selected, setSelected] = useState(null);

  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();

  const pressHandler = (item, screen) => {
    if (selected) {
      setSelected(item)
      // navigation.navigate(screen)
    }
  }

  return (
    <SafeAreaView>
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
      <View style={tw`flex-row px-4 justify-between`}>
        <View>
          <Text style={tw`font-light`}>Deliver now</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddressDetailsCard")}
            style={tw`flex-row pt-1 items-center`}
          >
            <Text style={tw`pr-2 font-semibold text-center`}>
              {origin?.description}
            </Text>
            <Icon
              name="chevron-down"
              type="entypo"
              size={18}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("DeliveryOptionsCard")}
            style={tw`flex-row pt-1 items-center bg-gray-200 rounded-full p-3 mr-2`}
          >
            <Text style={tw`pr-2 text-center`}>Delivery</Text>
            <Icon
              name="chevron-down"
              type="entypo"
              size={18}
            />
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
});
