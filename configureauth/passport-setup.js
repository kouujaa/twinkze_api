// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20");
// const FacebookStrategy = require("passport-facebook");
// const config = require("config");
// const { Customer } = require("../models/Customer");

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// //deserialize data
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await Customer.findById(id);
//     done(null, user.id);
//   } catch (err) {
//     console.log("from deserializer", err);
//   }
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       callbackURL: "/auth/google/redirect",
//       clientID: config.get("googleClientID"),
//       clientSecret: config.get("googleClientSecret")
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const user = await Customer.findOne({ email: profile._json.email });
//         if (user) {
//           console.log("user is:", user);
//           done(null, user);
//         } else {
//           const saveduser = new Customer({
//             firstName: profile._json.given_name,
//             lastName: profile._json.family_name,
//             userName: profile.displayName,
//             email: profile._json.email,
//             signBy: "google",
//             googleID: profile.id,
//             gender: profile.gender
//           });

//           const user = await saveduser.save();
//           console.log("saved is:", user);
//           done(null, user);
//         }
//       } catch (err) {
//         console.log("from googlestrategy", err);
//       }
//     }
//   )
// );

// // passport.use(
// //   new FacebookStrategy(
// //     {
// //       clientID: "562363711120291",
// //       clientSecret: "6e28356821d7004e543f67abafebffb1",
// //       callbackURL: "/auth/facebook/redirect"
// //     },
// //     async (accessToken, refreshToken, profile, done) => {
// //       try {
// //         const user = await Customer.findOne({ facebookID: profile.id });
// //         if (user) {
// //           console.log("user is:", user);
// //         } else {
// //           console.log(profile);

// //           const saveduser = new Customer({
// //             status: "user",
// //             firstName: profile.name.givenName,
// //             lastName: profile.name.familyName,
// //             userName: profile.displayName,
// //             email: profile.email,
// //             signBy: "facebook",
// //             facebookID: profile.id
// //           });

// //           const gotton = await saveduser.save();
// //           console.log(gotton);
// //         }
// //       } catch (error) {
// //         console.log(error.message);
// //       }
// //     }
// //   )
// // );
