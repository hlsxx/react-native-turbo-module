#include "NativeSampleModule.h"

namespace facebook::react {
  NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
  : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

  std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
    return std::string(input.rbegin(), input.rend());
  }

  void NativeSampleModule::camera(jsi::Runtime& rt) {
    LOGD("Attempting to open the camera...");

    cv::VideoCapture cap(0, cv::CAP_ANDROID);

    if (!cap.isOpened()) {
      LOGE("Error: Unable to open the camera");
      return;
    }

    LOGD("Camera opened successfully");

    double frameWidth = cap.get(cv::CAP_PROP_FRAME_WIDTH);
    double frameHeight = cap.get(cv::CAP_PROP_FRAME_HEIGHT);
    LOGD("Camera resolution: %.0fx%.0f", frameWidth, frameHeight);

    cap.release();
    LOGD("Camera released");
  }
}
