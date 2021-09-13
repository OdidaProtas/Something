import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

const createShopSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(40, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(10, "Too short!")
    .max(100, "Too Long!")
    .required("Required"),
  unit: Yup.string()
    .min(3, "Too short!")
    .max(10, "Too Long!")
    .required("Required"),
  category: Yup.string().required("Required"),
  price: Yup.number().required(),
  discount: Yup.number(),
  unit: Yup.number().required(),
  numOfItems: Yup.number().required("Required"),
  processing: Yup.string().required("Required"),
});

const ProductsForm = ({ close }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [logoError, setLogoError] = useState(false);

  const [options, setOptions] = [];

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setLogoError(false);
    console.log(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submitHandler = (value) => {
    const {
      currentUser: { uid },
    } = firebase.auth();
    if (image) {
      firebase
        .firestore()
        .collection("product")
        .doc(value.name)
        .set({ ...value, image: image, shop: uid });
      close();
    } else {
      setLogoError(true);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View padding={18}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Title style={styles.modalText}>New Product</Title>
            <Formik
              initialValues={{
                name: "",
                description: "",
                processing: "",
                expiry: "",
                price: "",
                unit: "",
                category: "",
                discount: "",
                numOfItems: "",
              }}
              validationSchema={createShopSchema}
              onSubmit={(values) => submitHandler(values)}
            >
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                values,
              }) => (
                <View>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      onChangeText={handleChange("name")}
                      value={values.name}
                      onBlur={handleBlur("name")}
                      label="Item name"
                      style={styles.textInput}
                    />
                    {errors.name && touched.name ? (
                      <View style={{ marginTop: 3 }}>
                        <Text style={{ color: "red" }}>{errors.name}</Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      onChangeText={handleChange("description")}
                      value={values.description}
                      label="Description"
                      onBlur={handleBlur("description")}
                      style={styles.textInput}
                    />
                    {errors.description && touched.description ? (
                      <View style={{ marginTop: 3 }}>
                        <Text style={{ color: "red" }}>
                          {errors.description}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      numberOfLines={3}
                      onChangeText={handleChange("category")}
                      value={values.category}
                      label="Category"
                      onBlur={handleBlur("category")}
                      style={styles.textInput}
                    />
                    {errors.category && touched.category ? (
                      <View style={{ marginTop: 3 }}>
                        <Text style={{ color: "red" }}>{errors.category}</Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      onBlur={handleBlur("price")}
                      onChangeText={handleChange("price")}
                      value={values.price}
                      label="Price in kes."
                      style={styles.textInput}
                    />
                    {errors.price && touched.price ? (
                      <View style={{ marginTop: 3 }}>
                        <Text style={{ color: "red" }}>{errors.price}</Text>
                      </View>
                    ) : null}
                  </View>

                  <View style={styles.textInputContainer}>
                    <TextInput
                      onBlur={handleBlur("numOfItems")}
                      onChangeText={handleChange("numOfItems")}
                      value={values.numOfItems}
                      label="Number of items in stock"
                      style={styles.textInput}
                    />
                    {errors.numOfItems && touched.numOfItems ? (
                      <View style={{ marginTop: 3 }}>
                        <Text style={{ color: "red" }}>
                          {errors.numOfItems}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      onChangeText={handleChange("unit")}
                      value={values.phone}
                      onBlur={handleBlur("unit")}
                      label="Unit ie. 1pc"
                      style={styles.textInput}
                    />
                    {errors.unit && touched.unit ? (
                      <View style={{ marginTop: 3 }}>
                        <Text style={{ color: "red" }}>{errors.unit}</Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      numberOfLines={3}
                      onChangeText={handleChange("processing")}
                      value={values.processing}
                      label="Order processing period"
                      onBlur={handleBlur("processing")}
                      style={styles.textInput}
                    />
                    {errors.processing && touched.processing ? (
                      <View style={{ marginTop: 3 }}>
                        <Text style={{ color: "red" }}>
                          {errors.description}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={{ marginVertical: 6 }}>
                    <Button onPress={pickImage} uppercase={false}>
                      Select an image
                    </Button>
                    <View style={{ alignItems: "center" }}>
                      <Image
                        style={{ height: 48, width: 48 }}
                        source={{ uri: image }}
                      />
                    </View>

                    {logoError ? (
                      <View style={{ marginTop: 3 }}>
                        <Text style={{ color: "red", textAlign: "center" }}>
                          Select atleast one image
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <Button style={{ marginVertical: 9 }} onPress={handleSubmit}>
                    Submit
                  </Button>
                </View>
              )}
            </Formik>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
      <Button
        icon="plus"
        style={{ position: "absolute" }}
        onPress={() => setModalVisible(true)}
      >
        Add Items
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    marginTop: 50,
  },
  textInputContainer: {
    marginVertical: 4,
  },
});

export default ProductsForm;
