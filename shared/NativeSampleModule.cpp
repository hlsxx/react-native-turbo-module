#include "NativeSampleModule.h"
#include <camera/NdkCameraManager.h>

namespace facebook::react {

NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
: NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

void NativeSampleModule::camera(jsi::Runtime& rt) {
  try {
    ACameraManager *cameraManager = ACameraManager_create();
    camera_status_t camera_status = ACAMERA_OK;

    ACameraIdList *cameraIdList = nullptr;
    ACameraDevice *cameraDevice = nullptr;

    camera_status = ACameraManager_getCameraIdList(cameraManager, &cameraIdList);

    if (cameraIdList->numCameras == 0) {
      std::runtime_error("No camera found");
    }

    LOGD("Cameras found: %d", cameraIdList->numCameras);

    if (camera_status != ACAMERA_OK) {
      LOGE("Failed to get camera id list (reason: %d)\n", camera_status);
      std::runtime_error("Failed to open camera");
    }

    const char* cameraId = cameraIdList->cameraIds[0];

    ACameraManager_openCamera(cameraManager, cameraId, nullptr, &cameraDevice);

    // Prepare camera view
    ACameraCaptureSession* captureSession = nullptr;
    ACaptureSessionOutputContainer* outputContainer = nullptr;
    ACaptureRequest* captureRequest = nullptr;

    ACaptureSessionOutputContainer_create(&outputContainer);
    ACameraDevice_createCaptureRequest(cameraDevice, TEMPLATE_PREVIEW, &captureRequest);

    ACameraOutputTarget* outputTarget = nullptr;
    ACameraOutputTarget_create(nativeWindow, &outputTarget);
    ACaptureRequest_addTarget(captureRequest, outputTarget);

    ACameraDevice_createCaptureSession(cameraDevice, outputContainer, nullptr, &captureSession);

    // Start a repeating capture request
    ACameraCaptureSession_setRepeatingRequest(captureSession, nullptr, 1, &captureRequest, nullptr);

    // rt.global().setProperty(rt, "cameraStatus", jsi::String::createFromUtf8(rt, "Camera opened successfully"));
    //
    // LOGD("Camera released");

    ACameraDevice_close(cameraDevice);
    ACameraManager_delete(cameraManager);
  } catch (const std::exception &e) {
    rt.global().setProperty(rt, "cameraStatus", jsi::String::createFromUtf8(rt, e.what()));
  }
}

}
