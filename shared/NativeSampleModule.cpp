#include "NativeSampleModule.h"
#include <camera/NdkCameraManager.h>

namespace facebook::react {
NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
: NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

void NativeSampleModule::camera(jsi::Runtime& rt) {
  ACameraManager *cameraManager = ACameraManager_create();
  camera_status_t camera_status = ACAMERA_OK;
  ACameraIdList *cameraIdList = nullptr;
  ACameraDevice *cameraDevice = nullptr;

  camera_status = ACameraManager_getCameraIdList(cameraManager, &cameraIdList);

  if (camera_status != ACAMERA_OK) {
    LOGE("Failed to get camera id list (reason: %d)\n", camera_status);
    return;
  }

  // camera_status = ACameraManager_openCamera(cameraManager, cameraIdList->cameraIds[0],
  //                                           &deviceStateCallbacks, &cameraDevice);

  // Open the first available camera
  const char* cameraId = cameraIdList->cameraIds[0];

  // LOGD("cameraID " << *cameraId);

  ACameraManager_openCamera(cameraManager, cameraId, nullptr, &cameraDevice);

  // LOGD("Attempting to open the camera...");

  LOGD("Camera released");
}
}
