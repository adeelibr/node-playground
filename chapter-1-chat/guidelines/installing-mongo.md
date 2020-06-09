### Official Guide

You can also follow the guide here

- Mac OS [official guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
- Windows [official guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
- Linus [official guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

### Guide for Mac OS

I am on a Mac OS system, so I am writing this guide as well, more for personal information.

#### Tap the MongoDB Homebrew Tap¶

```
brew tap mongodb/brew
```

#### Procedure

Follow these steps to install MongoDB Community Edition using the third-party brew
package manager.

```
brew install mongodb-community@4.2
```

#### Run MongoDB Community Edition

To run MongoDB (i.e. the mongod process) as a macOS service, issue the following:

```
brew services start mongodb-community@4.2
```

To stop a mongod running as a macOS service, use the following command as needed:

```
brew services stop mongodb-community@4.2
```
