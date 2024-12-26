import { Alert, Platform } from "react-native";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Linking } from 'react-native';
import { _t } from "./translation";

export type PermissionType = 'CAMERA' | 'ACCESS_COARSE_LOCATION' | 'ACCESS_FINE_LOCATION';

export enum PermissionStatusEnum {
  Granted,
  Denied,
  Blocked,
  Unavailable,
  Limited,
  Unknown
}

export default class Permission {

  private static async _getPermissionPlatformName(
    permissionName: string
  ): Promise<string|null> {
    if (Platform.OS === 'android') {
      switch (permissionName) {
        case "CAMERA": return PERMISSIONS.ANDROID.CAMERA;
        case "ACCESS_COARSE_LOCATION": return PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
        case "ACCESS_FINE_LOCATION": return PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      }
    } else if (Platform.OS === 'ios'){
      switch (permissionName) {
        case "CAMERA": return PERMISSIONS.IOS.CAMERA;
        case "ACCESS_COARSE_LOCATION":
        case "ACCESS_FINE_LOCATION":
          return PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      }
    }

    return null;
  }

  private static _getPermissionShowName(
    permissionName: string
  ): string {
    switch (permissionName) {
      case "CAMERA": return _t("camera");
      case "ACCESS_COARSE_LOCATION":
      case "ACCESS_FINE_LOCATION": return _t("location");
    }

    return permissionName;
  }

  private static _getPermissionStatusEnum(status: string): PermissionStatusEnum {
    switch (status) {
      case RESULTS.GRANTED: return PermissionStatusEnum.Granted;
      case RESULTS.DENIED: return PermissionStatusEnum.Denied;
      case RESULTS.UNAVAILABLE: return PermissionStatusEnum.Unavailable;
      case RESULTS.BLOCKED: return PermissionStatusEnum.Blocked;
      case RESULTS.LIMITED: return PermissionStatusEnum.Limited;
      default: return PermissionStatusEnum.Unknown;
    }
  }

  private static _openAppSettings(): void {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  public static async requestPermission(
    permissionName: PermissionType
  ): Promise<PermissionStatusEnum> {
    const permissionPlatformName = await this._getPermissionPlatformName(permissionName);
    if (permissionPlatformName == null) return PermissionStatusEnum.Unknown;

    //@ts-ignore
    const status = await request(permissionPlatformName);
    const statusEnum = this._getPermissionStatusEnum(status);

    if (statusEnum == PermissionStatusEnum.Blocked) {
      Alert.alert(
        _t("Permission denied"),
        _t("You selected the \"Deny\" option.") + " " + _t("To re-enable") + " "
          + _t(this._getPermissionShowName(permissionName)) + ", " +_t("you must allow it in the device settings."),
        [{ text: _t("Settings"), onPress: () => this._openAppSettings() }]
      );
    }

    return statusEnum;
  }
}
