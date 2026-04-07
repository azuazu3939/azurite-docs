# レシピ・ストレージ・採集コレクション の編集例

収集側の実例とレシピ側の概念テンプレを一緒に見ると分かりやすいです。

## サンプル
```yml
meta:
  total-point-milestones:
    - required-points: 500
      display-name: "希少採集契約"
      unlock-ids:
        - "gathering.meta.contracts.rare"
        - "gathering.meta.enchant.advanced"

collections:
  cobblestone:
    profession: mining
    profession-exp-per-item: 1
    match:
      type: material
      material: COBBLESTONE
    levels:
      1:
        recipe-unlocks: [ "forge/process/stonebinder_flux" ]

  moonwell_pollen:
    profession: harvesting
    profession-exp-per-item: 3
    match:
      type: mmid
      mmid: Azuriter_Material_MoonwellPollen
```

## 押さえる点
- profession、match、報酬の 3 点を先に揃える。
- 合計採取ポイントの解放は `meta.total-point-milestones` でまとめて管理する。
- Storage Box は blocked item を先に考える。
- レシピ設計は DB / GUI 前提と割り切る。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
