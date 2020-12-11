# Upgrading

Because there are many breaking changes an upgrade is not that easy. There are many edge cases this guide does not cover. We accept PRs to improve this guide.

## From v1 to v2

### Use explicit-restoring for profiles instead of auto-restoring (e5e4b90e)

This change was made to improve performance and bandwidth consumption. There is no reason to pull in information about profiles that you might not even own which should also greatly improve performance because a profile with 100 wallets won't slow down your profile with 5 wallets.

### Encrypt profiles that use a password (e360e2f1)

This change was made to improve privacy. If you are using a profile it will now be encrypted using PBKDF2 and your password. Your profile data won't be accessible until you accessed it and decrypted it with your password. This change also required to store the data differently, which means profiles are now stored ase base64 strings rather than plain JSON. This change was done to streamline the internals for handling encrypted and not-encrypted profiles.

#### Migration

##### Data

Migrating profiles is fairly straightforward. The biggest change is that you need to store the profile data as base64. For this purpose you can use [migrations](https://github.com/ArkEcosystem/platform-sdk/blob/master/packages/platform-sdk-profiles/src/environment/migrator.test.ts) which will allow you to modify the data that is stored before it is accessible to the user. *You will need to temporarily disable the password on all profiles that use one and inform the user about the need of resetting their password. If you do not reset the password you will be unable to restore the profile.*

We recommend to take a look at [this](https://github.com/ArkEcosystem/platform-sdk/blob/master/packages/platform-sdk-profiles/test/fixtures/env-storage.json) and [this](https://github.com/ArkEcosystem/platform-sdk/commit/e360e2f1b5108ac92977eb09e5100c248429b5ab) to get the full picture of the changes that have been made to better understand what changes you need to apply and how they should be applied.

##### Password

To ensure that we can encrypt the password protected profile of a user when they are signed out or the application crashes we need to *temporarily* store the users password after they enter it. You can take a look at [this password helper](https://github.com/ArkEcosystem/platform-sdk/blob/master/packages/platform-sdk-profiles/src/helpers/password.ts) to see how the password needs to be stored. The password should be stored when the user successfully decrypted their profile and be forgotten when the application is closed or they are signed out of their profile on purpose or through a timeout.

> If your application is not yet in production and contains password protected profiles we would recommend to reset them and start fresh with the base64 handling that the Platform SDK takes care of.
