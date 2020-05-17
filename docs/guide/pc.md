# PC端开发模板

## 目录结构
```sh
├── assets                # 打包图片资源
├── build                 # zoom-sdk 编译产生的依赖包
├── lib                   # zoom-sdk 依赖包
├── mac-tool              # mac端打包需要的脚本文件
│   └──preinstall         # 脚本文件--实现重装清缓存、卸载干净旧的包
├── node_modules          # npm本地依赖包
├── OutUmeet              # 打包输出应用包
├── renderViews           # 渲染进程视图，由vueProject编译输出
├── sdk                   # zoom-sdk 依赖包
│   ├── mac               # mac平台依赖的sdk
│   └── win32             # windows平台依赖的sdk
├── vueProject            # 渲染进程项目
│   ├── node_modules      # npm本地依赖包
│   ├── public            # 该目录下的静态资源会被复制到输出目录（dist）中，不经过 webpack处理
│   ├── src               # 与后端交互使用相关方法，接口定义
│   │   ├── api           # 与后端交互使用相关方法，接口定义
│   │   ├── assets        # 放置一些静态资源，例如图片，图标，字体等
│   │   ├── components    # 公共组件  
│   │   ├── lang          # 国际化多语言定义 
│   │   ├── router        # vue-router相关配置 https://router.vuejs.org/zh/guide/
│   │   ├── store         # vuex 相关配置 https://vuex.vuejs.org/zh/
│   │   ├── styles        # 公共样式定义
│   │   ├── theme         # 主题定义
│   │   ├── utils         # 工具类定义，详细请阅读“工具类”部分介绍
│   │   ├── views         # 所有的路由组件，业务功能开发
│   │   ├── App.vue       # 路由组件的顶层路由
│   │   └── main.js       # vue入口文件
│   ├── tests             # 测试
│   ├── package.json      # 配置 
│   ├── .browserslistrc   # 指定项目的目标浏览器的范围，查看“配置项
│   ├── .env              # 环境变量配置，详细请阅读“环境变量和模式”部分介绍
│   ├── .gitignore        # 配置不提交到git仓库的文件
│   ├── babel.config.js   # es6兼容es5
│   ├── postcss.config.js # 配置rem转换，查看“配置项 - postcss.config.js”了解https://www.npmjs.com/package/postcss-px2rem
│    └── vue.config.js    # 配置文件，详细请阅读“配置项-vue.config.js”部分
├── win-tool              # 目录下是windows端打包需要的vc_redist.x86.exe,安装客户端时需要敬慕安装，静默安装的流程在umeet-inno-setup.iss文件里面，直接编译该文件即可。
├── .gitignore            # 配置不提交到git仓库的文件
├── AppWindow.js          # 通用窗口
├── binding.gyp           # zoom-sdk 配置文件
├── build_nodeaddon_mac.sh # zoom-sdk mac端build脚本
├── build_nodeaddon_win_ia32.bat # zoom-sdk windows端build脚本
├── config.js             # 整个项目的全局配置，在main.js主进程中使用
├── main.js               # 整个项目的主进程,有且只能有一个入口
├── menuTenplate.js       # mac端上下文菜单配置
├── package.json          # 配置
├── package_script.sh     # mac-针对定制项目的快速切换脚本，较少手动修改文件的漏操作，导致定制项目打包出错
├── package_script.bat    # win-针对定制项目的快速切换脚本，较少手动修改文件的漏操作，导致定制项目打包出错
├── SignZoomSDK.sh        # mac-签名依赖包文件脚本

```
## 基础模块

### Electron
使用前请确保您有`Electron`基础, 点此前往[`Electron官网`](http://www.electronjs.org/)学习
#### 主进程
项目中 main.js 是整个Electron项目的主进程。
Electron 运行 package.json 的 main 脚本的进程被称为主进程。 在主进程中运行的脚本通过创建web页面来展示用户界面。 一个 Electron 应用总是有且只有一个主进程。

由于 Electron 使用了 Chromium 来展示 web 页面，所以 Chromium 的多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它的叫渲染进程的进程中。

在普通的浏览器中，web页面通常在沙盒环境中运行，并且无法访问操作系统的原生资源。 然而 Electron 的用户在 Node.js 的 API 支持下可以在页面中和操作系统进行一些底层交互。

#### 渲染进程
项目中vueProject编译输出renderViews是整个Electron项目的渲染进程视图，里面的页面给主进程createBrowserWindow时作为视图资源使用。
主进程使用 BrowserWindow 实例创建页面。 每个 BrowserWindow 实例都在自己的渲染进程里运行页面。 当一个 BrowserWindow 实例被销毁后，相应的渲染进程也会被终止。

主进程管理所有的web页面和它们对应的渲染进程。 每个渲染进程都是独立的，它只关心它所运行的 web 页面。

在页面中调用与 GUI 相关的原生 API 是不被允许的，因为在 web 页面里操作原生的 GUI 资源是非常危险的，而且容易造成资源泄露。 如果你想在 web 页面里使用 GUI 操作，其对应的渲染进程必须与主进程进行通讯，请求主进程进行相关的 GUI 操作。

题外话：进程间通讯
Electron为主进程（ main process）和渲染器进程（renderer processes）通信提供了多种实现方式，如可以使用ipcRenderer 和 ipcMain模块发送消息，使用 remote模块进行RPC方式通信。
#### 主进程与渲染进程通讯
1、主进程给渲染进程发消息
``` js
// main.js 主进程
indexWindow.webContents.send('language', store.get('language'));


// App.vue 渲染进程接收消息
  const ipcRenderer = window.require('electron').ipcRenderer
  // 平台语言language
  ipcRenderer.on('language', (event, value) =>{
    that.$changeLang(value)
  })
```
2、渲染进程给主进程发送消息
``` js
// AppHeader.vue 渲染进程接收消息

const ipcRenderer = window.require('electron').ipcRenderer
that.language = window.navigator.language.includes('zh') ? 'zh' : 'en';
ipcRenderer.send('windows-language', {language: that.language, isChange: true});

// main.js 主进程  监听接收

// ASSECPT:接收渲染进程消息--系统语言
ipcMain.on('windows-language', (e, data) => {
  logEverywhere('切换语言：', data);
  locallanguage = data.language;
  store.set('language', locallanguage)
  if (!isSDKAuth) {
    // 根据浏览器语言，设置默认语言后，初始化sdk
    initSDK();
  }
})
```

### Zoom-sdk-electron
#### 集成
1、下载zoom-sdk-electron,把下面文件复制到electron项目根目录下。
```sh
├── lib                   # zoom-sdk 依赖包
├── sdk                   # zoom-sdk 依赖包
│   ├── mac               # mac平台依赖的sdk
│   └── win32             # windows平台依赖的sdk
├── binding.gyp           # zoom-sdk 配置文件
├── build_nodeaddon_mac.sh # zoom-sdk mac端build脚本
├── build_nodeaddon_win_ia32.bat # zoom-sdk windows端build脚本
```
2、编译集成到Electron项目中
``` sh
// mac
$ sh build_nodeon_mac.sh # 执行完后会生成 build文件
// windows端
$ build_nodeaddon_win_ia32.bat  # 执行完后会生成 build文件
```
3、api的调用请参考zoom-sdk-electron/demo/main.js集成到Electron项目中

#### 国际化
main.js中
``` js
  setDomain: function(domain, enable_log) {
    const opts = {
      path: '', // win require absolute path, mac require ''
      domain: domain,
      enable_log: enable_log,
      locale: locallanguage.indexOf('zh') !== -1 ?
        ZoomAPPLocale.ZNSDK_APP_Locale_CN :
        ZoomAPPLocale.ZNSDK_APP_Locale_Default,
      // langid: ZoomSDK_LANGUAGE_ID.LANGUAGE_English
      langid: locallanguage.indexOf('zh') !== -1 ?
        ZoomSDK_LANGUAGE_ID.LANGUAGE_Chinese_Simplified :
        ZoomSDK_LANGUAGE_ID.LANGUAGE_English
    }
    ...
  },
```
如果渲染进程切换语言，sdk需要重新初始化，走setdomain这个api才会起效，因此Electron程序需要重启。

#### 自定义LOGO
1、windows端更换所有的'ZOOM‘
目录文件：lib/node_add_on/win/wrap/sdk_wrap.cpp
添加代码22行（sdkerr上面添加）initParam.strBrandingName=L"Umeet"--->对应名称

2、mac端更换所有的'ZOOM‘
找到语言文件sdk/mac/Resources
-----en.loproj/Localizable.strings
-----zh.loproj/Localizable.strings
的所有"="等号右边包含zoom/Umeet字符更换成--->对应名称
#### 自定义图标
windows视频会议中左上角的图标自定义：
把icon.ico、node_res.rc文件复制到lib/node_add_on目录下。
录下，node_res.rc的代码修改如下
``` js
// node_res.rc详细内容如下：
#include"resource.h"
IDI_SDK_ICONICON"icon.ico"
IDI_SDK_BIG_ICONICON"icon.ico"
```
mac没有这种配置。

### Vue-project
开发详情参考：[WEB端](/guide/web)

## 功能

### 缓存机制
Electron使用electron-store实现数据的缓存。清除缓存使用node.js的 fs 以及shell实现缓存的读取和清除功能
``` js
const app_data = app.getPath('userData') // 缓存的存放地址
const fs = require('fs');  // nodejs 模块 文件文本操作等等 io

// ASSECPT:接收渲染进程消息---清缓存
ipcMain.on('clearCache', e => {
  let cachepath = app_data + '/Cache'
  logEverywhere('缓存目录：', cachepath);
  let clearTotal = 0;
  let dir = fs.readdir(cachepath, (err, file) => {
    for (v in file) {
      let filePath = path.join(cachepath, file[v])
      let rmnum = shell.moveItemToTrash(filePath)
      clearTotal++;
    }
    // SEND:通知渲染进程---渲染进程清除缓存结果
    if (clearTotal === file.length) {
      indexWindow.webContents.send('clearCacheStatus', 'successss')
    }
  })
})
```
### webview通讯
Browserwindow中使用webview需要先配置允许使用
``` js
const indexWindowConfig = {
    ...
    webPreferences: {
      nodeIntegration: true, // 开启使用nodejs的配置
      webviewTag: true // electron version >5后默认禁用<webview>标签需手动开启或者使用browserview代替
    }
  }
```
渲染进程中
``` html
 <webview
     v-show="!loading"
     id="umeetWebView"
     autosize="on"
     class="web-view"
     nodeintegration>
 </webview>
```
``` js
 // init webview 创建webview
    initWebView () {
      let that = this;
      let webview = document.getElementById('umeetWebView');
      let webviewParent = document.getElementById('webview-container');
      let srcUrl = that.webViewSrcUrl();
      ...
       webview.addEventListener('dom-ready', () => {
        ...
        // 向webview注入js
        webview.executeJavaScript(
          ` window.Qbian = require('electron');
            console.log('--executeJavaScript export Object --> ', window.Qbian);
          `
       );
       ...
       // 接收webview传来的消息
      webview.addEventListener('ipc-message', (event) => {
        //! 消息属性叫channel，有些奇怪，但就是这样
        console.log('接收webview的消息', event.channel, event.args[0])
        switch (event.channel) {
          case 'joinMeeting':
          case 'startMeeting': {
            const joinOrStartUrl = event.args[0];
            if (window.require) {
              const ipcRenderer = window.require("electron").ipcRenderer;
              ipcRenderer.send('callVideoSdkByUrl', joinOrStartUrl)
            }
            break;
          }
          case 'openBrowser': {
            let openUrl = event.args[0];
            const params = event.args[1];
            if (window.require) {
              const ipcRenderer = window.require("electron").ipcRenderer;
              if (params) {
                openUrl = openUrl + `?avatar=${params.avatar}&nickname=${params.nickname}&openid=${params.openid}`
              }
              ipcRenderer.send('openBrowser', openUrl);
            }
            break;
          }
          case 'exit': {
            that.goback();
            break;
          }
        }
      })
    }
```

webview的url资源项目中引入jsbridge-pc.js
``` js
/*
* 客户端 JSSDK
* 实现与Electron客户端之间的通讯
* */
const JsBridge = {
  // 加入会议
  // @params(joinurl): umeetapp://join?meetingId=&displayName=&password=&meetingNumber=&isVideoOff=&isAudioOff&userId=
  joinMeeting: (joinUrl) => {
    if (window.Qbian) {
      const ipcRenderer = window.Qbian.ipcRenderer;
      ipcRenderer.sendToHost('joinMeeting', joinUrl);
    }
  },
  // 开始会议
  // @params(starturl):umeetapp://start?meetingId=&displayName=&meetingNumber=&hostId=&hostToken=&isVideoOff=&isAudioOff=&userId=
  startMeeting: (startUrl) => {
    if (window.Qbian) {
      const ipcRenderer = window.Qbian.ipcRenderer;
      ipcRenderer.sendToHost('startMeeting', startUrl);
    }
  },
  // 退出程序
  exit: () => {
    if (window.Qbian) {
      const ipcRenderer = window.Qbian.ipcRenderer;
      ipcRenderer.sendToHost('exit');
    }
  },
  // 唤起浏览器
  openBrowser: (url, params) => {
    if (window.Qbian) {
      const ipcRenderer = window.Qbian.ipcRenderer;
      ipcRenderer.sendToHost('openBrowser', url, params);
    }
  }
};
export { JsBridge }
```

调用 JSBridge.joinMeeting(prams)

## 发布
### windows端
1、使用electron-builder编译生成exe应用包
``` sh
$ npm run build:win #输出OutUmeet
```
2、使用inno-setup打包成安装程序包，用于客户分发。执行 win-tool/Umeet.iss脚本，点此前往[`inno-setup官网`](https://jrsoftware.org/isinfo.php)学习
``` sh
; 脚本由 Inno Setup 脚本向导 生成！
; 有关创建 Inno Setup 脚本文件的详细资料请查阅帮助文档！

#define MyAppName "Umeet"
#define MyAppSortName "Umeet"
#define MyAppVersion "3.1.0-beta1"
#define MyAppPublisher "SYSTEC TECHNOLOGY CO.,LTD"
#define MyAppURL "http://umeet.systec.com.cn"
#define MyAppExeName "Umeet.exe"
#define SchemeName "umeetapp"
#define AppId "{9B19E29F-2157-4667-AFEF-39BDBA2F163B}"

[Setup]
; 注: AppId的值为单独标识该应用程序。
; 不要为其他安装程序使用相同的AppId值。
; (若要生成新的 GUID，可在菜单中点击 "工具|生成 GUID"。)
AppId={{#AppId}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
;DisableProgramGroupPage=yes
; 以下行取消注释，以在非管理安装模式下运行（仅为当前用户安装）。
;PrivilegesRequired=lowest
OutputDir=D:\umeet-setup
OutputBaseFilename=Umeet-v{#MyAppVersion}-setup
SetupIconFile=D:\project\Umeet\umeet-pc\assets\icon.ico
;Uninstallable=yes
;UninstallDisplayIcon={app}\icon.ico
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "chinesesimp"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags:  checkablealone;
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 0,6.1

[Files]
Source: "D:\project\Umeet\umeet-pc\OutUmeet\win-ia32-unpacked\Umeet.exe"; DestDir: "{app}"; Flags: ignoreversion;
;需要静默安装的vc_redist.x86.exe文件
Source: "D:\project\Umeet\umeet-pc\win-tool\vc_redist.x86.exe"; DestDir: "{app}"; Flags: ignoreversion; AfterInstall: CustormInstallVC
Source: "D:\project\Umeet\umeet-pc\OutUmeet\win-ia32-unpacked\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
; 注意: 不要在任何共享系统文件上使用“Flags: ignoreversion”
Source: "D:\project\Umeet\umeet-pc\assets\icon.ico"; DestDir: "{app}"

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon
;开始菜单中添加卸载入口
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}";IconFilename: "{app}\icon.ico"

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent;
;Filename: {app}\vc\vc_redist.x86.exe; Flags: skipifdoesntexist runhidden  // 没有更多判断的静默安装方式

[Registry]
// 添加scheme唤起客户端的注册表信息
Root: HKCR; SubKey: "{#SchemeName}"; ValueData: "{#MyAppName}"; ValueType: string; Flags: CreateValueIfDoesntExist UninsDeleteKey;
Root: HKCR; SubKey: "{#SchemeName}"; ValueName: "URL Protocol"; Flags: CreateValueIfDoesntExist; ValueType: string;
Root: HKCR; SubKey: "{#SchemeName}\DefaultIcon"; ValueData: "{app}\{#MyAppExeName}"; Flags: CreateValueIfDoesntExist; ValueType: string;
; {app}\{#MyAppExeName} ""--params=%1"" 后面的表示唤起客户端并且传递url参数 %1表示任意变量
Root: HKCR; SubKey: "{#SchemeName}\shell\open\command"; ValueData: "{app}\{#MyAppExeName} ""--params=%1"""; Flags: CreateValueIfDoesntExist; ValueType: string;
// 向注册表中添加 安装后的路径
Root:HKLM;Subkey:"SOFTWARE\{#MyAppName}";Flags:uninsdeletekeyifempty
Root:HKLM;Subkey:"SOFTWARE\{#MyAppName}";ValueType:string;ValueName:"InstallPath";ValueData:"{app}";Flags:uninsdeletekey

[Code]
//静默安装vc_regedit_x86.exe （electron以及zoom-sdk需要的依赖）
procedure CustormInstallVC();
var
 ResultCode: Integer;
begin
 // 判断是否安装了vc_regedit_x86.exe
    if not RegValueExists(HKEY_LOCAL_MACHINE, 'SOFTWARE\WOW6432Node\Microsoft\VisualStudio\14.0\VC\Runtimes\x86', 'Version') then
      begin
         // 静默安装
         //MsgBox('没有安装vc', mbInformation, MB_OK);
         Exec(ExpandConstant(CurrentFileName), '/verysilent /norestart /q', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
      end;
end;

// 判断程序是否运行中
function IsAppRunning(const FileName, strExeName : string): Boolean;
var
    IsRunning: Integer;
   ErrorCode: Integer;
   strCmdKill: String;  // 终止软件命令
   appWnd: HWND;   //进程ID
begin
    Result :=true; //安装程序继续
    IsRunning:=FindWindowByWindowName(FileName);
    strCmdKill := Format('/c taskkill /f /t /im %s', [strExeName]);
    while IsRunning<>0 do
    begin
       if Msgbox('{#MyAppName} 正在运行,是否要强制退出程序？', mbConfirmation, MB_YESNO) = idNO then
       begin
       // 点击 否  --- 安装程序退出
        Result :=false;
        IsRunning :=0;
      end else begin
        // 点击 是--终止程序
        ShellExec('open', ExpandConstant('{cmd}'), strCmdKill, '', SW_HIDE, ewNoWait, ErrorCode);
          //给进程发送关闭消息
        //PostMessage(appWnd, 18, 0, 0);       // quit
        Result :=true; //安装程序继续
        IsRunning :=0;
      end;
     end;
end;

// 安装前---先删除旧的包
const MySetupMutex = 'My Program {#AppId}';
function InitializeSetup(): boolean;
var
  ResultStr: String;
  ResultCode: Integer;
begin
    Result := not CheckForMutexes(MySetupMutex);
    if Result then
    begin
        CreateMutex(MySetupMutex);
         Result := IsAppRunning('{#MyAppName}', '{#MyAppExeName}');
         if Result then
         begin
           // 根据注册表中是否存在卸载信息作为依据，是否已经安装了
           if RegKeyExists(HKEY_LOCAL_MACHINE, 'SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\{#AppId}_is1') then
              begin
              if RegQueryStringValue(HKEY_LOCAL_MACHINE, 'SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\{#AppId}_is1', 'UninstallString', ResultStr) then
                begin
                  // 安装前先删除旧的包
                  ResultStr := RemoveQuotes(ResultStr);
                  Exec(ResultStr, '/verysilent /norestart /q', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
                  RegDeleteKeyIncludingSubkeys(HKCR, '{#SchemeName}');
                end;
                result := true;
            end;
              result := true;
        end;
         Exit;
  end else begin
    //MsgBox('您正在安装程序，不能重复操作...',mbError,MB_OK);
    Exit;
  end;
end;

// 安装时 --- 修改卸载的名称（因为默认是unins000）
procedure CurStepChanged(CurStep: TSetupStep);
var
uninspath, uninsname, NewUninsName: String;
begin
  if CurStep=ssDone then
    begin
      // 指定新的卸载文件名（不包含扩展名），请相应修改！
      NewUninsName:='卸载{#MyAppName}';
      // 以下重命名卸载文件
      uninspath:= ExtractFilePath(ExpandConstant('{uninstallexe}'));
      uninsname:= Copy(ExtractFileName(ExpandConstant('{uninstallexe}')),1,8);
      RenameFile(uninspath + uninsname + '.exe', uninspath + NewUninsName + '.exe');
      RenameFile(uninspath + uninsname + '.dat', uninspath + NewUninsName + '.dat');
      // 修改注册表 卸载信息
      RegWriteStringValue(HKEY_LOCAL_MACHINE, 'SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\{#AppId}_is1', 'UninstallString', '"' + uninspath + NewUninsName + '.exe"');
      RegWriteStringValue(HKEY_LOCAL_MACHINE, 'SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\{#AppId}_is1', 'QuietUninstallString', '"' + uninspath + NewUninsName + '.exe" /silent');
      end;
end;

// 卸载时---- 关闭软件
function InitializeUninstall(): Boolean;
begin
  Result := IsAppRunning('{#MyAppName}', '{#MyAppExeName}');
end;

// 卸载时 ---- 删除注册表信息
procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
begin
if CurUninstallStep = usUninstall then
 DelTree(ExpandConstant('{app}'), True, True, True);
 DelTree(ExpandConstant('{userappdata}\{#MyAppName}'), True, True, True);    // 删除缓存文件
 DelTree(ExpandConstant('{userappdata}\{#MyAppSortName}'), True, True, True);    // 删除缓存文件
 RegDeleteKeyIncludingSubkeys(HKCR, '{#SchemeName}');
end;
```
执行完后会生成setup.exe安装程序包，客户端可自定义安装目录等。

### mac端
1、使用electron-builder 编译生成Umeet.app程序包
``` sh
$ npm run build:mac #输出OutUmeet
```
2、使用package工具把Umeet.app打包成pkg安装程序包，并添加脚本文件，实现覆盖安装以及清除缓存功能。
脚本文件在mac-tool/preinstall
``` sh
#!/usr/bin/env bash
 
echo "Running HEDU.app preinstall script."
echo "Killing HEDU.app."
killall "HEDU"
 
echo "Finding old versions of HEDU."
mdfind -onlyin /Applications "kMDItemCFBundleIdentifier=='cn.com.systec.umeet.hsedugroup'" | xargs -I % rm -rf %
 
rm -rf  ~/Library/Application\ Support/HEDU/

echo "Removed old versions of HEDU.app, if any."
echo "Ran HEDU.app preinstall script."

# 以下是曾用名，如果当前应用没有曾用名，则不要重复以下代码
echo "Running AImeet.app preinstall script."
echo "Killing AImeet.app."
killall "AImeet"
 
echo "Finding old versions of AImeet."
mdfind -onlyin /Applications "kMDItemCFBundleIdentifier=='cn.com.systec.umeet.hsedugroup'" | xargs -I % rm -rf %
 
rm -rf  ~/Library/Application\ Support/AImeet/

echo "Removed old versions of AImeet.app, if any."
echo "Ran AImeet.app preinstall script."
 

```

会输出 umeet.pkg
再进行签名等操作后即可分发给客户。
