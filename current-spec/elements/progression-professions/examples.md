# 成長・クラス・専門職 の編集例

まずは既存クラスと既存 profession を 1 つずつ複製して触ると安全です。

## サンプル
```yml
name: "§e§lナイト"
formula: "100 * level + (level + 2) * (3 * level + 4) * (5 * level + 6)"
max-level: 50

professions:
  smithing:
    milestones:
      "1":
        access-tags: [ "forge.access" ]
        grant-permissions: [ "azurite.command.forge" ]
```

## 押さえる点
- クラス名、式、最大レベル、職能解放の入口をまず見る。
- profession milestone は他要素の解放順に直結する。
- Attribute や speed bonus は小さく試す。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
