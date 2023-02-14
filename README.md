# blog-front-vue

使用Gin + Vue3 + Element Plus 的前後端分離部落格 Blog 專案。
前端採用 Vue3 + Element Plus框架架設簡約風格部落格架構，支援Markdwon語法展示部落格文章內容，實現文章分類、文章標籤tags、文章目錄等功能。

- **[Blog Server Project](https://github.com/Wei31887/blog-server-golang)**
- **[Admin Front-end Project](https://github.com/Wei31887/blog-admin-vue)**

## Features

- RESTful API 特色
- 使用 Gin 框架，提供 middleware 功能，如 admin用戶認證、日誌、跨域等
- 基於 JWT 認證的 Admin 用戶登入功能
- 基於 GORM 存取資料庫
- TODO: Dockerfile
- TODO: API unit test
- TODO: 系統上線

## 技術

1. [Vue3](https://github.com/gin-gonic/gin) Gin 框架實現 RESTful API 及 middleware 處理
2. [jwt-go](https://github.com/dgrijalva/jwt-go) 實現 JWT 認證
3. [golang-migrate/migrate](https://github.com/golang-migrate/migrate) 實現資料庫遷移
4. [gorm.io/gorm](https://gorm.io) 實現存取資料庫
5. [viper](https://github.com/spf13/viper) 實現 config 初始化
6. [uber-go/zap](https://github.com/uber-go/zap) zap實現日誌log管理

## 環境

需要在local 安装 [go] [gin] [node](http://nodejs.org/) 和 [git](https://git-scm.com/) 

## Local Development

### 目錄創建

```bash
# 新建目錄
mkdir blog_golang_vue
cd blog_golang_vue
```

### Git clone

```bash
# clone server 程式碼
git clone https://github.com/Wei31887/blog-server-golang.git

# clone blog front-end 程式碼
git clone https://github.com/Wei31887/blog-front-vue.git

# clone admin front-end 程式碼
git clone https://github.com/Wei31887/blog-admin-vue.git
```

### 開始運行

#### 初始化運行

```bash
# 進入 blog-server-glang 專案後端 front-end 部分
cd ./blog-front-vue

```

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
