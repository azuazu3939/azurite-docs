# レシピ・ストレージ・採集コレクション Wiki

> [!NOTE]
> このページは「クラフト素材をどう貯め、どう使い、どう報酬へ変えるか」をまとめる wiki です。レシピ、Storage Box、採集累積の 3 本柱で見ると整理しやすいです。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | レシピ登録、Storage Box、採集コレクション、reward unlock |
| 主設定 | `gathering.yml`, `config.yml`, built-in recipe と DB recipe |
| 影響先 | クラフト導線、採集 reward、素材供給、profession progress |
| 変更難度 | 中 |

## 概要

この要素は「素材の蓄積と利用」を扱います。  
RecipeService がレシピ登録を担い、Storage Box が素材供給を補助し、Gathering collection が累積数に応じた報酬解放を管理します。

## プレイヤー体験

1. 素材を採集・収集する
2. Storage Box へ預けたりクラフトに流したりする
3. 一定数が集まると collection reward が解放される
4. 新しいレシピや報酬が次の制作導線になる

## 構成の見取り図

| レイヤー | 主な場所 | メモ |
| --- | --- | --- |
| レシピ登録 | `RecipeService` と DB / built-in recipe | file と DB の混在管理 |
| Storage Box 制御 | `core/src/main/resources/config.yml` | blocked 設定で危険アイテムを制限 |
| 採集コレクション | `core/src/main/resources/gathering.yml` | category、match、count-sources、levels、報酬 |
| 設計メモ | `docs/gathering-collection-architecture.md` | 運用や責務の整理に便利 |

## 編集フロー

1. file だけで完結するか、DB 運用まで含むかを決める
2. count-sources を変えるなら水増し経路を確認する
3. reward ID と recipe ID の対応を見て、 unlock 導線が切れないようにする

## よく触る変更パターン

### 採集コレクション報酬を増やしたい

- `gathering.yml` の `levels` と reward 定義を確認する
- 同名 ID が recipe 側とズレていないかを見る

### Storage Box の投入制限を調整したい

- `config.yml` の blocked 系設定を見る
- 想定外アイテムが素材供給へ入らないかを確認する

### レシピの扱いを整理したい

- built-in recipe か DB recipe かを分けて考える
- 運用で追加する前提なら file だけで考えない

## 連動する要素

- [鍛造](../forge/wiki.md)  
  素材供給と unlock 報酬が制作導線へつながります。
- [成長・クラス・専門職](../progression-professions/wiki.md)  
  profession progress と採集 reward が絡みます。
- [経済・コマース](../economy-commerce/wiki.md)  
  素材流通や価値付けに接続します。

## FAQ

### レシピは YAML だけ見ればよいか

いいえ。現行仕様では DB と built-in の混在前提なので、file だけでは全体を見切れないことがあります。

### `count-sources` を増やすと何が起きるか

カウント経路が増えるため、想定より早く reward が解放される可能性があります。水増し確認が必要です。

### Storage Box は単なる倉庫か

単なる保管ではなく、クラフト素材供給の補助として動くので、投入制限や検索導線も重要です。

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki執筆ガイド](../../wiki-editing-guide.md)
