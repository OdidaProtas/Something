import React, { useReducer, useEffect, useState } from "react";
import AuthContext from "./src/components/Context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigation";
import AuthNavigatior from "./src/navigation/AuthNavigation";
import reducer from "./src/assets/data/reducer";
import { initialState } from "./src/assets/data/StateContext";

import * as firebase from "firebase";
import { StateContext } from "./src/assets/data/StateContext";
import { Alert } from "react-native";


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default function App() {
  const [state, setState] = useState(false);
  const [store, manager] = useReducer(reducer, initialState);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setState(true);
      } else {
        setState(false);
      }
    });
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("shop")
      .get()
      .then((querySnapPshot) => {
        const docs = querySnapPshot.docs.map((doc) => doc.data());
        manager({ type: "UPDATE_SHOPS", shops: docs });
      });
    firebase
      .firestore()
      .collection("product")
      .get()
      .then((querySnapPshot) => {
        const docs = querySnapPshot.docs.map((doc) => doc.data());
        manager({ type: "UPDATE_PRODUCTS", products: docs });
      });
  }, []);

  return (
    <StateContext.Provider value={[store, manager]}>
      <>
        {!state ? <AuthNavigatior /> : <AppNavigator />}
      </>
    </StateContext.Provider>
  );
}
