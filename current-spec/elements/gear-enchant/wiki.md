# 仮想ロア・カスタムエンチャント Wiki

> [!WARNING]
> この要素は見た目の lore だけではなく、採掘、戦闘、釣り、設置、passive 効果まで横断しています。  
> 「表示を変えたい」のか「効果を変えたい」のかを最初に分けると事故が減ります。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | 仮想ロア、独自エンチャント、trigger / condition / action |
| 主設定 | `config.yml`, `enchants/*.yml` |
| 実装の基準 | `CustomEnchantRegistry`, `TriggerContext`, `CelScriptEngine`, `CustomEnchantListener` |
| 変更難度 | 中〜高 |

## 何をどこで触るのか

### 仮想ロアを変えたい時

- `ItemLoreOverlayService`
- 各 lore service
- `VirtualLoreSections`

これは「見え方」の層です。  
実アイテム自体を書き換えず、表示だけを差し込みます。

### 効果を変えたい時

- `core/src/main/resources/enchants/*.yml`
- 必要に応じて `config.yml`

これは「挙動」の層です。  
戦闘・採掘・設置・釣り・passive の実効果はここです。

## enchant YAML の考え方

1 つの enchant は基本的に次の流れで動きます。

1. `supported-materials` と `active-slots` で装備対象を決める
2. `event` で発火契機を決める
3. 各種 filter で対象を絞る
4. `conditions` と `chance-expression` で最終判定する
5. `actions` を順番に実行する

この mental model で見ると YAML がかなり読みやすくなります。

## 新規 enchant を作る時のおすすめ手順

1. 近い既存 YAML を 1 つ複製する
2. `id`, `display-name`, `description`, `supported-materials` を先に直す
3. `event` を 1 個に絞って最小構成で動かす
4. `conditions` を 1 行ずつ増やす
5. `actions` を 1 個ずつ足す
6. 最後に `chance-expression` と `cooldown` を調整する

> [!TIP]
> いきなり `conditions`、`target-conditions`、`command`、複数 action を全部積むと切り分けが大変です。  
> 先に「message が出る」「exp が入る」など簡単な action で発火確認をすると速いです。

## trigger ごとのざっくりした使い分け

| trigger | 向いている用途 | よく使う context |
| --- | --- | --- |
| `attack_entity` | 追加ダメージ、吸収、状態異常 | `damage`, `target_*`, `is_critical` |
| `damaged_by_entity` | 被弾時反応、防御 proc | `final_damage`, `target_*` |
| `living_entity_death` | kill reward、吸収、経験値 | `target_*`, `block_exp` |
| `fall_damage` | 落下軽減 | `damage`, `final_damage` |
| `break_block` | block 破壊時の本体効果 | `block_*`, `block_drop_*` |
| `block_drop` | drop 数の操作、回収補助 | `block_drop_count`, `block_drop_stacks` |
| `place_block` | 建築補助、設置報酬 | `block_type`, `block_against_type` |
| `interact_block` | 右クリック起点の成長 / 変化 | `block_*` |
| `fishing` | 釣果 bonus | `fishing_state`, `fishing_*` |
| `passive_tick` | 常時 aura、磁力、装備効果 | player / world 系 |
| `mythic_damage`, `mythic_death` | MythicMobs 連携 proc | `integration`, `target_mythic_mob_id` |

## `condition` と `target-conditions` の違い

ここが一番混乱しやすいです。

### `conditions`

- trigger が通るかどうかを決める
- 発火元 player / item / event block / target entity を見る
- 例: 「プレイヤーが満腹未満」「釣り state が CAUGHT_FISH」「元 block が成熟済み」

```yml
conditions:
  - "player_food < 20"
  - "block_age >= block_max_age"
```

### `target-conditions`

- action がこれから触る「対象 block」ごとに評価する
- 周囲破壊や block 置換で特に重要
- 例: 「周囲の作物のうち熟しているものだけ壊す」「BEDROCK は除外する」

```yml
actions:
  - type: break_nearby_blocks
    radius: 1
    target-conditions:
      - "target_block_age >= target_block_max_age"
      - "target_block_type != 'BEDROCK'"
```

### よくある取り違え

- `block_age` は発火元 block
- `target_block_age` は action が見ている候補 block

元 block が熟していても、周囲の block すべてが熟しているとは限らないので、農業系は両方使うことが多いです。

## 文字列比較のコツ

Material 名や state 名を比較するときは quote 付きで書くのが無難です。

```yml
conditions:
  - "fishing_state == 'CAUGHT_FISH'"
  - "weather == 'rain'"
  - "target_type == 'ZOMBIE'"
```

quote を省くと、読みやすさも落ちます。

## cooldown と `once-per-event` の違い

### `once-per-event`

- 同じ event object 中の多重発火を抑える
- 連鎖 listener や複数評価経路の重複防止向き

### `cooldown-ticks`

- 別 event をまたいだ再発動待ち
- `cooldown-scope` で共有単位を決める

使い分けの目安:

- 「1 回の殴りで 2 回発動したくない」なら `once-per-event`
- 「同じ相手に毎 tick 連発したくない」なら `cooldown-scope: target`
- 「同じ block に対して連打したくない」なら `cooldown-scope: source_block`

## `allow-zero-effect` の考え方

これも見落としやすいです。

- `false`: ダメージ 0、drop なし、air block などの「実質何も起きていない」event を弾く
- `true`: 不発でも trigger を進める

向いている例:

- `false`: combat proc、drop bonus、通常採掘
- `true`: passive aura、周囲吸引、定期 buff

## managed resource 専用 filter の扱い

`tool-profile-ids`、`tool-families`、`tool-personalities`、`tool-location-tags`、`tool-obtainables`、`tool-enchant-tags` は、実装上 `ManagedResourceBreakEvent` 側でだけ見ています。

つまり:

- 通常の戦闘 trigger では無関係
- 通常の Paper `BlockBreakEvent` でも無関係
- resource 管理や gather tool metadata と噛み合う break 系でだけ意味を持つ

このため docs 上では「trigger 共通キー」ではあるものの、運用感としては gather 拡張キーだと思っておくと混乱しにくいです。

## passive enchant を作る時の注意

`passive_tick` は 5 tick ごとに全 online player の装備を走査します。

意識したい点:

- cooldown を短くしすぎない
- 重い action をむやみに積まない
- 条件式で先に絞る
- player 以外の state を参照しない設計の方が安定しやすい

`pickup_nearby_items` のような常時系は、`cooldown-scope: player` と `allow-zero-effect: true` の組み合わせが扱いやすいです。

## block 操作系 action のコツ

### 1 block 操作

- `set_block`
- `break_block`
- `clear_block`
- `set_block_age`

用途:

- 特定 1 マスだけ変える
- `target` と `offset-*` で明示的に狙う

### 周囲操作

- `break_nearby_blocks`
- `set_nearby_blocks`
- `clear_nearby_blocks`
- `grow_nearby_blocks`

用途:

- 半径ベースでまとめて処理したい
- `target-block-types` と `target-conditions` を併用する

### 迷った時の基準

- 元 block 基準で周囲を触るなら周囲 action
- 「上 1 マスだけ」「target の足元だけ」なら 1 block action

## command / message を使う時のコツ

`run_command` と `message_*` は、デバッグにも本実装にも使えます。

デバッグ例:

```yml
actions:
  - type: message_self
    text: "<gray>{event} {block_type} {block_x},{block_y},{block_z}"
```

command 例:

```yml
actions:
  - type: run_command
    executor: console
    command: "say {player} triggered {event}"
```

先にこれで context が取れているか確認してから、重い action を足すのが安全です。

## よくあるハマりどころ

### 発動しない

- `supported-materials` がズレている
- `active-slots` が想定と違う
- `conditions` で false になっている
- `chance-expression` が 0 未満や極端に低い
- `cooldown-ticks` が長い

### 周囲破壊が思ったより広い / 狭い

- `same-type-only` の指定
- `target-block-types` の不足
- `target-conditions` が書かれていない
- `radius-expression` の三項演算子が想定通りか

### passive が重い

- cooldown が短すぎる
- 毎回多くの entity / item を見る action を積みすぎている
- 条件で早期 return できていない

### managed resource で思ったように効かない

- `tool-*` は通常 break では見ない
- gather 側 metadata が本当に event に乗っているか確認する
- `target_block_*` や `tool_*` を式で使う時は、CEL warning が出ていないかログを確認する

## 読む順番のおすすめ

1. [設定項目](./reference.md) を開く
2. このページの「condition と target-conditions の違い」を読む
3. [編集例](./examples.md) から近いサンプルを複製する
4. 最後に既存 `enchants/*.yml` を実物で見比べる

## FAQ

### `level` と `enchant_level` は何が違うのか

どちらも現行 `CelScriptEngine` から参照できます。  
`level` には enchant 単体レベルではなく `totalLevel` が入り、`enchant_level` には現在評価中 enchant のレベルが入ります。  
周囲破壊や周囲成長のように「その enchant の段階だけで半径を伸ばしたい」場合は `enchant_level` を使ってください。

### `block_drop` と `break_block` はどちらを使うべきか

元 block を壊した瞬間の判定や周囲破壊は `break_block`、drop 数を増減したい時は `block_drop` が見やすいです。

### `target: context:something` の `something` に意味はあるか

現行実装では prefix が `context:` であれば suffix は見ていません。  
内部的には `block_x`, `block_y`, `block_z` を使って location 化します。

### `tool-*` filter はどこでも使えるのか

YAML としてはどこにでも書けますが、実装上は managed resource break 系の評価でだけ意味があります。

## 関連

- [要素概要](./summary.md)
- [設定項目](./reference.md)
- [編集例](./examples.md)
- [Wiki執筆ガイド](../../wiki-editing-guide.md)
