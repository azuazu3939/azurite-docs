# 仮想ロア・カスタムエンチャント の設定項目

仮想ロアは `ItemLoreOverlayService` 側、効果は `core/src/main/resources/enchants/*.yml` 側で定義します。  
このページは特に「独自エンチャント YAML をどう書くか」に寄せた実装準拠のリファレンスです。

> [!IMPORTANT]
> `conditions` や `*-expression` は独自 DSL ではなく CEL で評価されます。  
> 「どういうキーが使えるか」は `TriggerContext` と `CelScriptEngine` の実装が基準です。

## 先に押さえる全体像

1. 1 ファイル 1 エンチャントで `enchants/*.yml` を作る
2. `supported-materials` と `active-slots` で「どの装備で有効か」を決める
3. `triggers[]` で「いつ発動するか」を決める
4. `conditions[]` と `chance-expression` で発動条件を絞る
5. `actions[]` で実際の効果を積む

## ルートキー

| キー | 必須 | 内容 | 備考 |
| --- | --- | --- | --- |
| `id` | 必須 | 内部 ID。`CustomEnchantKeys` 登録済みである必要があります。 | ファイル名と揃えるのが安全です。 |
| `enabled` | 任意 | 個別 ON/OFF。 | 省略時 `true`。 |
| `display-name` | 任意 | 表示名。 | 色コードや MiniMessage 風装飾を含められます。 |
| `max-level` | 任意 | 最大レベル。 | 省略時 `1`。最低 `1`。 |
| `weight` | 任意 | 抽選重み。 | 省略時 `10`。 |
| `cost-base` | 任意 | 基礎コスト。 | 省略時 `5`。 |
| `manaril-weight` | 任意 | Manaril 側の重み。 | 省略時 `1`。 |
| `eterila-weight` | 任意 | Eterila 側の重み。 | 省略時 `1`。 |
| `supported-materials[]` | 必須 | 対象装備の Material pattern。 | 空だと読込対象から外れます。 |
| `active-slots[]` | 任意 | 有効スロット。 | 省略時は `supported-materials` から自動推定します。 |
| `conflicts-with[]` | 任意 | 併用不可の独自エンチャント ID。 | `conflicts-with-one` も alias として読まれます。 |
| `conflicts-with-vanilla[]` | 任意 | 併用不可のバニラ enchant 名。 | `conflicts-with-vanilla-one` も alias。 |
| `description[]` | 任意 | GUI / lore 用の説明文。 | 複数行対応。 |
| `unlock.*` | 任意 | 解放条件。 | 詳細は下表。 |
| `tool-families[]` | 任意 | gathering tool の分類タグ。 | 既存 YAML に置かれていますが、現行 parser はルート側を読んでいません。trigger 側の `tool-*` を使ってください。 |
| `triggers[]` | 必須 | 発動定義。 | 1 enchant に複数個持てます。 |

## `unlock` セクション

| キー | 内容 | 省略時 |
| --- | --- | --- |
| `unlock.id` | unlock ID。 | enchant の `id` |
| `unlock.required-unlock-ids[]` | 前提 unlock 一覧。 | 空 |
| `unlock.profession-requirements[]` | profession と必要レベル。 | `enchanting + 推定 primary profession` |
| `unlock.preview-group` | プレビュー分類。 | 推定 primary profession |
| `unlock.visibility-tier` | 可視 tier。 | `teaser` |
| `unlock.route-tags[]` | 導線タグ。 | 空 |
| `unlock.shop-price` | 購入価格。 | 未設定 |

`profession-requirements` の各要素は次の形です。

```yml
unlock:
  profession-requirements:
    - profession: harvesting
      level: 10
```

## `supported-materials` と pattern の書き方

`supported-materials`、`item-types`、`block-types`、`target-block-types` などの Material 系 filter は `PatternMatcher.matchesMaterial` で判定されます。

使える書き方:

| 書き方 | 例 | 意味 |
| --- | --- | --- |
| 完全一致 | `DIAMOND_PICKAXE` | その Material だけ対象 |
| ワイルドカード | `*_SWORD` | 末尾一致 / 部分一致を簡単に書ける |
| `tag:` 指定 | `tag:ores` | Bukkit `Tag<Material>` を参照 |
| 全一致 | `*` | すべて許可 |

> [!TIP]
> `*_PICKAXE` や `*_HELMET` のようなパターンは `active-slots` 自動推定にも使われます。

## `active-slots`

指定できる値:

| 値 | 同義語 |
| --- | --- |
| `hand` | `main_hand`, `mainhand` |
| `off_hand` | `offhand` |
| `head` | `helmet` |
| `chest` | `chestplate` |
| `legs` | `leggings` |
| `feet` | `boots` |

省略時は `supported-materials` から推定され、何も推定できなければ `hand` 扱いです。

## `triggers[]` の共通キー

| キー | 内容 | 省略時 / 補足 |
| --- | --- | --- |
| `event` | 発火イベント名。 | 必須 |
| `chance` | 基本発動率。0.0〜1.0 | 省略時 `1.0` |
| `chance-expression` | CEL で書く発動率式。 | 書いた場合 `chance` より優先 |
| `conditions[]` | CEL 条件式の配列。 | 全件 `true` で通過 |
| `actions[]` | 発動時 action 列。 | 実質必須 |
| `target-entity-type` / `target-entity-types[]` | 対象 Entity filter。 | 戦闘・釣り系で有効 |
| `target-mythic-mob-id` / `target-mythic-mob-ids[]` | MythicMob ID filter。 | `PatternMatcher.matchesText` で判定 |
| `item-type` / `item-types[]` | 発動元 item Material filter。 | `supported-materials` とは別に trigger 単位で絞れます |
| `item-mythic-type` / `item-mythic-types[]` | 発動元 item の Mythic item type。 | Mythic 連携が無い item は空文字 |
| `tool-profile-id` / `tool-profile-ids[]` | gathering tool profile filter。 | managed resource break 系のみ実質有効 |
| `tool-family` / `tool-families[]` | gathering family filter。 | 同上 |
| `tool-personality` / `tool-personalities[]` | personality filter。 | 同上 |
| `tool-location-tag` / `tool-location-tags[]` | location tag filter。 | 同上 |
| `tool-obtainable` / `tool-obtainables[]` | obtainable filter。 | 同上 |
| `tool-enchant-tag` / `tool-enchant-tags[]` | enchant tag filter。 | 同上 |
| `block-type` / `block-types[]` | 発火元 block filter。 | `break_block` / `block_drop` / `place_block` / `interact_block` 系 |
| `biome` / `biomes[]` | biome filter。 | namespace / path / full key で判定可能 |
| `allow-cancelled` | cancel 済み event でも走らせるか。 | 省略時 `false` |
| `allow-zero-effect` | 効果量ゼロ event でも処理するか。 | 省略時 `false` |
| `once-per-event` | 同一 event object で一度だけ通すか。 | 省略時 `true` |
| `cooldown-ticks` | 再発動待ち tick。 | 省略時 `0` |
| `cooldown-scope` | cooldown 共有単位。 | 省略時 `AUTO` |

## `event` に指定できる値

| 値 | 別名 | いつ発火するか |
| --- | --- | --- |
| `attack_entity` | なし | プレイヤーが entity を殴った時 |
| `damaged_by_entity` | なし | プレイヤーが entity からダメージを受けた時 |
| `living_entity_death` | `entity_death` | プレイヤーが kill credit を持つ `EntityDeathEvent` |
| `fall_damage` | なし | 落下ダメージ時 |
| `break_block` | なし | `BlockBreakEvent` |
| `block_drop` | `block_drop_event`, `block_drop_item_event` | `BlockDropItemEvent` |
| `place_block` | なし | `BlockPlaceEvent` |
| `interact_block` | なし | block 右クリック時 |
| `fishing` | なし | `PlayerFishEvent` |
| `passive_tick` | なし | 5 tick ごとの passive scan |
| `mythic_damage` | なし | MythicMobs damage hook |
| `mythic_death` | なし | MythicMobs death hook |

### `cooldown-scope` の意味

| 値 | 共有単位 |
| --- | --- |
| `AUTO` | block があれば block、target があれば target、どちらも無ければ player |
| `PLAYER` | 発動者 player ごと |
| `TARGET` | target entity ごと |
| `SOURCE_BLOCK` | 発火元 block ごと |
| `SOURCE_LOCATION` | 発火元 block 座標ごと |
| `GLOBAL` | enchant 全体で共有 |
| `NONE` | 毎回ユニーク扱いで共有しない |

> [!NOTE]
> `passive_tick` のように source block / target が無い trigger では、`SOURCE_BLOCK` や `TARGET` を書いても実質 player fallback になります。

## `conditions` と `*-expression` の書き方

### 使われる評価器

- `conditions[]`: CEL の真偽値式。すべて `true` で trigger 通過
- `chance-expression`: CEL の数値式。結果を 0.0〜1.0 に丸めて発動率に使う
- `amount-expression`, `radius-expression` など: action ごとの数値式

### まず覚える書き方

```yml
conditions:
  - "target_is_living"
  - "player_health < player_max_health"
chance-expression: "0.08 + (level * 0.04)"
```

よく使う書き方:

- 比較: `player_health < player_max_health`
- 論理積: `target_is_living && !target_is_player`
- 三項演算子: `level >= 2 ? 2 : 1`
- 文字列比較: `fishing_state == 'CAUGHT_FISH'`
- 数値加算: `6 + (level * 4)`

### CEL で安全に使える共通 context

以下は `CelScriptEngine` に登録されている、通常の `conditions` / `*-expression` で安全に参照できるキーです。

#### 基本

| キー | 内容 |
| --- | --- |
| `level` | その enchant の合計レベル。実装上は `totalLevel` が入る |
| `event` | 現在の trigger 名 |
| `integration` | `paper` / `mythicmobs` など |
| `external_event` | 外部 hook 名 |
| `event_cancelled` | 元 event が cancel されているか |
| `random` | 0.0〜1.0 の乱数 |

#### player

| キー | 内容 |
| --- | --- |
| `player_name` | プレイヤー名 |
| `player_health` / `player_max_health` | 体力 |
| `player_food` / `player_saturation` | 空腹 / saturation |
| `player_air` / `player_max_air` | 呼吸ゲージ |
| `player_x` / `player_y` / `player_z` | 座標 |
| `is_sneaking` | sneak 中か |
| `is_underwater` | 水中判定 |
| `can_see_sky` | 空が見えるか |

#### item

| キー | 内容 |
| --- | --- |
| `item_type` | Material 名 |
| `item_mythic_type` | Mythic item type |
| `item_amount` | stack 数 |
| `item_damage` | 現在 damage |
| `item_max_damage` | 最大 durability |

#### world / time / environment

| キー | 内容 |
| --- | --- |
| `world` | world 名 |
| `dimension` | `NORMAL` など |
| `biome` | biome path の大文字 |
| `biome_key` | `minecraft:plains` 形式 |
| `biome_namespace` | `minecraft` など |
| `is_custom_biome` | custom biome か |
| `light_level` | 明るさ |
| `world_time` / `world_full_time` | ワールド時間 |
| `moon_phase` | 0〜7 |
| `weather` | `clear` / `rain` / `thunder` |
| `is_raining` / `is_thundering` | 天候フラグ |
| `server_tps_1m` / `server_tps_5m` / `server_tps_15m` | TPS |
| `now_epoch_second` / `now_epoch_milli` | 現在時刻 |
| `now_year` / `now_month` / `now_day` | 日付 |
| `now_hour` / `now_minute` / `now_second` | 時刻 |
| `now_day_of_week` / `now_day_of_year` | 曜日 / 通算日 |
| `now_date` / `now_time` / `now_datetime` | 文字列化した日時 |
| `math_pi` / `math_e` | 定数 |

#### 戦闘系

| キー | どこで入るか | 内容 |
| --- | --- | --- |
| `damage` | attack / damaged / fall / mythic_damage | 元ダメージ |
| `final_damage` | attack / damaged / fall / mythic_damage | 最終ダメージ |
| `damage_cause` | attack / damaged / fall | `ENTITY_ATTACK` など |
| `target_name` | 戦闘 / fishing / death | 対象名 |
| `target_type` | 戦闘 / fishing / death | EntityType 名 |
| `target_kind` | 戦闘 / fishing / death | `player`, `mythic_mob`, `vanilla_mob`, `entity`, `none` |
| `target_mythic_mob_id` | 戦闘 / fishing / death | MythicMob ID |
| `target_health` / `target_max_health` | living target がある時 | 対象体力 |
| `target_x` / `target_y` / `target_z` | target がある時 | 対象座標 |
| `target_is_player` | target が player か |
| `target_is_living` | target が LivingEntity か |
| `target_is_mythic_mob` | target が MythicMob か |
| `target_is_vanilla_mob` | target が通常 mob か |
| `is_critical` | attack 時のみ実質使用 | 空中クリティカル相当判定 |

#### block 系

| キー | どこで入るか | 内容 |
| --- | --- | --- |
| `block_x` / `block_y` / `block_z` | break / drop / place / interact | block 座標 |
| `block_type` | break / drop / place / interact | Material 名 |
| `block_against_type` | place 時 | 設置面 block type |
| `block_age` / `block_max_age` | ageable block 時 | 作物成長段階 |
| `block_exp` | break / death 系 | 経験値 |
| `block_is_loot_container` | break / drop / place / interact | lootable/container 判定 |
| `block_is_unopened_loot` | 同上 | 未開封 loot container 判定 |
| `block_loot_table` | 同上 | loot table key |

#### fishing 系

| キー | 内容 |
| --- | --- |
| `fishing_state` | `CAUGHT_FISH` など |
| `fishing_hook_in_open_water` | open water 判定 |
| `fishing_has_catch` | catch があるか |
| `fishing_caught_entity_type` | catch entity type |
| `fishing_caught_item_type` | catch item の Material |
| `fishing_caught_item_amount` | catch item 数 |
| `fishing_exp` | 釣り経験値 |

#### ActionStateSupport が足すキー

`add_tag` / `remove_tag` / `set_metadata` / `clear_metadata` を使うと、player / item / target / block に簡易 state を持たせられます。

| キー | 内容 |
| --- | --- |
| `player_tags` / `item_tags` / `target_tags` / `block_tags` | `,` 区切り tag 一覧 |
| `player_tag_count` など | tag 数 |
| `player_metadata` / `item_metadata` / `target_metadata` / `block_metadata` | `key=value|key=value` 形式 |
| `player_metadata_count` など | metadata 数 |

### runtime context には入るが、CEL 宣言外の補助キー

以下のキーは listener 側で context に積まれますが、現行 `CelScriptEngine` の変数宣言とはズレています。  
docs 上は「実装が渡している値」として把握しつつ、実際に式で使う時はサーバーログの CEL warning を確認してください。

| キー | どこで積まれるか | 内容 |
| --- | --- | --- |
| `enchant_level` | 全 trigger 共通 | 現在評価中 enchant のレベル |
| `custom_enchant_total_level` | 全 trigger 共通 | 独自エンチャ total level |
| `block_drop_count` | break / drop | drop 総数 |
| `block_drop_stacks` | break / drop | stack 数 |
| `block_has_drops` | break / drop | drop の有無 |
| `target_block_*` | `target-conditions` 評価時 | 対象 block の情報 |
| `tool_*` | managed resource break 時 | gathering tool 情報 |

### `target-conditions` 用に渡される補助 context

`break_nearby_blocks`、`set_block`、`break_block`、`clear_block`、`set_nearby_blocks`、`clear_nearby_blocks`、`grow_nearby_blocks` の `target-conditions[]` は、通常 context に加えて対象 block の情報を参照できます。

| キー | 内容 |
| --- | --- |
| `target_block_type` | 対象 block の Material |
| `target_block_x` / `target_block_y` / `target_block_z` | 対象座標 |
| `target_block_is_air` | air か |
| `target_block_is_replaceable` | replaceable か |
| `target_block_age` / `target_block_max_age` | 成長段階 |
| `target_block_biome` | biome path 大文字 |
| `target_block_biome_key` | `minecraft:plains` 形式 |

例:

```yml
target-conditions:
  - "target_block_max_age > 0"
  - "target_block_age >= target_block_max_age"
  - "target_block_type != 'BEDROCK'"
```

> [!WARNING]
> `target_block_*` は listener 側で追加されていますが、現行 `CelScriptEngine` の宣言と完全一致していません。  
> 既存定義でも使われているため intended な書き方ではありますが、追加時はログ確認前提で扱ってください。

### managed resource break 時に渡される補助 context

`ManagedResourceBreakEvent` 経由では、通常 context に加えて gathering tool 情報も入ります。

| キー | 内容 |
| --- | --- |
| `tool_profile_id` | ツール profile ID |
| `tool_family` | `mining`, `harvesting` など |
| `tool_personalities` | `,` 区切り personality 一覧 |
| `tool_personality_count` | personality 数 |
| `tool_location_tags` | `,` 区切り location tag 一覧 |
| `tool_location_matched` | location 条件に一致したか |
| `tool_obtainables` | `,` 区切り obtainable 一覧 |
| `tool_obtainable_count` | obtainable 数 |
| `tool_enchant_tags` | `,` 区切り enchant tag 一覧 |

> [!WARNING]
> `tool-*` filter と `tool_*` context は managed resource break 経路でだけ評価されます。  
> 通常の `BlockBreakEvent`、戦闘、釣り、設置、passive では見ません。

## biome / entity / Mythic filter の書き方

### `target-entity-types`

`PatternMatcher.matchesEntity` で判定されます。

| 書き方 | 意味 |
| --- | --- |
| `PLAYER` | Player のみ |
| `LIVING` | LivingEntity 全般 |
| `MOB` | LivingEntity かつ Player ではないもの |
| `ZOMBIE`, `CREEPER`, `*_SKELETON` | EntityType 名 pattern |

### `target-mythic-mob-ids`, `item-mythic-types`

`PatternMatcher.matchesText` で判定されます。大文字小文字は無視され、`*` が使えます。

例:

```yml
target-mythic-mob-ids:
  - "Frontier_*"
item-mythic-types:
  - "MaterialPickaxe*"
```

### `biomes`

biome は次のどれでも pattern match できます。

- full key: `minecraft:plains`
- path: `PLAINS`
- namespace: `MINECRAFT`

例:

```yml
biomes:
  - "minecraft:*"
  - "CHERRY_*"
```

## `actions[]` 一覧

### 戦闘・回復

| `type` | 主なキー | 内容 |
| --- | --- | --- |
| `bonus_damage` | `amount-per-level`, `amount-expression` | 固定ダメージ加算 |
| `bonus_damage_percent` | `percent-per-level`, `percent-expression` | 現在ダメージに割合加算 |
| `ignite_target` | `ticks-per-level`, `ticks-expression` | target を燃やす |
| `heal_self` | `amount-per-level`, `amount-expression` | 自分を回復 |
| `heal_self_percent` | `percent-per-level`, `percent-expression` | 最大体力割合で回復 |
| `potion_target` | `effect`, `duration-ticks`, `duration-expression`, `amplifier-base`, `amplifier-per-level`, `amplifier-expression` | target に potion |
| `potion_self` | 同上 | 自分に potion |
| `reduce_damage` | `amount-per-level`, `amount-expression` | ダメージ減算 |
| `reduce_damage_percent` | `percent-per-level`, `percent-expression` | ダメージ割合軽減 |

### 採掘・block 操作

| `type` | 主なキー | 内容 |
| --- | --- | --- |
| `break_nearby_blocks` | `radius`, `radius-expression`, `same-type-only`, `require-correct-tool`, `target-block-types[]`, `target-conditions[]` | 見ている面に沿った 1 面の周囲 block を破壊 |
| `multiply_block_exp` | `multiplier-base`, `multiplier-per-level`, `multiplier-expression` | block exp 倍化 |
| `multiply_block_drops` | `multiplier-base`, `multiplier-per-level`, `multiplier-expression` | drop 倍化 |
| `add_block_drops` | `amount-per-level`, `amount-expression` | drop 加算 |
| `set_block` | `material`, `target`, `offset-*`, `target-block-types[]`, `target-conditions[]` | 1 block 置換 |
| `break_block` | `target`, `offset-*`, `require-correct-tool`, `drop-items`, `target-block-types[]`, `target-conditions[]` | 指定 block を破壊 |
| `clear_block` | `target`, `offset-*`, `target-block-types[]`, `target-conditions[]` | 指定 block を air 化 |
| `set_nearby_blocks` | `material`, `target`, `radius`, `include-origin`, `air-only`, `replace-only`, `same-type-only`, `target-block-types[]`, `target-conditions[]` | 周囲 block 置換 |
| `clear_nearby_blocks` | `target`, `radius`, `include-origin`, `same-type-only`, `target-block-types[]`, `target-conditions[]` | 周囲 block を air 化 |
| `set_block_age` | `target`, `age`, `age-expression`, `offset-*` | Ageable の age を変更 |
| `grow_nearby_blocks` | `target`, `radius`, `include-origin`, `same-type-only`, `stages`, `stages-expression`, `to-max-age`, `target-block-types[]`, `target-conditions[]` | 周囲作物を成長 |

### item / exp / utility

| `type` | 主なキー | 内容 |
| --- | --- | --- |
| `grant_exp` | `amount-per-level`, `amount-expression` | プレイヤーへ経験値 |
| `feed_self` | `food`, `food-expression`, `saturation`, `saturation-expression` | 空腹回復 |
| `repair_item` | `amount-per-level`, `amount-expression` | 手持ち item 修理 |
| `damage_item` | `amount-per-level`, `amount-expression` | 手持ち item を痛める |
| `play_sound_self` | `sound`, `volume`, `volume-expression`, `pitch`, `pitch-expression` | 自分に音 |
| `spawn_particle_self` | `particle`, `count`, `count-expression`, `offset-x/y/z`, `extra`, `extra-expression` | 自分の周囲に particle |
| `push_self` | `x`, `x-expression`, `y`, `y-expression`, `z`, `z-expression` | 自分へ速度加算 |
| `pickup_nearby_items` | `radius-base`, `radius-per-level`, `radius-expression`, `max-items`, `max-items-expression` | 周囲 item を吸う |

### item 生成 / drop / entity / command

| `type` | 主なキー | 内容 |
| --- | --- | --- |
| `give_item` | `material` または `mythic-type`, `amount`, `amount-expression` | 所持品へ付与 |
| `drop_item` | `material` または `mythic-type`, `amount`, `amount-expression`, `target` | 指定位置に drop |
| `summon_entity` | `entity-type` または `mythic-mob-id`, `count`, `count-expression`, `target`, `offset-*` | entity summon |
| `run_command` | `command`, `executor` | command 実行 |
| `cast_mythic_skill` | `skill` | 自分を caster に Mythic skill 発動 |
| `cast_mythic_skill_self` | `skill` | `cast_mythic_skill` の alias |
| `cast_mythic_skill_target` | `skill` | target に対して cast |
| `cast_mythic_skill_location` | `skill`, `target` | location 指定 cast |

### 状態制御 / flow / message

| `type` | 主なキー | 内容 |
| --- | --- | --- |
| `add_tag` | `target`, `tag` | state tag を追加 |
| `remove_tag` | `target`, `tag` | state tag を削除 |
| `set_metadata` | `target`, `key`, `value` | metadata を保存 |
| `clear_metadata` | `target`, `key` | metadata 削除 |
| `cancel_event` | なし | event を cancel |
| `stop_processing` | なし | 以降の action を打ち切る |
| `message_self` | `text` | 自分へ送信 |
| `message_target` | `text` | target player へ送信 |

## `target` / location 指定で使える値

`drop_item`、`set_block`、`break_block`、`clear_block`、`set_nearby_blocks`、`clear_nearby_blocks`、`set_block_age`、`grow_nearby_blocks`、`summon_entity`、`cast_mythic_skill_location` などで使います。

| 値 | 解決先 |
| --- | --- |
| `player`, `self` | プレイヤー位置 |
| `player_feet` | プレイヤー足元 block 座標 |
| `player_head` | 目線位置 |
| `event_block`, `block` | 発火元 block |
| `block_above` | 発火元 block の上 |
| `block_below` | 発火元 block の下 |
| `target`, `target_feet` | target entity の位置 |
| `target_head` | target の eye location |
| `target_block` | target が立っている block |
| `context:*` | 現在 context の `block_x/y/z` を使って Location 化 |

> [!NOTE]
> `context:*` は現行実装だと suffix を見ておらず、`context:anything` でも `block_x/y/z` を使います。

## `run_command` / `message_*` のテンプレート

`run_command.command` と `message_self.text` / `message_target.text` は `{key}` 形式で埋め込みできます。

よく使う placeholder:

| placeholder | 内容 |
| --- | --- |
| `{player}` | player 名 |
| `{player_uuid}` | player UUID |
| `{world}` | world 名 |
| `{target}` | target 名 |
| `{target_uuid}` | target UUID |
| `{target_type}` | target entity type |
| `{target_mythic_mob_id}` | target MythicMob ID |
| `{block_type}` | 発火元 block type |
| `{block_x}`, `{block_y}`, `{block_z}` | block 座標 |
| `{biome}`, `{biome_key}` | biome |

さらに、context に入っているすべてのキーは `{player_health}` のようにそのまま埋め込めます。

例:

```yml
actions:
  - type: message_self
    text: "<gray>{block_type} を採掘: {block_x}, {block_y}, {block_z}"
  - type: run_command
    executor: console
    command: "say {player} triggered {event}"
```

## `target` に使える ActionStateTarget

`add_tag` / `remove_tag` / `set_metadata` / `clear_metadata` の `target` は次を受けます。

| 値 | 実体 |
| --- | --- |
| `player`, `self` | プレイヤー PDC |
| `target`, `target_entity`, `entity` | target entity の PDC |
| `source_item`, `item`, `held_item` | 発動元 item meta の PDC |
| `source_block`, `block` | TileState block の PDC |

## よくある実用パターン

### 作物だけ対象にする

```yml
block-types:
  - "WHEAT"
  - "CARROTS"
conditions:
  - "block_max_age > 0"
  - "block_age >= block_max_age"
```

### target block が熟している時だけ周囲破壊する

```yml
actions:
  - type: break_nearby_blocks
    radius: 1
    target-block-types:
      - "WHEAT"
      - "CARROTS"
    target-conditions:
      - "target_block_max_age > 0"
      - "target_block_age >= target_block_max_age"
```

### 夜だけ発動率を上げる

```yml
chance-expression: "world_time >= 13000 && world_time <= 23000 ? 0.35 : 0.1"
```

### 雨の日だけ有効

```yml
conditions:
  - "is_raining"
```

## 実装上の注意

- `conditions` は空なら常に通ります。
- `chance-expression` が失敗した場合は `chance` に fallback します。
- `amount-expression` などの数値式は評価結果を `Int` に丸める箇所があります。
- `allow-zero-effect: false` だと、`final_damage <= 0` や drop なし block などは trigger ごと止まります。
- `once-per-event: true` は同一 event object 内の多重発火防止です。cooldown とは別です。
- `passive_tick` は 5 tick ごとにオンライン player を走査します。
- managed resource break listener は現在 `break_block` / `block_drop` の drop 操作中心です。`tool-*` filter を書く時はその適用経路を意識してください。

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
