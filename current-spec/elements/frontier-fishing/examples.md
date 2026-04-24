# 釣り戦闘・旧遠征残務 の編集例

## 魚を追加する

```yaml
species:
  example_sunfish:
    display-name: "Example Sunfish"
    rarity: common
    spawn-weight: 1.0
    pond-archetypes: [ "meadow_pond" ]
    time-buckets: [ "day" ]
    required-fishing-level: 1
    reward-mmid: "Azuriter_Fishing_Fish_ExampleSunfish"
    display-mmid: "Azuriter_Fishing_Fish_ExampleSunfish"
    icon-material: COD
    health: 14
    swim-speed: 0.75
    hit-radius: 0.8
    alert-radius: 4.0
    water-player-penalty-radius: 3.0
    despawn-lifetime-seconds: 18
    weakness-tags: [ "pond" ]
    resistance-tags: []
    reward-exp: 10
    cooldown-refund-millis: 200
```

## 注意

- 旧遠征契約は追加しない。
- `quests/frontier/frontier.yml` と `packet-quest-boards.yml` は現行 runtime では使わない。
- 釣り報酬を増やす時は、MythicItem と経済側の表示名・売却候補も合わせて確認する。
