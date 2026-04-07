# 仮想ロア・売値表示・カスタムエンチャント の編集例

表示変更は lore service、効果変更は enchant YAML を触るのが基本です。

## サンプル
```yml
id: archers_strike
display-name: "<yellow>射手の一撃"
max-level: 4
unlock:
  required-unlock-ids:
    - "gathering.meta.enchant.advanced"
supported-materials:
  - BOW
```

## 押さえる点
- 旧 Item Level / Gear Score 行は自動除去されるが、新しい仮想ロア見出しを足した時は strip 対象も確認する。
- 仮想ロアは実アイテムを書き換えない。
- 新エンチャントは既存 YAML 複製が安全。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
