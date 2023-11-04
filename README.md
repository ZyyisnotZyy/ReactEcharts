### 一、 项目技术栈

1. ### 前端：React18 + React hooks + React-router-dom + Reac-Redux 状态管理库 + Antd Design + Echarts

2. ### 后端：Axios + Express + Mysql 数据库 + Sequelize + jsonwebtoken 

### 二、项目亮点

1. ### 使用 React-Redux 对用户信息进行状态管理

2. ### 使用 React-router-dom 对路由进行判断，用户权限处理

3. ### 封装 axios， 对后端 api 进行集中统一管理

4. ### 利用 Echarts 实时展示当地空气温度，空气质量等级等

5. ### 使用 UseState 对 Echats 进行随时增，删，改

6. ### 使用 Sequelize 对数据库进行查询

7. ### 使用 jsonwebtoken 对用户密码信息进行 token 处理

### 三、项目运行

1. ```shell
   npm init
   ```

2. ```shell
   npm run start
   ```

### 四、项目依赖包

1. ### 前端依赖

1. ``` shell 
   npx create-react-app my-app --template typescript
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

   
