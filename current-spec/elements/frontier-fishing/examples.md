# フロンティア・遠征・釣り戦闘 の編集例

契約例と魚種例を並べて読むと把握しやすいです。

## サンプル
```yml
quests:
  plains_crop_forage:
    execution:
      type: "frontier"
      route-id: "forest_surface"
      target-count: 24

species:
  amber_scale_trout:
    pond-archetypes: [ "meadow_pond" ]
    required-fishing-level: 3
```

## 押さえる点
- route、reward、魚種、必要職能を一緒に考える。
- Fishing は Frontier 依存前提。
- 報酬を変えると流通や campaign へ波及する。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
