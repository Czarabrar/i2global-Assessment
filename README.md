This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

download the node modules by following the command ```npm install```
## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npx react-native start

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

## Step 3: What did i do .

in this react native application  i have implemented the required specification of getting weather based on the device location and the news based on the weather condition. 

i have applied react native linking features to avoid not getting user device location.

in this application the user can have their preferences to have the weather metrics in either celcius or fahrehnheit.

in this application the news can be filtered based on the current weather condition . where i have some reserved words to show up the news for 
eg. if the weather is cool i have a set of reserved words i.e good , win , success, victory kinda words which will result in showing the user the news based on the current weather .

if there are no news articles for the weather condtion means a toast meassage will be shown and it will continue to display all the news articles. user can select news articles based on the following categories. general ( ie. weather based ) , technology, sports and business.

the weather data card has the new lottie animation for the user to have rich animations.

the five day forecast will be shown as five cards which we can see when we scroll the home page weather card for a better viewing expericce.

the weather card animation will change based on the weather condtion . like if its raining the raining animation will be played, and if its hot the sun animation will be there and for cloud and breezy it follows on. 

for weather i have used openweatherapi
for news i have used SauravKanchan/NewsAPI git account.

if the user device cant able to provide the user lat long value, the exception are handled . and a text will be shown that the location not available. 
 
# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
