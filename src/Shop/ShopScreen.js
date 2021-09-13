import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Platform, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Caption,
  Button,
  TextInput,
  Title,
  IconButton,
} from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

const createShopSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(40, "Too Long!")
    .required("Required"),
  tagline: Yup.string()
    .min(5, "Too short!")
    .max(40, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(10, "Too short!")
    .max(100, "Too Long!")
    .required("Required"),
  location: Yup.string()
    .min(3, "Too short!")
    .max(10, "Too Long!")
    .required("Required"),
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default function ShopScreen({ close }) {
  const [image, setImage] = useState(null);
  const [logoError, setLogoError] = useState(false);

  const submitHandler = (value) => {
    const {
      currentUser: { uid },
    } = firebase.auth();
    if (image) {
      firebase
        .firestore()
        .collection("shop")
        .doc(uid)
        .set({ ...value, image: image, uid: uid });
      close();
    } else {
      setLogoError(true);
    }
  };

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
  return (
    <ScrollView style={{ padding: 18, paddingBottom: 36 }}>
      <View style={{ alignItems: "center" }}>
        <IconButton size={36} icon="store" />
      </View>
      <Title style={{ textAlign: "center" }}>Become a seller</Title>
      <Caption style={{ textAlign: "center" }}>
        Fill the form to get started
      </Caption>
      <Formik
        initialValues={{
          name: "",
          tagline: "",
          description: "",
          location: "",
          phone: "",
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
                label="Shop name"
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
                onChangeText={handleChange("tagline")}
                value={values.tagline}
                label="Tagline"
                onBlur={handleBlur("tagline")}
                style={styles.textInput}
              />
              {errors.tagline && touched.tagline ? (
                <View style={{ marginTop: 3 }}>
                  <Text style={{ color: "red" }}>{errors.tagline}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                numberOfLines={3}
                onChangeText={handleChange("description")}
                value={values.description}
                label="Description"
                onBlur={handleBlur("description")}
                style={styles.textInput}
              />
              {errors.description && touched.description ? (
                <View style={{ marginTop: 3 }}>
                  <Text style={{ color: "red" }}>{errors.description}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                onBlur={handleBlur("location")}
                onChangeText={handleChange("location")}
                value={values.location}
                label="Location"
                style={styles.textInput}
              />
              {errors.location && touched.location ? (
                <View style={{ marginTop: 3 }}>
                  <Text style={{ color: "red" }}>{errors.location}</Text>
                </View>
              ) : null}
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                onChangeText={handleChange("phone")}
                value={values.phone}
                onBlur={handleBlur("phone")}
                label="Contact phone"
                style={styles.textInput}
              />
              {errors.phone && touched.phone ? (
                <View style={{ marginTop: 3 }}>
                  <Text style={{ color: "red" }}>{errors.phone}</Text>
                </View>
              ) : null}
            </View>
            <View style={{ marginVertical: 18 }}>
              <Button onPress={pickImage} uppercase={false}>
                Select a cover image
              </Button>
              <View style={{ alignItems: "center" }}>
                <Image
                  style={{ height: 48, width: 48 }}
                  source={{ uri: image }}
                />
              </View>

              {logoError ? (
                <View style={{ marginTop: 3 }}>
                  <Text style={{ color: "red", alignItems: "center" }}>
                    A cover image is required
                  </Text>
                </View>
              ) : null}
            </View>
            <Button onPress={handleSubmit}>Submit</Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {},
  textInputContainer: {
    marginVertical: 6,
  },
  root: {
    paddingBottom: 36,
  },
});
