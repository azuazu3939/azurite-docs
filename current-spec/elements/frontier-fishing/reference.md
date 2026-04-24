# 釣り戦闘・旧遠征残務 の設定項目

旧遠征は設定入口ごと撤去されています。現行で編集対象になるのは主に `fishing-content.yml` です。`generator/*.yml` は AzuriteCore 側の旧 world / route 参照として残りますが、遠征契約の行き先生成や掲示板抽選には使いません。

## 削除済みの設定

| 旧設定 | 現在 |
| --- | --- |
| `quests/frontier/frontier.yml` | 読み込まない。bundled resource からも撤去。 |
| `packet-quest-boards.yml` | 読み込まない。QuestBoard runtime も撤去。 |
| `frontier-quest-boards.yml` | legacy 保存先。新規運用しない。 |
| `execution.type: frontier` | QuestCatalog では扱わない。 |
| `execution.objective-kind` | 遠征目標種別ごと撤去。 |
| `execution.reward-*` | 旧遠征契約報酬としては使わない。 |

## `fishing-content.yml` の共通設定とロッド

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `settings.enabled` | 釣り戦闘全体の ON/OFF。 | 切ると釣り戦闘 runtime は立ち上がらない。 |
| `settings.packet-views-enabled` | packet 表示を使うか。 | 見た目負荷と演出の調整点。 |
| `settings.fixed-step-millis` | シミュレーション刻み。 | 小さいほど滑らかだが重い。 |
| `settings.max-catchup-steps` | 遅延時の追いつき回数上限。 | ラグ時の暴走防止。 |
| `settings.pond-search-distance` | 近傍池検索距離。 | 誤爆を防ぎつつ拾える距離にする。 |
| `settings.pond-idle-cleanup-millis` | 放置池の掃除間隔。 | 池残骸を減らす。 |
| `settings.view-distance` | 釣り演出の表示距離。 | 遠距離表示の重さに注意。 |
| `settings.glow-before-despawn-millis` | 消滅前発光の開始タイミング。 | 取り逃し警告の猶予。 |
| `settings.packet-fish-*-multiplier` | 発光や threat 半径の倍率。 | 視認性を調整する。 |
| `settings.bossbar-expire-millis` | BossBar 消滅までの時間。 | 情報量の残し方。 |
| `settings.default-rod-id` | 既定ロッド ID。 | `rods.[rod-id]` と一致させる。 |
| `pond-archetypes.[pond-id].display-name` | 池 archetype 名。 | basin 側と同名参照する。 |
| `pond-archetypes.[pond-id].active-cap` | 同時出現数上限。 | 混雑度の基本。 |
| `pond-archetypes.[pond-id].respawn-delay-millis` | 再湧き待ち。 | 周回速度の天井。 |
| `rods.[rod-id].match-mmid` | 特定ロッド MMID との紐付け。 | default 以外の専用竿に必要。 |
| `rods.[rod-id].base-damage` | 1 発の基礎ダメージ。 | 撃破時間の基本値。 |
| `rods.[rod-id].sequence-duration/interval/burst-count` | 連射の長さと間隔。 | 手触りそのもの。 |
| `rods.[rod-id].overdrive-*` | オーバードライブ性能。 | 瞬間火力の山を作る。 |
| `rods.[rod-id].affinity-tags[]` | 相性タグ。 | 魚の `weakness-tags` / `resistance-tags` と噛む。 |

## `fishing-content.yml` の魚・レア遭遇定義

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `species.[species-id].display-name` | 魚名。 | UI と報酬アイテム名を揃える。 |
| `species.[species-id].rarity` | レアリティ。 | 出現率や印象に関わる。 |
| `species.[species-id].spawn-weight` | 出現重み。 | archetype 内での比率。 |
| `species.[species-id].pond-archetypes[]` | 出現可能な池。 | basin 側と対応づける。 |
| `species.[species-id].time-buckets[]` | 出現時間帯。 | `day` `dusk` `night` など。 |
| `species.[species-id].required-fishing-level` | 必要釣りレベル。 | profession と接続する。 |
| `species.[species-id].reward-mmid` | 実報酬アイテム。 | 釣果本体。 |
| `species.[species-id].display-mmid` | 表示モデル用アイテム。 | 演出用に分けられる。 |
| `species.[species-id].health/swim-speed/hit-radius` | 戦闘性能。 | 撃破難度に直結する。 |
| `species.[species-id].weakness-tags[]` | 効果的な rod affinity。 | 相性表の攻め側。 |
| `species.[species-id].resistance-tags[]` | 苦手でない rod affinity。 | 相性表の守り側。 |
| `species.[species-id].reward-exp` | 撃破時 exp。 | Fishing 経験値として付与する。 |
| `species.[species-id].salvage[]` | 副産物。 | `mmid` `chance` `min-amount` `max-amount` を持つ。 |
| `species.[species-id].rare-table.*` | レア派生遭遇の重み。 | `treasure` `hazard` `mob` の発生率。 |
| `treasures.[treasure-id]` | 宝箱・財宝定義。 | `display-name` `mmid` `weight` `required-fishing-level` など。 |
| `mob-catches.[mob-catch-id]` | 釣り上げ Mob 定義。 | `mythic-mob-id` を持つ。 |
| `hazards.[hazard-id]` | 危険物定義。 | `damage` や `radius` も持つ。 |

## 旧 generator spec

`AzuriteCore/generator/*.yml` は resourceworld / world helper / 既存データ互換の参照として残します。遠征契約の runtime は使わないため、route を増やしても自動で受注コンテンツは増えません。

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
