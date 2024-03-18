# Vite + React + TypeScript + TailwindCSS 五子棋游戏

这个仓库包含了使用 Vite、React、TypeScript 和 TailwindCSS 构建的五子棋游戏。游戏规则简单：两名玩家轮流在棋盘上放置自己的棋子，第一个在横线、竖线或斜线上形成连续五个棋子的玩家获胜。

## 特性

- 使用 Vite 快速构建和热重载
- 使用 React 作为 UI 框架，通过组件化提高代码的可维护性
- 使用 TypeScript 增加类型安全和更好的开发体验
- 使用 TailwindCSS 进行快速样式开发
- 支持两名玩家在同一设备上轮流对战

## 快速开始

确保你已经安装了 [Node.js](https://nodejs.org/)（推荐使用最新稳定版本）。

1. 克隆仓库：

```bash
git git@github.com:qqqys163/gomoku.git
cd gomoku
```

2. 安装依赖

```bash
npm install
# 或者
yarn
```

3. 启动服务器

运行开发服务器，并在浏览器中打开 http://localhost:9999 查看项目

```bash
npm run dev
# 或者
yarn dev
```