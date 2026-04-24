# 釣り戦闘・旧遠征残務 Wiki

> [!WARNING]
> 旧遠征は撤去済みです。新しい契約、objective-kind、QuestBoard、受注条件、報告報酬は追加しないでください。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | 釣り池 archetype、魚種、ロッド戦闘、旧 route / world 互換参照 |
| 主設定 | `fishing-content.yml`, `AzuriteCore/generator/*.yml` |
| 撤去済み | `quests/frontier/frontier.yml`, `packet-quest-boards.yml`, Expedition / QuestBoard runtime |
| 影響先 | 釣り経験値、MythicItem 報酬、経済表示、既存 world helper |

## 概要

現行では、旧遠征は冒険契約の塊ではありません。
残しているのは、釣り戦闘と、既存 world / route 名を参照するための薄い互換情報です。

## プレイヤー体験

1. 池 archetype に近づく
2. 釣り竿で packet 表示の魚へ攻撃する
3. 魚を倒すと釣果、salvage、経験値、まれに宝 / hazard / mob 釣りが発生する

遠征受注、目的地誘導、帰還報告、旧遠征報酬はありません。

## 構成の見取り図

| レイヤー | 主な場所 | メモ |
| --- | --- | --- |
| 釣り設定 | `core/src/main/resources/fishing-content.yml` | settings、pond-archetypes、rods、species |
| 釣り runtime | `FishingFeatureBootstrap` | 旧遠征 role に依存しない |
| 旧 route 参照 | `FrontierCatalog.routes` / `AzuriteCore/generator/routes` | 互換用。契約は生成しない |
| 旧 world 名 | `frontier_world`, `frontier_world2` | world helper や既存データのために残す |

## 編集フロー

1. 魚・池・ロッドは `fishing-content.yml` から編集する
2. MythicItem 報酬 ID が存在するか確認する
3. 釣り経験値とドロップ体感を profession / economy 側で確認する

## 削除済みのものを戻さない

- `/frontier` `/q` `/questboard` `/yes` `/no`
- `ExpeditionService` の実進行
- `PacketQuestBoardRuntime`
- `quests/frontier/*.yml`
- 旧遠征報酬を economy goal の候補に出す導線

## FAQ

### route を追加すると新しい遠征になるか

なりません。route は互換参照として残るだけです。

### 釣りは旧遠征 role が必要か

不要です。`fishing-content.yml` の `settings.enabled` が有効なら、釣り runtime は通常の core 起動の一部として初期化されます。

### 旧遠征報酬は残るか

残りません。QuestCatalog は旧遠征契約を読まないため、契約報酬候補も作りません。

## 関連

- [要素概要](./summary.md)
- [設定項目](./reference.md)
- [Wiki執筆ガイド](../../wiki-editing-guide.md)
