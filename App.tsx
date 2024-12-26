import { Component, ReactNode } from "react"
import { Button, View } from "react-native"

import NativeSampleModule from "./specs/NativeSampleModule"
import Permission, { PermissionStatusEnum } from "./services/permission";

const reverseString = () => {
  const reversedString = NativeSampleModule.reverseString("Hello");
  console.log(reversedString);
}

const camera = async () => {
  const cameraPermission = await Permission.requestPermission('CAMERA');
  console.log(cameraPermission === PermissionStatusEnum.Granted);
  NativeSampleModule.camera()
}

export default class App extends Component {
  render(): ReactNode {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button
          title="Press"
          onPress={() => camera()}
        />
      </View>
    )
  }
}
