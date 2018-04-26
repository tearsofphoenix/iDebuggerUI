### iDebuggerUI is the Next Generation Debugger for iOS application development.
iDebugUI is a electron-based application that offers developer ability to debug iOS application in realtime, without halt the running app. It can show 
view hierarchy, file structure, system information, framework dump, log history, terminal, core-data explorer and so on (depends on plugins). In one
word, the full view of the entire iOS app is all in the debugger.

#### iDebuggerUI is in active development. Please follow this repo for contribution guidelines and our development road map.

##
<p align="center">
  <img src="https://raw.githubusercontent.com/tearsofphoenix/iDebuggerUI/master/doc/screenshot.png">
</p>

## How it works?
iDebuggerUI co-works with [iDebugger](https://github.com/tearsofphoenix/iDebugger). When you link the framework iDebugger to your app, it will start
a webserver (using [GCDWebServer](https://github.com/swisspol/GCDWebServer)),
offers apis for iDebuggerUI to query all kind of information of the app & device, iDebuggerUI interact with the app through those apis. All are very simple.

## Contributors
[Isaac Lex](https://github.com/tearsofphoenix)
