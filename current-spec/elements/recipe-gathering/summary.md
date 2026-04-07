# レシピ・ストレージ・採集コレクション

レシピ登録、Storage Box、採集累積、報酬 unlock をまとめる要素です。

## 現行仕様
- レシピは DB と built-in の混在管理で、`RecipeService` が Bukkit 登録まで担当します。
- Storage Box はクラフト素材供給の補助で、`config.yml` の blocked 設定で危険アイテムを止めます。
- 採集コレクションは `gathering.yml` で category、match、count-sources、levels、報酬を持ちます。

## 主なファイル
- `core/src/main/resources/gathering.yml`
- `core/src/main/resources/config.yml`
- `docs/gathering-collection-architecture.md`

## 更新メモ
- レシピは file だけでなく DB 運用前提で考える。
- count-sources を増やすと水増し確認が必要。
- Gathering の reward ID と recipe ID のズレに注意する。

## 関連
- [編集例](./examples.md)
- [Wiki](./wiki.md)
