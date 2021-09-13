import ActionSheet from "react-native-actions-sheet";
import React, { createRef, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import * as firebase from "firebase";
import { IconButton } from "react-native-paper";
import ShopScreen from "../../Shop/ShopScreen";
import ShopForm from "../../Shop/ShopForm";

const actionSheetRef = createRef();
const accountActionSheet = createRef();
const wishActionSheet = createRef();
const shopActionSheet = createRef();

const Basket = () => {
  const {
    currentUser: { uid },
  } = firebase.auth();

  const [shopExist, setShopExist] = useState(false);
  const [shop, setShop] = useState({});

  useEffect(() => {
    const shop = firebase
      .firestore()
      .collection("shop")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setShopExist(true);
          setShop(doc.data());
        }
      });
  }, []);

  return (
    <View
      style={{
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 36,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            actionSheetRef.current?.setModalVisible();
          }}
        >
          <IconButton icon="shopping" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            wishActionSheet.current?.setModalVisible();
          }}
        >
          <IconButton icon="star" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            wishActionSheet.current?.setModalVisible();
          }}
        >
          <IconButton icon="magnify" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            shopActionSheet.current?.setModalVisible();
          }}
        >
          <IconButton icon="store" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            accountActionSheet.current?.setModalVisible();
          }}
        >
          <IconButton icon="account" />
        </TouchableOpacity>
      </View>

      <ActionSheet ref={wishActionSheet}>
        <View style={{ height: 100, padding: 18 }}>
          <Text>Wish List</Text>
        </View>
      </ActionSheet>

      <ActionSheet ref={shopActionSheet}>
        <View>
          {shopExist ? (
            <ShopForm
              close={() => shopActionSheet.current?.setModalVisible(false)}
              shop={shop}
            />
          ) : (
            <ShopScreen
              close={() => shopActionSheet.current?.setModalVisible(false)}
            />
          )}
        </View>
      </ActionSheet>

      <ActionSheet ref={accountActionSheet}>
        <View style={{ height: 100, padding: 18 }}>
          <Text style={{ marginBottom: 36 }}>Account</Text>
          <Button
            onPress={() => firebase().auth().signOut()}
            style={{ marginTop: 36 }}
            title="Logout"
            uppercase={false}
          />
        </View>
      </ActionSheet>

      <ActionSheet ref={actionSheetRef}>
        <View style={{ height: 100, padding: 18 }}>
          <Text>Basket</Text>
        </View>
      </ActionSheet>
    </View>
  );
};

export default Basket;
