import React from "react";
import { Pressable, Image, View, Dimensions } from "react-native";
import { Paragraph, IconButton, Caption, Title } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import { productsArray } from "../assets/data/shopArray";
import Order from "../components/Order/Order";
import StateContext from "../assets/data/StateContext";

const { width: viewportWidth } = Dimensions.get("window");

export default class ExploreScreen extends React.Component {
  _renderItem = ({ item, index }) => {
    const { photo_url, shop, customs, title } = item;
    const handlePress = () => {};
    return (
      <Pressable onPress={handlePress}>
        <Image source={{ uri: photo_url }} style={{ aspectRatio: 2 / 3 }} />
        <View
          style={{
            paddingVertical: 9,
            position: "absolute",
            width: viewportWidth / 2,
            bottom: 0,
            paddingLeft: 6,
          }}
        >
          {/* <Paragraph>{item.title}</Paragraph> */}
          {/* <Caption>{name}</Caption> */}
          {/* <Paragraph>
            <Caption>
              {quantity}
              {text}
            </Caption>{" "}
            {prefix}. {amount}
          </Paragraph> */}
          <View style={{ position: "absolute", bottom: -9, right: 0 }}>
            <Order item={item} />
          </View>
          {/* <IconButton
            style={{ position: "absolute", right: 6 }}
            size={20}
            icon="heart-outline"
          /> */}
        </View>
      </Pressable>
    );
  };

  static context = StateContext;

  render() {
    
    const [{ products }] = this.context;
    return (
      <View style={{ flex: 1, paddingTop: 100 }}>
        <Title syle={{ margin: 9 }}>Discover Products</Title>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          loop
          layoutCardOffset={18}
          layout="tinder"
          data={productsArray}
          renderItem={this._renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
        />
        <View style={{ alignItems: "center" }}>
          <IconButton icon="format-list-bulleted-type" />
        </View>
      </View>
    );
  }
}
