# レシピ・ストレージ・採集コレクション の編集例

収集側の実例とレシピ側の概念テンプレを一緒に見ると分かりやすいです。

## サンプル
```yml
collections:
  cobblestone:
    profession: mining
    match:
      type: material
      material: COBBLESTONE
    levels:
      1:
        recipe-unlocks: [ "forge/process/stonebinder_flux" ]
```

## 押さえる点
- profession、match、報酬の 3 点を先に揃える。
- Storage Box は blocked item を先に考える。
- レシピ設計は DB / GUI 前提と割り切る。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
