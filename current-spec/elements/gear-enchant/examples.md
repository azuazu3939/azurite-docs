# 仮想ロア・カスタムエンチャント の編集例

このページは「新規 enchant を追加するときの叩き台」を目的にしています。  
詳しいキー一覧は [設定項目](./reference.md) を参照してください。

## 最小テンプレート

まずはこの形を複製して始めるのが安全です。

```yml
id: sample_enchant
enabled: true
display-name: "<yellow>サンプル"
max-level: 3
weight: 8
cost-base: 6
manaril-weight: 4
eterila-weight: 2
supported-materials:
  - "*_SWORD"
active-slots:
  - hand
description:
  - "説明文をここに書く"
triggers:
  - event: attack_entity
    allow-cancelled: false
    allow-zero-effect: false
    once-per-event: true
    cooldown-ticks: 20
    cooldown-scope: target
    chance-expression: "0.1 + (level * 0.05)"
    conditions:
      - "target_is_living"
    actions:
      - type: bonus_damage
        amount-expression: "1 + level"
```

## 戦闘: 体力が減っている時だけ自己回復

`life_steal.yml` 系の最小例です。  
「発動条件を `conditions` で絞る」書き方の基本になります。

```yml
id: life_steal_sample
enabled: true
display-name: "<aqua>奪命の一撃"
max-level: 4
weight: 12
cost-base: 7
manaril-weight: 5
eterila-weight: 3
supported-materials:
  - "*_SWORD"
  - "*_AXE"
active-slots:
  - hand
description:
  - "攻撃時に体力を少し回復する"
triggers:
  - event: attack_entity
    target-entity-type: "MOB"
    cooldown-scope: target
    cooldown-ticks: 100
    chance: 0.5
    conditions:
      - "target_is_living"
      - "player_health < player_max_health"
    actions:
      - type: heal_self
        amount-per-level: 1
```

押さえる点:

- `target-entity-type: MOB` は Player を除く LivingEntity を拾います。
- 「体力満タンなら発動しない」は `conditions` に寄せると読みやすいです。
- 同じ相手への連打を抑えたいなら `cooldown-scope: target` が使いやすいです。

## 釣り: `fishing_state` を見て経験値を配る

`PlayerFishEvent` 系では `fishing_state` と `fishing_has_catch` が便利です。

```yml
id: angler_fortune_sample
enabled: true
display-name: "<aqua>釣果のひらめき"
max-level: 3
weight: 8
cost-base: 8
manaril-weight: 5
eterila-weight: 3
supported-materials:
  - "FISHING_ROD"
active-slots:
  - hand
  - off_hand
description:
  - "釣り成功時に追加経験値を得る"
triggers:
  - event: fishing
    cooldown-ticks: 10
    cooldown-scope: player
    conditions:
      - "fishing_state == 'CAUGHT_FISH'"
      - "fishing_has_catch"
    chance-expression: "0.06 + (level * 0.03)"
    actions:
      - type: grant_exp
        amount-expression: "6 + (level * 4)"
```

押さえる点:

- 文字列比較は `'CAUGHT_FISH'` のように quote 付きで書くと安全です。
- `chance-expression` の結果は 0.0〜1.0 に丸められます。

## 採掘: 周囲破壊しつつ危険 block を除外する

`break_nearby_blocks` と `target-conditions` の組み合わせ例です。

```yml
id: excavation_sample
enabled: true
display-name: "<gold>掘削の兆し"
max-level: 2
weight: 9
cost-base: 8
manaril-weight: 7
eterila-weight: 3
supported-materials:
  - "*_PICKAXE"
  - "*_SHOVEL"
active-slots:
  - hand
description:
  - "周囲の block を追加で掘る"
triggers:
  - event: break_block
    block-types:
      - "*"
    cooldown-ticks: 4
    cooldown-scope: player
    actions:
      - type: break_nearby_blocks
        radius-expression: "enchant_level >= 2 ? 2 : 1"
        same-type-only: false
        require-correct-tool: false
        target-conditions:
          - "target_block_type != 'BEDROCK'"
```

押さえる点:

- `target-conditions` は発火元 block ではなく「これから触る対象 block」に対して評価されます。
- `break_nearby_blocks` は見ている面に沿った 1 面だけを対象にします。
- `same-type-only: true` にすると vein 掘りっぽい挙動に寄せやすいです。
- `require-correct-tool: true` を付けると適正ツール判定も入ります。

## 農業: 熟した作物だけ周囲破壊する

`block_age` と `target_block_age` の両方を使い分ける例です。

```yml
id: harvester_sample
enabled: true
display-name: "<yellow>収穫の兆し"
max-level: 2
weight: 10
cost-base: 6
manaril-weight: 6
eterila-weight: 3
supported-materials:
  - "*_HOE"
active-slots:
  - hand
description:
  - "熟した作物を広く収穫する"
triggers:
  - event: break_block
    block-types:
      - "WHEAT"
      - "CARROTS"
      - "POTATOES"
      - "BEETROOTS"
      - "NETHER_WART"
    conditions:
      - "block_max_age > 0"
      - "block_age >= block_max_age"
    actions:
      - type: break_nearby_blocks
        radius-expression: "enchant_level >= 2 ? 2 : 1"
        same-type-only: false
        require-correct-tool: false
        target-block-types:
          - "WHEAT"
          - "CARROTS"
          - "POTATOES"
          - "BEETROOTS"
          - "NETHER_WART"
        target-conditions:
          - "target_block_max_age > 0"
          - "target_block_age >= target_block_max_age"
```

押さえる点:

- 元 block の成熟判定は `conditions`。
- 周囲 block の成熟判定は `target-conditions`。
- 「どの作物を触るか」は `target-block-types` で先に狭めると読みやすいです。

## passive: 5 tick ごとに周囲 item を回収

`passive_tick` は常時装備効果向けです。

```yml
id: magnetism_sample
enabled: true
display-name: "<aqua>磁力収集"
max-level: 3
weight: 8
cost-base: 7
manaril-weight: 7
eterila-weight: 5
supported-materials:
  - "*_BOOTS"
active-slots:
  - feet
description:
  - "周囲のドロップアイテムを引き寄せる"
triggers:
  - event: passive_tick
    allow-cancelled: true
    allow-zero-effect: true
    once-per-event: true
    cooldown-ticks: 10
    cooldown-scope: player
    actions:
      - type: pickup_nearby_items
        radius-base: 3.0
        radius-per-level: 1.25
        max-items: 64
```

押さえる点:

- `passive_tick` は 5 tick ごとに走るので、cooldown をちゃんと置く方が安全です。
- 常時効果は `allow-zero-effect: true` にしておくと不発時でも安定しやすいです。

## block 設置: 設置時に経験値を与える

設置系は `place_block` を使います。

```yml
id: builders_grace_sample
enabled: true
display-name: "<white>建築の恩寵"
max-level: 3
weight: 9
cost-base: 5
manaril-weight: 5
eterila-weight: 3
supported-materials:
  - "*_HELMET"
  - "*_CHESTPLATE"
  - "*_LEGGINGS"
  - "*_BOOTS"
active-slots:
  - head
  - chest
  - legs
  - feet
description:
  - "建築時に経験値を得る"
triggers:
  - event: place_block
    cooldown-ticks: 10
    cooldown-scope: source_block
    block-types:
      - "*"
    actions:
      - type: grant_exp
        amount-expression: "1 + level"
```

押さえる点:

- `block-type` / `block-types` は置いた後の block type に対して評価されます。
- armor に持たせる enchant は `active-slots` を明示しておくと読みやすいです。

## command / message: context を埋め込む

通知や command 実行では `{key}` placeholder が使えます。

```yml
id: notify_sample
enabled: true
display-name: "<gray>採掘通知"
max-level: 1
weight: 1
cost-base: 1
manaril-weight: 1
eterila-weight: 1
supported-materials:
  - "*_PICKAXE"
active-slots:
  - hand
description:
  - "採掘情報を表示する"
triggers:
  - event: break_block
    block-types:
      - "DIAMOND_ORE"
      - "DEEPSLATE_DIAMOND_ORE"
    actions:
      - type: message_self
        text: "<aqua>{block_type}</aqua> at {block_x}, {block_y}, {block_z}"
      - type: run_command
        executor: console
        command: "say {player} found {block_type} in {world}"
```

押さえる点:

- `message_self` / `message_target` は MiniMessage で送られます。
- `run_command.executor` は `console`, `player`, `op_player` が使えます。

## block を置き換える

位置指定 action は `target` と `offset-*` を組み合わせて書きます。

```yml
id: crop_bloom_sample
enabled: true
display-name: "<green>芽吹き"
max-level: 2
weight: 5
cost-base: 6
manaril-weight: 4
eterila-weight: 2
supported-materials:
  - "*_HOE"
active-slots:
  - hand
description:
  - "周囲の作物を育てる"
triggers:
  - event: interact_block
    block-types:
      - "WHEAT"
      - "CARROTS"
      - "POTATOES"
    actions:
      - type: grow_nearby_blocks
        target: event_block
        radius-expression: "enchant_level"
        include-origin: true
        same-type-only: false
        stages: 1
        target-block-types:
          - "WHEAT"
          - "CARROTS"
          - "POTATOES"
```

押さえる点:

- `target: event_block` が基準座標です。
- `offset-x-expression` などで発動ごとにずらすこともできます。

## managed resource 向け filter 例

gathering tool 情報を使う例です。  
これは managed resource break 経路でだけ実質評価される点に注意してください。

```yml
id: field_lesson_sample
enabled: true
display-name: "<green>畑の学び"
max-level: 3
weight: 8
cost-base: 5
manaril-weight: 4
eterila-weight: 2
supported-materials:
  - "*_HOE"
active-slots:
  - hand
triggers:
  - event: break_block
    tool-families:
      - "harvesting"
    tool-profile-ids:
      - "farm_*"
    block-types:
      - "WHEAT"
      - "CARROTS"
    conditions:
      - "block_max_age > 0"
      - "block_age >= block_max_age"
    chance-expression: "0.08 + (level * 0.04)"
    actions:
      - type: grant_exp
        amount-expression: "1 + (level >= 3 ? 1 : 0)"
```

押さえる点:

- `tool-families`, `tool-profile-ids`, `tool-personalities` などは通常 combat / Paper break では見ません。
- gather 系 metadata を触る設計にしたい時は [設定項目](./reference.md) の managed resource 節も確認してください。

## 変更前チェックリスト

- `id` は登録済みか
- `supported-materials` が空でないか
- `active-slots` が装備想定と合っているか
- `conditions` で使う文字列が quote されているか
- `target-conditions` と `conditions` を取り違えていないか
- passive 系なら cooldown が過剰に短くないか

## 関連

- [要素概要](./summary.md)
- [設定項目](./reference.md)
- [Wiki](./wiki.md)
