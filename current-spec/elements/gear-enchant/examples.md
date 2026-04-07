# 装備評価・仮想ロア・カスタムエンチャント の編集例

表示系とエンチャント定義を 1 つずつ見るのが理解しやすいです。

## サンプル
```yml
lore:
  strip-prefixes:
    - "Gear Score:"
    - "Item Level:"
    - "アイテムLv:"

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
- 表示と効果は別物として扱う。
- 仮想ロアは実アイテムを書き換えない。
- 新エンチャントは既存 YAML 複製が安全。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
