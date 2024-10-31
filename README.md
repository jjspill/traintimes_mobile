# How to use

From what I can remember right now, everything with "map" in the name is related to the map page... so dumb, i built it quick and now i need to merge the fetching into a context provider and then when the user scrolls down itll load more... more on this

Map View, async train component is impt. A list of stations is stored on the app (just json from somewhere online) and then it maps those lat longs to their location and then takes that station to fetch more data from the backend.

Id look at the hooks, see where they take you and go from there. Lots of the components are lame and kinda basic. I can walk you through the backend but check out the other repos, it shares a backend with traintimes mobile so look at that one.

... more on this (from above), when I built the backend on Neon, check it out, it didn't have read replicas. They just gave out read replicas on free tier (so hype) so I need to update the backend to use that. Right now it does all the future five? stops per train in one table in the backend. Ideally it does them all and we have a bunch of tables. I have a version to do it by line family right now but it might need to be smaller than that. Definitely starting to limit performance. 

A lambda runs the backend every one minute which takes like 30 seconds and updates both tables (read backend docs) and then the frontend calcualtes the arrival time off the current time for the last minute essentially, but now we could do it much more often. Lots to do...

Also need to add station search but that should be easy, with a service.. google maps api or better

Also haven't really tried getting it out of expo into xcode, but its kinda f'd up right now so need to fix. Once thats done add widgets baby, that would be the best feature...



1. `npm install`
2. `npm run`
3. `hit i for ios and a for android` (do ios)



## Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
