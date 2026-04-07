# 装備評価・仮想ロア・カスタムエンチャント

Item Level、売値表示、独自エンチャント、バニラ制御をまとめる要素です。

## 現行仕様
- `itemscore.yml` の重みで Item Level を計算し、`GearLoreOverlayService` が仮想ロアとして差し込みます。
- 仮想ロアには採集ツール、鍛造、売値の各行も合流します。
- カスタムエンチャントは `enchants/*.yml` の 1 ファイル 1 定義で、trigger と action を持ちます。

## 主なファイル
- `core/src/main/resources/itemscore.yml`
- `core/src/main/resources/config.yml`
- `core/src/main/resources/enchants/archers_strike.yml`

## 更新メモ
- Item Level の重み変更は売値や鍛造評価にも効く。
- 旧ロア除去 prefix を忘れると二重表示が起きる。
- エンチャントは素材制限と cooldown を先に決める。

## 関連
- [編集例](./examples.md)
- [Wiki](./wiki.md)
