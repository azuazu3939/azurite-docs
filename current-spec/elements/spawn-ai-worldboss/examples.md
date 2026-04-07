# スポーン制御・ワールドボス・Mythic AI の編集例

spawn 条件と Drive 設定をまず見ると把握しやすいです。

## サンプル
```yml
conditions:
  profiles:
    neutral_surface:
      eligibility:
        - type: player_distance
          min: 18.0
          max: 42.0

enabled: false
serverId: server-a
applyMode: SEMI_AUTO
```

## 押さえる点
- eligibility と placement を分けて考える。
- AI 同期は local 運用を見てから有効化する。
- boss / territory / spawn を一緒に見る。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
