import "expo-dev-client";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

import { firebase } from "./config";

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const signInWithFB = async () => {
    try {
      await LoginManager.logInWithPermissions(["public_profile", "email"]);

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) return;
      console.log("data", data);
      const facebookCredential = FacebookAuthProvider.credential(
        data.accessToken
      );

      const auth = getAuth();

      console.log("facebookCredential", facebookCredential);
      const response = await signInWithCredential(auth, facebookCredential);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (initializing) return null;
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 24, marginBottom: 100 }}>
          Sign In With Facebook
        </Text>
        <Button title="Sign in with Facebook" onPress={signInWithFB} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 24, marginBottom: 100 }}>
        Sign In With Facebook
      </Text>
      <View style={{ marginTop: 100, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Welcome !! {user.displayName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
