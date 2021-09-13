import React, { Component, useContext, useEffect } from "react";
import { View, Image } from "react-native";
import { Paragraph, Title, Caption, Divider } from "react-native-paper";
import ProductsForm from "./ProductForm";
import * as firebase from "firebase";
import { StateContext } from "../assets/data/StateContext";

const Products = () => {
  const {
    currentUser: { uid },
  } = firebase.auth();
  return <View></View>;
};

export default class ShopForm extends Component {
  render() {
  const { image, phone, name, description, location } = this.props.shop;
    return (
      <View>
        <View style={{ padding: 18 }}>
          <Title> Your shop </Title>
          <Image
            style={{ height: 100, width: 100, borderRadius: 4, marginTop: 20 }}
            source={{ uri: image }}
          />
          <Title style={{ marginVertical: 8 }}>{name}</Title>
          <Paragraph style={{ marginVertical: 8 }}>
            Contact Phone: {phone}
          </Paragraph>
          <Paragraph style={{ marginVertical: 8 }}>
            Location: {location}
          </Paragraph>
          <Paragraph style={{ marginVertical: 8 }}>
            Description: {description}
          </Paragraph>
          {/* <Button style={{ marginVertical: 10, alignSelf: "flex-start" }}>
            Edit Profile
          </Button> */}
          <Divider />
          <Title style={{ marginVertical: 8 }}>Orders 0 /100</Title>
          <Caption>Catalog: 15 Products</Caption>
        </View>
        <View>
          <ProductsForm close={this.props.close} />
        </View>
        <Products />
      </View>
    );
  }
}
