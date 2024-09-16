<p align="center">
  <a href="https://www.openjianghu.org/" target="blank"><img src="https://raw.githubusercontent.com/jianghujs/jianghu/master/app/public/img/logo.svg" width="200" alt="江湖JS Logo" /></a>
</p>
<h3 align="center">JianghuJS是一个开源的企业级应用框架，易上手，通过简单配置即可完成项目开发。各种江湖应用开箱即用，是灵活、高效、便捷的全栈开发解决方案。到 <a href="https://www.openjianghu.org/" target="_blank">官网</a> 进一步了解</h3>

<p align="center">
  <a href="https://www.npmjs.com/package/@jianghujs/jianghu"><img src="https://img.shields.io/npm/v/@jianghujs/jianghu.svg?style=for-the-badge" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@jianghujs/jianghu"><img src="https://img.shields.io/npm/l/@jianghujs/jianghu.svg?style=for-the-badge" alt="License"></a>
  <a href="https://www.npmjs.com/package/@jianghujs/jianghu"><img src="https://img.shields.io/npm/dt/@jianghujs/jianghu.svg?style=for-the-badge&color=#4fc08d" alt="downloads" /></a>
  <a href="https://www.npmjs.com/package/@jianghujs/jianghu"><img src="https://img.shields.io/npm/dm/@jianghujs/jianghu.svg?style=for-the-badge&color=#4fc08d" alt="downloads" /></a>
</p>



---

## 特性

- ✨ **简化协议** ：JianghuJS 规范了前后端的数据通讯协议，通过简单的配置即可完成前后端开发，开发者只需专注于业务逻辑。
- 🛠 **内置常用功能** ：开箱即用的功能，包括登录、用户管理、页面权限、数据权限、访问日志和操作日志等，极大地减少了开发时间。
- ⚙ **配置驱动开发** ：业务相关配置保存在数据库中，通过简单的数据库配置即可实现业务逻辑的开发和配置。
- 💡 **快速生成工具** ：`jianghu-init` 是 JianghuJS 框架的官方命令行工具，专为简化和加速项目和页面的创建而设计。它可以快速生成项目脚手架和页面模板。
- 🔍 **全源码生成** ：其他框架生成的代码通常会封装起来，但JianghuJS 生成的是全源码。这使得开发者可以直接查看和修改生成的源代码，拥有更高的灵活性和控制权。
- 📦 **企业级模板** ：JianghuJS 提供了一系列专为企业级应用定制的开源和可定制项目模板，如 ERP、CRM、企业官网、聊天和在线学习等。
- 👩‍🏫 **全栈培训课程** ：江湖平台提供从零到一的全栈开发入门培训课程，包括技术文档、模块演示和开源应用，帮助初学者快速掌握企业应用开发。

---

## 快速预览

##### 生成HTML页面源码

```
jianghu-init page --type=1table-page
```

![image-20240916135112615](https://s21.ax1x.com/2024/09/16/pAuTflF.png)

![image-20240916141444461](https://s21.ax1x.com/2024/09/16/pAuThy4.png)

##### 数据库配置页面和接口

```sql
-- 添加页面
INSERT INTO `_page`(`pageId`, `pageName`) VALUES ('studentManagement', '学生管理');
-- 增加简单CRUD接口
INSERT INTO `_resource`(`pageId`, `actionId`, `desc`, `resourceType`, `resourceData`) VALUES ('studentManagement', 'selectItemList', '✅查询列表', 'sql', '{ \"table\": \"student\", \"operation\": \"select\" }');
-- 增加复杂逻辑接口，调用service处理逻辑
INSERT INTO `_resource`(`pageId`, `actionId`, `desc`, `resourceType`, `resourceData`) VALUES ('login', 'passwordLogin', '✅登陆', 'service', '{\"service\": \"user\", \"serviceFunction\": \"passwordLogin\"}');
```


---

## 开始使用
> 👉[JianghuJS：一款面向小白的企业级全栈开发框架之快速入门视频教程](https://www.bilibili.com/video/BV1DwWUeuEdz/)

<p color="red" style="color: red">提示: 在开始使用前，请确保本地已经安装了 [NodeJS](https://nodejs.org/zh-cn) 和 [MySQL5.7](https://downloads.mysql.com/archives/community/) 环境</p>

### 安装

```
npm install -g @jianghujs/jianghu-init@latest
```

### 生成项目

```bash
jianghu-init project --type=basic my-jh-project
```

### 安装并启动项目

```
cd my-jh-project
npm install
npm run dev
```

> 注： `npm i`如果安装失败可以尝试使用[cnpm](https://developer.aliyun.com/mirror/NPM?from=tnpm)，或者切换您的镜像源，推荐使用[pnpm](https://pnpm.io/)

访问显示的地址即可进入项目。

- 默认地址（详见终端输出）： http://127.0.0.1:7205

- 默认账号：admin 

- 默认密码：123456

![image-20240821171903572](https://s21.ax1x.com/2024/08/21/pAi8ryd.png)

> 更多框架文档 内容请移步 [江湖开发平台-文档页](https://www.openjianghu.org/doc/page/article/11101)!

> 面向小白的学习课程请移步 [江湖开发平台-培训页](https://www.openjianghu.org/doc/page/article/10001)!


## 反馈

欢迎在[提交问题](https://github.com/jianghujs/jianghu/issues/new)上反馈。

## 开源协议

本项目采用[Apache-2.0](https://opensource.org/licenses/apache-2-0)开源许可证。