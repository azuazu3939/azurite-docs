# 仮想ロア・売値表示・カスタムエンチャント

仮想ロアによる補助表示、売値表示、独自エンチャント、バニラ制御をまとめる要素です。

## 現行仕様
- `ItemLoreOverlayService` が採集ツール、鍛造、売却価値の各行を仮想ロアとして合成します。
- 旧 Item Level / Gear Score 表示は廃止され、互換のため旧接頭辞だけ除去対象として残しています。
- カスタムエンチャントは `enchants/*.yml` の 1 ファイル 1 定義で、trigger と action を持ちます。

## 主なファイル
- `core/src/main/kotlin/.../view/ItemLoreOverlayService.kt`
- `core/src/main/resources/config.yml`
- `core/src/main/resources/enchants/archers_strike.yml`

## 更新メモ
- 仮想ロアの見出しを増やした時は旧表示との二重化がないか確認する。
- 売値表示の条件変更は economy 側の直売導線にも効く。
- エンチャントは素材制限と cooldown を先に決める。

## 関連
- [編集例](./examples.md)
- [Wiki](./wiki.md)
