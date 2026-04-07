# 装備評価・仮想ロア・カスタムエンチャント Wiki

> [!WARNING]
> 表示まわりは軽く見えても、売値、Gear Score、鍛造評価、採集ツール表示まで広く波及します。見た目だけの変更か、意味を変える変更かを最初に分けて考えるのが安全です。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | Item Level、Gear Score、仮想ロア、売値表示、カスタムエンチャント |
| 主設定 | `itemscore.yml`, `config.yml`, `enchants/*.yml` |
| 影響先 | 直売価格、鍛造装備評価、採集ツール表示、戦闘効果 |
| 変更難度 | 中 |

## 概要

この要素は「アイテムをどう見せ、どう評価し、どう強化するか」をまとめるページです。  
仮想ロアはアイテム本体を書き換えずに見せ方を足し、カスタムエンチャントは別 YAML で効果を定義します。

## プレイヤー体験

1. 装備を持つと Item Level や Gear Score が仮想ロアで見える
2. 採集ツールや鍛造品では専用の情報行が追加される
3. エンチャントが付くと trigger と action に応じた追加効果が動く

## 構成の見取り図

| レイヤー | 主な場所 | メモ |
| --- | --- | --- |
| 評価重み | `core/src/main/resources/itemscore.yml` | Item Level 計算の基準 |
| 表示ルール | `core/src/main/resources/config.yml` | 売値や旧ロア除去 prefix など |
| 仮想ロア描画 | Gear Lore Overlay 系 service | 実アイテムを書き換えずに表示を差し込む |
| エンチャント定義 | `core/src/main/resources/enchants/*.yml` | 1 ファイル 1 定義で trigger / action を持つ |

## 編集フロー

1. 表示だけを変えたいのか、意味を変えたいのかを分ける
2. `itemscore.yml` を触るなら価格や鍛造評価への波及を見る
3. エンチャント追加では素材制限、最大レベル、cooldown を先に決める

## よく触る変更パターン

### Item Level の見え方を変えたい

- `itemscore.yml` と `config.yml` の表示系を確認する
- 旧ロア除去 prefix を更新しないと二重表示になりやすい

### 新しいカスタムエンチャントを足したい

- 既存の `enchants/*.yml` を複製して 1 定義 1 ファイルで作る
- supported material と trigger を先に固める
- 効果だけでなく lore 側の見え方も確認する

## 連動する要素

- [鍛造](../forge/wiki.md)  
  品質帯や装備価値の評価が Gear Score に波及します。
- [経済・コマース](../economy-commerce/wiki.md)  
  売値表示や直売体感に影響します。
- [レシピ・ストレージ・採集コレクション](../recipe-gathering/wiki.md)  
  採集ツール表示や専用アイテムの情報行と重なります。

## FAQ

### 仮想ロアは実アイテムを書き換えるのか

基本は書き換えません。見せ方を合成しているため、表示だけ直したい変更とデータを書き換える変更は分けて考えられます。

### なぜ旧ロア除去 prefix が必要なのか

表示更新前のロアが残ると、新旧の Item Level や Gear Score が二重に見えるためです。

### 先に見るべきのは `itemscore.yml` か `enchants` か

装備評価を変えたいなら `itemscore.yml`、効果を足したいなら `enchants/*.yml` が入口です。

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki執筆ガイド](../../wiki-editing-guide.md)
