<<<<<<< HEAD
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
=======

# React Native Project

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using the React Native CLI.

## Getting Started

### Running the App

The development environment is already set up with all necessary dependencies. You can start developing right away!

#### Android

To run your app on Android:

```bash
npm run android
```

This will:
1. Start the Metro bundler if it's not already running
2. Build the Android app
3. Install and launch it on the Android emulator

#### iOS

To run your app on iOS (requires macOS):

```bash
npm run ios
```

### Development

The Metro bundler will start automatically when you run the app. If you need to start it manually:

```bash
npm start
```

### Testing and Linting

Run tests:
```bash
npm test
```

Run linter:
```bash
npm run lint
```

## Project Structure

```
your-project/
├── android/               # Android native code
├── ios/                  # iOS native code
├── src/                  # JavaScript/TypeScript source code
│   ├── components/       # Reusable components
│   ├── screens/         # Screen components
│   └── App.tsx          # Application entry point
├── __tests__/           # Test files
├── .idx/                # IDX configuration
└── package.json         # Project dependencies and scripts
```

## Useful Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Native CLI](https://github.com/react-native-community/cli)
- [Metro Bundler](https://facebook.github.io/metro/)
- [React Native Testing](https://reactnative.dev/docs/testing-overview)

## Troubleshooting

### Metro Bundler Issues
If you encounter issues with Metro bundler:
1. Clear Metro cache: `npm start --reset-cache`
2. Make sure Watchman is running properly
3. Check the terminal output for specific error messages

### Android Build Issues
If you encounter Android build issues:
1. Check that ANDROID_HOME is properly set
2. Ensure Android SDK tools are properly installed
3. Try cleaning the build: `cd android && ./gradlew clean`

### iOS Build Issues
If you encounter iOS build issues:
1. Make sure you have Xcode installed (macOS only)
2. Try cleaning the build: `cd ios && pod install`
3. Clear derived data in Xcode

## License

This project is open source and available under the MIT License.
>>>>>>> d96ef06 ([BAB 2] KOMPONEN REACT NATIVE DAN TEXT HANDLING)
