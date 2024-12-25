This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here
https://reactnative.dev/docs/next/the-new-architecture/pure-cxx-modules

# OpenCV
- Download OpenCV sdk
- Import sdk folder into the android folder
- android/settings.gradle -> add ->  include ':opencv'

# CMakeLists
Add following into CMakeLists

find_package(OpenCV REQUIRED java)
target_link_libraries(appmodules ${OpenCV_LIBRARIES}) # appmodules name of the app cmake

# app/build.gradle
externalNativeBuild {
    cmake {
        cppFlags "-std=c++11 -frtti -fexceptions"
        arguments "-DOpenCV_DIR=" + "<path to downloaded opencv sdk>" + "/sdk/native/jni" // , "-DANDROID_ARM_NEON=TRUE"
    }
}
