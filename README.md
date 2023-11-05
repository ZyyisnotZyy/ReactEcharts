### 一、 项目技术栈

1. ### 前端：React18 + React hooks + React-router-dom + Reac-Redux 状态管理库 + Antd Design + Echarts

2. ### 后端：Axios + Express + Mysql 数据库 + Sequelize + JsonWebToken 

### 二、项目亮点

1. ### 使用 React-Redux 对用户信息进行状态管理

2. ### 使用 React-router-dom 路由管理

3. ### 封装 Axios， 对后端 api 进行集中统一管理

4. ### 利用 Echarts 实时展示当地空气温度，空气质量等级等

5. ### 使用 UseState 对 Echats 进行随时增，删，改

6. ### 使用 Sequelize 对数据库进行查询

7. ### 使用 JsonWebToken 对用户密码信息进行 token 处理

7. ### Node Express 对用户权限处理，判断用户 token 是否存在等条件

### 三、项目运行

1. ```shell
   npm init
   ```

2. ```shell
   npm run start
   ```

### 四、项目部分运行截图

1. ### 登录

   ![登录](https://picst.sunbangyan.cn/2023/11/05/71e3dd982c3f993adc7e9f16b4e9887a.png)

2. ### 注册

   ![注册](https://picss.sunbangyan.cn/2023/11/05/398950c8fec476e62ccd371ba79870c0.png)

3. 每日天气预报

   ![每日天气预报](https://picst.sunbangyan.cn/2023/11/05/95918e93813bf4ea9c910b51982c2e2d.png)

4. 实时编辑 Echarts 图表

   ![实时编辑Echats图表](https://picst.sunbangyan.cn/2023/11/05/008e9a7f4d1183d83a33b80114904439.png)

5. 空气质量预报

   ![空气质量预报](https://picdl.sunbangyan.cn/2023/11/05/3fdf734f4cedf81be0391cafa966df2c.png)

### 五、项目依赖包

1. ### 前端依赖

1. ``` shell 
   npx create-react-app my-app 
   ```

2. ```shell
   npm install react-redux
   npm install @reduxjs/toolkit
   ```

3. ```shell
   npm install react-router-dom
   ```

4. ```shell
   npm install axios
   ```

5. ```shell
   npm install antd --save
   npm install @ant-design/icons --save
   ```

7. ```shell
   npm install echarts
   ```

8. ```shell
   npm install normalize.css --save
   ```

9. react 项目配置路径别名

   ```shell
   npm i @craco/craco -D
   
   在根路径创建文件craco.config.js,和package.json同级
   
   const path = require("path");
   module.exports = {
     webpack: {
       alias: {
         "@": path.resolve(__dirname, "./src"),
       },
     },
   };
   
   修改package.json文件
   "scripts": {
     //"start": "react-scripts start", // 删除
     //"build": "react-scripts build",// 删除
     //"test": "react-scripts test",// 删除
     "start": "craco start", // 添加
      "build": "craco build"// 添加
      "test": "craco test"// 添加
   }
   ```

1. ### 后端依赖

1. ```shell
   npm init
   ```

2. ```shell
   npm install express
   ```

3. ```shell
   npm install --save sequelize 
   ```

4. ```shell
   npm install --save mysql2
   ```

5. ```shell
   npm install jsonwebtoken
   ```

   
