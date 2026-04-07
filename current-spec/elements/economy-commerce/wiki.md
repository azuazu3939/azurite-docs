# 経済・コマース Wiki

> [!WARNING]
> この要素は code 主導の比重が高く、価格や GUI だけを変えたつもりでも runtime 全体の導線に波及します。概念整理を先にしてから実装側へ降りるのが安全です。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | Vault、共有倉庫、ドロップ倉庫、直売、Market Board、Trade Shop |
| 主設定 | `EconomyRuntime.kt`, `plugin.yml` の commerce 系コマンド定義 |
| 影響先 | 価格体感、素材流通、報酬受取、鍛造品の売買 |
| 変更難度 | 高 |

## 概要

このページは Azuriter の流通と販売導線をまとめます。  
共有倉庫、ドロップ倉庫、直売、マーケット、Trade Shop は別機能に見えますが、runtime 内では受取、ledger、価格体感が強くつながっています。

## プレイヤー体験

1. アイテムを集める
2. 倉庫へ入れる、受け取る、または市場に流す
3. 直売やマーケットで価値が見える
4. Trade Shop や他ループの報酬と合流して経済が回る

## 構成の見取り図

| レイヤー | 主な場所 | メモ |
| --- | --- | --- |
| runtime 本体 | `core/src/main/kotlin/com/github/azuazu3939/azuriter/core/economy/EconomyRuntime.kt` | 主要サービスの束ね役 |
| コマンド入口 | `core/src/main/resources/plugin.yml` | commerce 系コマンド導線 |
| 共有倉庫 | runtime 内の shared storage | ドロップ倉庫とは別コンテナ |
| ドロップ倉庫 | runtime 内の drop storage | 受取処理や ledger は共通化されやすい |
| 販売系 | Direct Sell / Market Board / Trade Shop | 価格の感じ方を作る層 |

## 編集フロー

1. 倉庫導線を触るのか、販売導線を触るのかを分ける
2. 価格変更なら直売だけでなく市場体感も考える
3. 受取や ledger を触るなら shared / drop の両方を見る

## よく触る変更パターン

### 価格の体感を変えたい

- 直売の値だけでなく、Market Board 側の納得感も見る
- 鍛造品や採集品の価値とズレないかを確認する

### 倉庫導線を調整したい

- shared storage と drop storage を分けて考える
- ただし受取処理や ledger は共通の流れとして見る

### 経済 runtime の失敗条件を追いたい

- `EconomyRepository` 初期化まわりを確認する
- ここで失敗すると runtime 自体が立たない前提で考える

## 連動する要素

- [鍛造](../forge/wiki.md)  
  鍛造品の価値と流通先に直結します。
- [レシピ・ストレージ・採集コレクション](../recipe-gathering/wiki.md)  
  素材供給と保管導線が重なります。
- [フロンティア・遠征・釣り戦闘](../frontier-fishing/wiki.md)  
  報酬や持ち帰り導線が経済に流れ込みます。

## FAQ

### 倉庫系は全部同じ仕組みか

同じではありません。shared と drop は別コンテナですが、受取や ledger の流れが近いので、片方だけ直すと不整合が出やすいです。

### 価格変更は直売だけ見ればよいか

十分ではありません。Market Board や Trade Shop での相対価値も含めて見ないと、プレイヤー体感が崩れます。

### まずコードと設定のどちらを見るべきか

この要素は code 主導なので、まず runtime 側で責務を見てから、コマンドや UI 導線を追うのが早いです。

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki執筆ガイド](../../wiki-editing-guide.md)
