import React from "react";
import { NavBar, NavButton, NavTitle } from "react-native-nav";

export default function App() {
  return (
    <NavBar>
      <NavButton onPress={() => alert("Left pressed")}>
        <NavTitle>Back</NavTitle>
      </NavButton>
      <NavTitle>App</NavTitle>
      <NavButton onPress={() => alert("Right pressed")}>
        <NavTitle>Menu</NavTitle>
      </NavButton>
    </NavBar>
  );
}
