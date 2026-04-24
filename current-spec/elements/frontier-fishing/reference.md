# フロンティア・遠征・釣り戦闘 の設定項目

Frontier は「契約内容」「釣り池の中身」「frontier spec」の 3 層で構成されています。1 つだけ変えても体験が揃わないので、対応する YAML をセットで読みます。

> [!TIP]
> 新しい遠征を足す時は `frontier.yml` だけで終えず、必要なら route/profile、報酬に絡む `fishing-content.yml` や campaign 側も合わせて確認すると自然です。

このページでは、可変のキー名を `[quest-id]` や `[species-id]` のように表記します。

## `quests/frontier/frontier.yml` の契約定義

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `config-version` | 契約定義の版番号。 | migrate 判定用。 |
| `quests.[quest-id].id` | 契約 ID。 | ファイル key と揃える。 |
| `quests.[quest-id].label` | 契約表示名。 | 看板や一覧に出る。 |
| `quests.[quest-id].category` | 契約カテゴリ。 | `frontier_contract` などの分類。 |
| `quests.[quest-id].region` | 主な地域タグ。 | route や看板の絞り込みに使う。 |
| `quests.[quest-id].recommended-tier` | 推奨 tier。 | 難度帯の目安。 |
| `quests.[quest-id].recommended-party-size` | 推奨人数。 | 看板文言向けの目安。 |
| `quests.[quest-id].estimated-minutes` | 想定所要時間。 | 周回テンポを示す。 |
| `quests.[quest-id].playstyle-tags[]` | 体験タグ。 | `survey` `gather` のように役割を表す。 |
| `quests.[quest-id].concept` | 契約の狙い。 | デザイン意図の一文。 |
| `quests.[quest-id].player-promise` | プレイヤーが得る約束。 | 触る価値を短く示す。 |
| `quests.[quest-id].what-becomes-possible[]` | 解放後に広がること。 | 次の導線説明用。 |
| `quests.[quest-id].prerequisites.route-tags[]` | 必要 route tag。 | 開放条件。 |
| `quests.[quest-id].prerequisites.required-unlock-ids[]` | 既存 unlock-id ベースの受注条件。 | 初期解放済みの機能 gate や個別 unlock と接続する。 |
| `quests.[quest-id].unlock-refs[]` | campaign / project 等への参照。 | 長期進行との接続キー。 |
| `quests.[quest-id].objectives.[index].*` | 実目標。 | `type` `target` `count` `description` を持つ。 |
| `quests.[quest-id].phases.[index].*` | 契約フェーズ。 | `id` と `summary` を持つ。 |
| `quests.[quest-id].mid-progress-signals[]` | 進行中ヒント。 | 詰まり防止。 |
| `quests.[quest-id].fail-or-boring-risks[]` | 失敗・退屈リスク。 | 設計メモとして useful。 |
| `quests.[quest-id].rewards.immediate.*` | 即時報酬。 | `currency` や `exp`。 |
| `quests.[quest-id].rewards.unlock/permanent/symbolic[]` | 解放・恒久・象徴報酬。 | 文章側の報酬説明。 |
| `quests.[quest-id].world-changes[]` | 世界への反映。 | narrative 用。 |
| `quests.[quest-id].next-content[]` | 次に勧めたい契約 ID。 | 連続導線。 |
| `quests.[quest-id].analytics-tags[]` | 分析タグ。 | 行動ログ集計用。 |

## `frontier.yml` の `execution` セクション

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `execution.type` | 実行系の種別。 | 現状は `frontier`。 |
| `execution.route-id` | 紐づく route ID。 | `generator/routes/*.yml` と一致させる。 |
| `execution.theme-id` | 契約テーマ ID。 | 演出や報酬側の参照に使う。 |
| `execution.objective-kind` | 実行時の目標種別。 | `survey` `gather` など。 |
| `execution.gather-profile-id` | 採集対象プロファイル。 | gather 契約で使う。 |
| `execution.target-tags[]` | 対象地形 / ノード tag。 | 実ワールド上の検索条件。 |
| `execution.target-count` | 必要数。 | Objective の count と揃える。surface 契約の目的地探索は入口から 2000m 以内に収まる想定。 |
| `execution.preview-material` | UI プレビュー用素材。 | 看板や一覧のアイコン。 |
| `execution.reward-boss-item-mmid` | ボス報酬アイテム参照。 | 招待状や特別報酬に使う。 |
| `execution.reward-vault-money` | Vault 通貨報酬。 | 即時報酬の実値。 |
| `execution.reward-delivery-credits` | 納品系クレジット。 | 長期導線に接続する。 |
| `execution.reward-items.[slot].*` | アイテム報酬。 | `material` または `mmid` と `amount`。 |
| `execution.community-points` | community への貢献点。 | campaign / project に効く。 |
| `execution.sign-weight` | 看板再出現や選出重み。 | 高いほど出やすい前提。 |
| `execution.rare` / `execution.hard` | 希少 / 高難度フラグ。 | UI バッジや抽選条件向け。 |

## `fishing-content.yml` の共通設定とロッド

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `settings.enabled` | 釣り戦闘全体の ON/OFF。 | 切ると池は残っても魚戦闘は止まる。 |
| `settings.packet-views-enabled` | packet 表示を使うか。 | 見た目負荷と演出の両立点。 |
| `settings.fixed-step-millis` | シミュレーション刻み。 | 小さいほど滑らかだが重い。 |
| `settings.max-catchup-steps` | 遅延時の追いつき回数上限。 | ラグ時の暴走防止。 |
| `settings.pond-search-distance` | 近傍池検索距離。 | 誤爆を防ぎつつ拾える距離にする。 |
| `settings.pond-idle-cleanup-millis` | 放置池の掃除間隔。 | 池残骸を減らす。 |
| `settings.view-distance` | 釣り演出の表示距離。 | 遠距離表示の重さに注意。 |
| `settings.glow-before-despawn-millis` | 消滅前発光の開始タイミング。 | 取り逃し警告の猶予。 |
| `settings.packet-fish-*-multiplier` | 発光や threat 半径の倍率。 | 釣り UI の視認性調整。 |
| `settings.bossbar-expire-millis` | BossBar 消滅までの時間。 | 情報量の残し方。 |
| `settings.default-rod-id` | 既定ロッド ID。 | `rods.[rod-id]` と一致させる。 |
| `pond-archetypes.[pond-id].display-name` | 池 archetype 名。 | world 側の basin と同名参照する。 |
| `pond-archetypes.[pond-id].active-cap` | 同時出現数上限。 | 混雑度の基本。 |
| `pond-archetypes.[pond-id].respawn-delay-millis` | 再湧き待ち。 | 周回速度の天井。 |
| `rods.[rod-id].match-mmid` | 特定ロッド MMID との紐付け。 | default 以外の専用竿に必要。 |
| `rods.[rod-id].base-damage` | 1 発の基礎ダメージ。 | 撃破時間の基本値。 |
| `rods.[rod-id].sequence-duration/interval/burst-count` | 連射の長さと間隔。 | 手触りそのもの。 |
| `rods.[rod-id].retrigger-lock-millis` | 再入力ロック。 | 連打対策。 |
| `rods.[rod-id].shot-radius/speed/lifetime-millis` | 弾の当たり判定・速度・寿命。 | 命中感に直結。 |
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
| `species.[species-id].required-fishing-level` | 必要釣りレベル。 | progression と接続する。 |
| `species.[species-id].reward-mmid` | 実報酬アイテム。 | 釣果本体。 |
| `species.[species-id].display-mmid` | 表示モデル用アイテム。 | 演出用に分けられる。 |
| `species.[species-id].icon-material` | UI アイコン。 | 一覧や図鑑向け。 |
| `species.[species-id].health/swim-speed/hit-radius` | 戦闘性能。 | 撃破難度に直結する。 |
| `species.[species-id].alert-radius` | プレイヤーや弾への反応距離。 | 魚の逃げやすさ。 |
| `species.[species-id].water-player-penalty-radius` | 水中プレイヤーへのペナルティ範囲。 | 水に飛び込む戦法の抑制。 |
| `species.[species-id].despawn-lifetime-seconds` | 自然消滅まで。 | 長いほど追えるが混雑しやすい。 |
| `species.[species-id].weakness-tags[]` | 効果的な rod affinity。 | 相性表の攻め側。 |
| `species.[species-id].resistance-tags[]` | 苦手でない rod affinity。 | 相性表の守り側。 |
| `species.[species-id].reward-exp` | 撃破時 exp。 | mcMMO 最新 `Fishing` 経験値の 1/10 を、魚の `icon-material` に合わせて設定する。 |
| `species.[species-id].cooldown-refund-millis` | 成功時 cooldown 返却。 | テンポ調整用。 |
| `species.[species-id].salvage[]` | 副産物。 | `mmid` `chance` `min-amount` `max-amount` を持つ。 |
| `species.[species-id].rare-table.*` | レア派生遭遇の重み。 | `treasure` `hazard` `mob` の発生率。 |
| `treasures.[treasure-id]` | 宝箱・財宝定義。 | `display-name` `mmid` `weight` `required-fishing-level` `pond-archetypes` `time-buckets`。 |
| `mob-catches.[mob-catch-id]` | 釣り上げ Mob 定義。 | `mythic-mob-id` を持つ。 |
| `hazards.[hazard-id]` | 危険物定義。 | `damage` や `radius` も持つ。 |

## `nms/src/main/resources/generator/*.yml` の frontier spec

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `generator.yml > frontier-world.worlds[]` | 管理対象の Frontier world 名。 | 遠征、territory、world boss の参照先。 |
| `frontier-world.pool-mode` | 旧 pool 設定。 | custom generator / world pool runtime は撤去済みのため互換保持用。 |
| `frontier-world.chunk-high/low-water` | 旧 swap 指標。 | 互換保持用で runtime では未使用。 |
| `frontier-world.metric-poll-seconds` | 旧監視間隔。 | 互換保持用で runtime では未使用。 |
| `frontier-world.guard-min-tps-1m` | 旧 TPS ガード。 | 互換保持用で runtime では未使用。 |
| `frontier-world.guard-max-memory-pressure` | 旧メモリ圧ガード。 | 互換保持用で runtime では未使用。 |
| `frontier-world.rotation-*` | 旧再生成ローテーション基準。 | 互換保持用で runtime では未使用。 |
| `frontier-world.regen-window-*` | 旧再生成時間窓。 | 互換保持用で runtime では未使用。 |
| `frontier-world.border.*` | Frontier world の探索 / territory の基準範囲。 | route 配置や territory 推定の上限。 |
| `frontier-world.policy.*` | 旧 world policy。 | custom generator runtime 撤去後は未使用。 |
| `frontier-world.policy.runtime.*` | 旧 runtime gamerule。 | custom generator runtime 撤去後は未使用。 |
| `frontier-world.default-profile-id` | 既定 profile。 | route 未指定時の地形基準。 |
| `frontier-world.default-route-id` | 既定 route。 | 初期導線で使う route の既定値。 |
| `samplers.*` | 地形サンプリング補助。 | foundation depth など。 |
| `validation.fail-on-legacy-keys` | 旧 key を拒否するか。 | 古い設定混入を防ぐ。 |
| `biome-distribution.*` | surface biome 分布ノイズ。 | rare biome の出やすさもここ。 |
| `caves.*` | 洞窟生成。 | 空洞の太さや ant nest 接続を決める。 |
| `underground-layers.*` | 地下層の材料帯。 | 鉱脈体験に効く。 |
| `chests.respawn-seconds` | チェスト再出現。 | 探索報酬の周期。 |
| `ores.respawn-seconds` | 鉱石再出現。 | 採掘周回の復活周期。 |
| `mining-entry.*` | 採掘入口探索の設定。 | `entries.*.route-id` がある場合は route の `entry-offsets` を入口候補として使い、未解決時は `x` `z` に fallback する。 |
| `routes/*.yml` | route 定義。 | `id` `label` `profile-id` `family` `domain` `spawn-profile` `entry-offsets` `progression-band` `access-tags` `required-unlock-ids` を持ち、`entry-offsets` は mining-entry や遠征の入口候補に使う。 |
| `profiles/*.yml` | 地形 profile 定義。 | `family` `allowed-domains` `vertical-range` `climate-bias` `flora-modifiers` `route-tags` を持つ。 |

## 2026-04 の Frontier dryland 拡張メモ

- `frontier_surface_mixed` は dryland 側に `surface_desert_dunes` `surface_mesa_terraces` `surface_badlands_spires` を追加し、湿った pocket だけ `surface_oasis_grove` へ遷移する。
- 地上 biome の横方向スケールは `SurfaceTerrainResolver` の倍率を `12.0` にして従来の約 2 倍へ広げる。
- arid 地帯の通常地形には pond / lake を置かず、水場は `surface_oasis_grove` にだけ大型 basin `oasis_lake` を生成する。
- `fishing-content.yml` では `oasis_lake` を追加し、既存の湖系 archetype 群へ接続して魚・宝物・hazard が空にならないようにする。

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
