import { Component, ReactNode } from "react"
import { Button, View } from "react-native"

import NativeSampleModule from "./specs/NativeSampleModule"

const reverseString = () => {
  const reversedString = NativeSampleModule.reverseString("Hello");
  console.log(reversedString);
}

export default class App extends Component {
  render(): ReactNode {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button
          title="Press"
          onPress={reverseString}
        />
      </View>
    )
  }
}
