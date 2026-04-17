# 鍛造 の編集例

鍛造は入口設定とアクション定義をまず読むと全体を掴みやすいです。

## サンプル
```yml
enabled: true
access:
  open-on-interact: true
  interact-blocks:
    - "SMITHING_TABLE"

actions:
  measured_swing:
    stage: "HAMMER"
    progress-gain: 15.75
    quality-gain: 2.3

alloys:
  echo_calcite:
    unlock:
      required-profession: "smithing"
      required-profession-level: 5
      required-unlock-ids: [ "feature.forge.utility" ]
```

## 押さえる点
- 機能 ON/OFF と入口ブロックは `forge.yml`。
- 1 手の重さは `forge-actions.yml`。
- 研究や物流まで見てから数値を上げる。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
