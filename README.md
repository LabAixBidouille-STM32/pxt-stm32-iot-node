# MakeCode target for STM32 Discovery IoT Node 
[![Community Discord](https://img.shields.io/discord/448979533891371018.svg)](https://aka.ms/makecodecommunity)

This is an experimental code editor for STM32L475 DISCOVERY IOT NODE boards - try it at https://makecode.st.com.

- CI build: https://ci2.dot.net/job/Private/job/pxt_project_gold/job/master/
- Test location: https://9eae6845-f5a0-40fb-908f-ed0da288590c.pxt.io

## How is this for?

This editor is meant for code on STM32L475 DISCOVERY IOT NODE. The editor is based on [Microsoft MakeCode](https://makecode.com).

## Local Dev setup

These instructions assume familiarity with dev tools and languages.

- install Node.js 6+
- (optional) install [Visual Studio Code](https://code.visualstudio.com/)

In a common folder,

- clone https://github.com/Microsoft/pxt to ``pxt`` folder
- clone https://github.com/Microsoft/pxt-common-packages to ``pxt-common-packages`` folder
- clone https://github.com/Microsoft/pxt-stm32-iot-node to ``pxt-stm32-iot-node`` folder
- go to ``pxt`` and run

```sh
npm install
jake
```

- go to ``pxt-common-packages`` and run

```sh
npm install
npm link ../pxt
```

- go to ``pxt-stm32-iot-node`` and run

```sh
npm install
npm link ../pxt
npm link ../pxt-common-packages
```

## to run the local server

From root github folder,

```sh
cd pxt-stm32-iot-node
pxt serve
```

If you are editing C++, install [docker.com] and make sure your drive is shared.

```sh
pxt serve --localbuild
```

## to build and deploy a single package via command line

```sh
cd libs/core
pxt deploy
```

## Updating CODAL dependency

- Update the tag number in ``pxtarget.json`` at https://github.com/Microsoft/pxt-stm32-iot-node/blob/master/pxtarget.json#L203 
- clean the build

```sh
pxt clean
```

- build again

```sh
pxt buildtarget
```

## Releasing the editor

The version served under ``/`` is controlled by ``/docs/index-ref.json``. Change the version in that file and push to immediately update the version.

Each time you bump (using ``pxt bump``) and the build passes, the ``/beta`` will point to that release. ``/beta`` can be used to test new features before pushing down the release to all users. The update is handled automatically by MakeCode afterwards.

Be careful when updating the version number of the editor, as MakeCode follows ``semver``. In particular, do not change the major version unless you are releasing a completely new and incompatible editor.

- run ``pxt udpdate`` to pick any updates to the PXT engine
- run ``pxt bump`` to create a new release (say ``vX.Y.Z``)
- wait for build to finish, typically 10 minutes
- test new build in ``/beta``. You can check the version number in the bottom of the home screen is ``vX.Y.Z``. Remember that it will update the background and load after a dozen of seconds or so.
- when ready and tested, run ``pxt tag index vX.Y.Z``, and commit ``/docs/index-ref.json`` if successfull. This command does some routine checks to make sure everything is ok.

## License

MIT

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit [https://cla.microsoft.com](https://cla.microsoft.com).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
