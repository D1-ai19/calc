计算器 —— 使用与分享说明
================================

这是一个「可安装网页应用（PWA）」，包含定价计算 + 离线缓存，能像 App 一样装到手机主屏。

文件清单
--------
  index.html            主页面（界面与渲染逻辑）
  rules.js              计算规则配置（以后增改规则只动这个文件）
  manifest.webmanifest  应用信息（名称/图标/启动方式）
  sw.js                 离线缓存
  icon-192.png / icon-512.png / apple-touch-icon.png   图标

一、自己本机用
--------------
  直接双击 index.html 即可，用浏览器打开就能算。
  （此方式只是普通网页，不能“装到主屏”，离线能力也只在线上才生效。）

二、发给别人 + 装成手机 App（需要先发布到网上）
----------------------------------------------
  PWA 要“装到主屏”，必须通过一个 https 链接打开，不能直接开本地文件。
  推荐用 GitHub Pages（免费、国内基本可访问）：

  1. 注册 GitHub 账号（github.com）。
  2. 新建一个仓库（repository），例如叫 jialin-calc。
  3. 把「计算器」文件夹里的这几个文件上传到仓库根目录。
  4. 仓库 Settings → Pages → Source 选 Deploy from a branch，
     分支选 main / 目录选 /(root) → Save。
  5. 几分钟后得到链接：https://你的用户名.github.io/jialin-calc/
  6. 把链接发给别人；对方手机打开后：
       - Android（Chrome）：右上角菜单 → “安装应用 / 添加到主屏幕”
       - iPhone（Safari）：分享按钮 → “添加到主屏幕”
     之后桌面就有图标，点开全屏、可离线使用。

  其它免费替代：Cloudflare Pages、Vercel、Netlify Drop（部分在国内访问不稳）。
  需要的话我可以帮你把文件传上去并生成链接。

三、以后新增 / 修改计算规则
--------------------------
  规则全部集中在 rules.js，文件顶部有注释说明怎么加。
  加一条规则 = 复制一个 { ... } 对象块，改 name / inputs / outputs / compute 即可。
  改完后联网打开会自动更新（不用清缓存）。

  两种方式：
    A. 把新规则（名称、输入项、计算公式）发给我，我改好发你；
    B. 自己打开 rules.js 照着注释改。

  注意：如果改了 index.html 或 sw.js，最好把 sw.js 顶部 CACHE 版本号 +1，
  避免个别浏览器仍用旧缓存。
