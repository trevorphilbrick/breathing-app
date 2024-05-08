if (__DEV__) {
  require("../ReactotronConfig");
}
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, View } from "react-native";
import Counter from "./components/Counter";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SmallIslandBackgroundCanvas from "./components/SmallIslandBackgroundCanvas";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView>
        <SmallIslandBackgroundCanvas />
        <Counter />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
