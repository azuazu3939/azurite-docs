# Azuriter docs 公開手順

この docs は、`docs/` をそのまま静的サイトとして置けるように作ってあります。  
ローカル確認、GitHub Pages、別 public repo への切り出しの 3 方式を取りやすい構成です。

## いまの入口

- サイト入口: `docs/index.html`
- 要素別 Markdown: `docs/current-spec/`
- ローカル起動: `pwsh -File docs/localweb/serve.ps1`
- 別 repo への書き出し: `pwsh -File tools/export-docs-site.ps1 -Destination ..\Azuriter-wiki`

## 推奨運用

もっとも運用しやすいのは、次の 2 repo 構成です。

1. private repo
   `Azuriter` 本体のコードと内部向け資料を保持する
2. public repo
   `Azuriter-wiki` のような docs 専用 repo を用意する

この分離にしておくと、private 側の実装を守りながら、外部公開は docs だけに限定できます。

## 方式 A: この repo から直接 GitHub Pages を使う

GitHub 公式ドキュメントでは、GitHub Pages は public repository なら GitHub Free で利用でき、private repository は GitHub Pro / Team などで利用可能です。  
また、project site は branch / folder を publishing source に設定できます。

- 公式: [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- 公式: [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

この repo で直接出す場合の流れは次です。

1. GitHub の repository settings を開く
2. Pages の source を `main` ブランチの `/docs` に設定する
3. `docs/index.html` を入口として公開する

ただし、private repo のまま「誰でも読める URL」にしたい場合は、アカウント条件や運用上の切り分けを先に確認したほうが安全です。

## 方式 B: docs 専用の public repo を別に作る

こちらが推奨です。  
公開対象を docs のみに絞れるので、コード本体の秘匿性と wiki の可視性を両立できます。

### 手順

1. `Azuriter-wiki` のような public repository を作る
2. ローカルでその repo を clone する
3. この repo から docs を書き出す  
   `pwsh -File tools/export-docs-site.ps1 -Destination ..\Azuriter-wiki`
4. public repo 側で GitHub Pages を有効化する
5. URL を README や案内文から参照する

### 書き出されるもの

- `index.html`
- `assets/`
- `current-spec/`
- `.nojekyll`
- `PUBLISHING.md`
- `README.md`

## Pages 用のポイント

- この docs サイトは相対パスで動くので、`/docs` 配信でも別 repo 直下でもそのまま動きます。
- `.nojekyll` を置いているため、静的ファイルを素直に配信できます。
- ルーティングは hash 方式なので、静的ホスティングでも 404 回避の追加設定が要りません。

## 迷ったときの結論

「誰でも見られる wiki を安定運用したい」なら、`Azuriter` と `Azuriter-wiki` を分ける構成をおすすめします。
