# プロジェクト `minpaku2` フォルダ構成解説

## 🚀 セットアップと実行方法

### 前提条件

- Node.js (v18.x 以上を推奨)
- npm (または yarn, pnpm)

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

プロジェクトのルートに `.env.local` ファイルを作成し、SupabaseのプロジェクトURLとAnonキーを設定します。これらはSupabaseのプロジェクトダッシュボードから取得できます。

```.env.local
VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` (またはターミナルに表示されたアドレス) を開きます。

## 1. プロジェクト概要

このプロジェクトは、モダンなWebフロントエンド技術で構築された、単一ページの民泊（Homestay）紹介サイトです。Viteによる高速な開発環境をベースに、ReactとTypeScriptを用いて構築されています。

**主要な技術スタック:**

*   **ビルドツール**: **Vite** - 高速な開発サーバーと最適化されたビルドを提供します。
*   **フレームワーク**: **React** - UIを構築するためのJavaScriptライブラリです。
*   **言語**: **TypeScript** - JavaScriptに静的な型付けを追加し、開発効率とコードの堅牢性を高めます。
*   **スタイリング**: **Tailwind CSS** - ユーティリティファーストのCSSフレームワークで、迅速なUIデザインを可能にします。
*   **バックエンドサービス (BaaS)**: **Supabase** - `package.json`にライブラリが含まれており、将来的にデータベースや認証機能の追加が想定されます。
*   **アイコン**: **Lucide React** - シンプルで美しいアイコンセットです。
*   **リンター/フォーマッター**: **ESLint** - コードの一貫性を保ち、潜在的なエラーを検出します。

## 2. フォルダ構成

プロジェクトの主要なフォルダ構成です。

```
project/
├── .bolt/                  # Boltテンプレートツールの設定
├── public/                 # 静的アセット（画像など）
│   ├── Z9S_1631-2.png
│   ├── Z9S_1886 1.png
│   ├── Z9S_2140-2 1.png
│   └── Z9S_3334.png
├── src/                    # アプリケーションのソースコード
│   ├── components/         # 再利用可能なReactコンポーネント
│   ├── App.tsx             # アプリケーションのメインコンポーネント
│   ├── main.tsx            # Reactアプリの起動ファイル
│   ├── index.css           # グローバルスタイルシート
│   └── vite-env.d.ts       # Vite環境用のTypeScript型定義
├── .gitignore              # Gitで追跡しないファイルを指定
├── eslint.config.js        # ESLintの設定ファイル
├── index.html              # アプリケーションのエントリーポイントHTML
├── package.json            # 依存パッケージとスクリプトの定義
├── postcss.config.js       # PostCSS（Tailwind CSSが利用）の設定
├── tailwind.config.js      # Tailwind CSSの設定ファイル
├── tsconfig.app.json       # アプリケーションコード用のTypeScript設定
├── tsconfig.json           # TypeScriptプロジェクトのルート設定
├── tsconfig.node.json      # Node.js環境（Vite設定等）用のTypeScript設定
└── vite.config.ts          # Viteの設定ファイル
```

## 3. 主要なファイルとディレクトリの詳細
## 📄 主要なファイルとディレクトリの詳細

### ルートディレクトリ (`project/`)

プロジェクトの根幹をなす設定ファイルが配置されています。

| ファイル名 | 説明 |
| :--- | :--- |
| `vite.config.ts` | **Viteの設定ファイル**。Reactプラグインの有効化やビルドに関する設定を行います。 |
| `package.json` | プロジェクトの依存関係（React, Supabase等）と、`npm run dev`などの実行スクリプトを定義します。 |
| `tailwind.config.js` | **Tailwind CSSの設定ファイル**。カスタムフォント（`Orbitron`など）やカスタムカラー（`neon`）をここで定義しています。 |
| `index.html` | 全ての描画の起点となるHTMLファイル。`<body>`内の`<div id="root"></div>`にReactアプリケーションがマウントされます。 |
| `tsconfig.*.json` | **TypeScriptのコンパイラ設定**。`tsconfig.app.json`は`src`内のアプリコード用、`tsconfig.node.json`は`vite.config.ts`のようなNode.jsで実行されるコード用です。 |
| `eslint.config.js` | **ESLintの設定ファイル**。コードの静的解析ルールを定義し、コード品質を維持します。 |
| `postcss.config.js` | PostCSSの設定ファイル。`tailwindcss`と`autoprefixer`プラグインを有効化しています。 |
| `.gitignore` | `node_modules`や`.env`ファイルなど、Gitのバージョン管理から除外するファイルやディレクトリを指定します。 |

### `src/` ディレクトリ

アプリケーションの主要なソースコードが格納される、開発の中心となるディレクトリです。

| ファイル/ディレクトリ | 説明 |
| :--- | :--- |
| `main.tsx` | **Reactアプリケーションの起動ファイル**です。`ReactDOM.createRoot`を使い、`index.html`の`#root`要素に`App`コンポーネントを描画します。 |
| `App.tsx` | **アプリケーションのルートコンポーネント**。このプロジェクトでは、`Hero`, `Facilities`, `Location`といった各セクションのコンポーネントを呼び出し、ページ全体を構成しています。 |
| `components/` | ボタン、カード、セクションなど、**再利用可能なUI部品**を格納するディレクトリです。`App.tsx`から`Hero.tsx`や`Facilities.tsx`などがここからインポートされていると推測されます。 |
| `App.tsx` | **アプリケーションのルートコンポーネント**。`Hero`, `Facilities`, `Location`といった各セクションのコンポーネントを呼び出し、ページ全体を構成します。 |
| `components/` | ボタン、カード、セクションなど、**再利用可能なUI部品**を格納するディレクトリです。`FloatingReserveButton.tsx`のような機能コンポーネントや、`useIntersectionObserver.ts`のようなカスタムフックもここに配置されています。 |
| `index.css` | **グローバルなCSSファイル**。Google Fontsのインポートや、Tailwind CSSの`@tailwind`ディレクティブが記述されています。 |

### `public/` ディレクトリ

ビルドプロセスを経由せず、そのままWebサーバーのルートに配置される静的ファイルを格納します。このプロジェクトでは、`Facilities.tsx`コンポーネントなどで使用される部屋の画像（`.png`ファイル）が格納されています。
ビルドプロセスを経由せず、そのままWebサーバーのルートに配置される静的ファイルを格納します。このプロジェクトでは、パフォーマンス向上のため最適化された`.webp`形式の画像が格納されています。

### `.bolt/` ディレクトリ

このディレクトリは、`bolt-vite-react-ts`というテンプレートからプロジェクトが生成されたことを示唆しています。BoltというScaffolding（足場）ツールに関連する設定ファイルが含まれています。
