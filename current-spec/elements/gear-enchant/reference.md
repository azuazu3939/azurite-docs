# 装備評価・仮想ロア・カスタムエンチャント の設定項目

装備の見た目と評価値を触るときの YAML リファレンスです。`config.yml` のエンチャント GUI、`itemscore.yml` の換算式、`enchants/*.yml` の個別挙動をまとめています。

> [!TIP]
> まず `itemscore.yml` で評価軸を決め、その後で `enchants/*.yml` の発動強度を足すと、見た目だけ高い装備になりにくいです。

## `config.yml` のエンチャント共通設定

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `mythicmobs.custom-enchants` | 独自エンチャント連携の ON/OFF。 | 切ると `enchants/*.yml` の読込も意味を失う。 |
| `gui.title` | エンチャント GUI タイトル。 | MiniMessage 風の装飾を含められる。 |
| `gui.offers-per-roll` | 1 回の抽選で出す候補数。 | 多いほど厳選しやすい。 |
| `gui.reroll-level-cost` | 再抽選のレベルコスト。 | 低すぎると期待値が上がりやすい。 |
| `disabled-vanilla-enchantments[]` | 完全無効にするバニラ enchant。 | 独自環境で役割が被るものを切る。 |
| `gated-vanilla-enchantments[]` | 使えるが制限対象にするバニラ enchant。 | 段階解放や別導線に回したい時向き。 |

## `itemscore.yml` の装備評価設定

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `enabled` | Item Level / Gear Score 表示全体の ON/OFF。 | 切るとロア再構築も止まる。 |
| `lore.separator` | 評価ロア前後に区切りを入れるか。 | 見やすさ用。 |
| `lore.strip-prefixes[]` | 既存ロアから消す接頭辞。 | 旧表示と二重化させないための掃除リスト。 |
| `lore.lines[]` | 再生成するロア行。 | `{item_level}` などのプレースホルダを使う。 |
| `scoring.durability-penalty-multiplier` | 耐久減少時の減点係数。 | 耐久消耗を強く評価に入れたい時に上げる。 |
| `scoring.enchantments.normal-base-weight` | 通常 enchant の基本重み。 | enchant 価値の土台。 |
| `scoring.enchantments.treasure-base-weight` | treasure enchant の基本重み。 | レア付与を高く見せたい時に上げる。 |
| `scoring.enchantments.cursed-base-weight` | curse enchant の基本重み。 | マイナス値にすると呪いを減点化できる。 |
| `scoring.enchantments.max-level-divisor` | 最大レベルで割る補正。 | 高レベル enchant の伸び方を丸める。 |
| `scoring.enchantments.minimum-level-weight` | 最低保証の重み。 | 低レベル enchant が無価値になりすぎるのを防ぐ。 |
| `scoring.attributes.default-weight` | 未個別指定 Attribute の重み。 | 新しい属性を追加した時の安全網。 |
| `scoring.attributes.weights.<attribute>` | 属性ごとの個別重み。 | `minecraft:attack_damage` のような namespace 付き key。 |
| `scoring.attributes.operation-scales.ADD_NUMBER` | 固定加算属性の換算倍率。 | 武器・防具の定数強化に効きやすい。 |
| `scoring.attributes.operation-scales.ADD_SCALAR` | 割合加算の換算倍率。 | パーセント系補正の強さを決める。 |
| `scoring.attributes.operation-scales.MULTIPLY_SCALAR_1` | 乗算系の換算倍率。 | 大きくしすぎると上振れしやすい。 |

## `enchants/*.yml` の共通スキーマ

各エンチャントファイルはほぼ同じ形を持ちます。`veinfinder.yml` や `blazing_edge.yml` を読むと全体像を掴みやすいです。

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `id` | エンチャント内部 ID。 | ファイル名と揃えると管理しやすい。 |
| `enabled` | そのエンチャントの ON/OFF。 | 個別に一時停止したい時はここ。 |
| `display-name` | 表示名。 | 色コードを含められる。 |
| `max-level` | 最大レベル。 | 発動式の `level` と整合を取る。 |
| `weight` | 抽選重み。 | 高いほど候補に出やすい。 |
| `cost-base` | 付与コストの基礎値。 | GUI の重さを決める基本値。 |
| `manaril-weight` | Manaril 系素材との関係重み。 | 素材別抽選に効く前提の値。 |
| `eterila-weight` | Eterila 系素材との関係重み。 | 上と同様。 |
| `supported-materials[]` | 装備種別制限。 | `*_SWORD` のようなパターンも使われている。 |
| `tool-families[]` | ツール系分類タグ。 | 採掘系だけに寄せたい時に使う。 |
| `active-slots[]` | 発動判定を行う装備スロット。 | `hand` など。 |
| `conflicts-with[]` | 併用不可 ID。 | 役割が被る enchant を排他にする。 |
| `description[]` | 説明文。 | GUI や lore 向けの短文。 |
| `triggers[]` | 発動契機の配列。 | 1 enchant に複数 trigger を持てる。 |

## `triggers[]` と `actions[]` の見方

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `triggers[].event` | 発火イベント。 | `break_block` や `attack_entity` など。 |
| `triggers[].target-entity-type` | 対象エンティティ制限。 | 攻撃系 enchant で使う。 |
| `triggers[].chance-expression` | 発動確率式。 | `level` を使って段階成長させられる。 |
| `triggers[].allow-cancelled` | Cancel 済みイベントでも走らせるか。 | 競合が多いなら慎重に。 |
| `triggers[].allow-zero-effect` | 効果量 0 でも trigger 成功扱いにするか。 | ログや cooldown の扱いが変わる。 |
| `triggers[].once-per-event` | 同一イベントで 1 回だけ処理するか。 | 多段発動を防ぎたい時に使う。 |
| `triggers[].cooldown-ticks` | 再発動待ち tick。 | proc enchant の暴発防止。 |
| `triggers[].cooldown-scope` | cooldown の共有単位。 | `target` や `source_block` など。 |
| `triggers[].block-types[]` | 対象ブロック条件。 | `tag:ores` のようなタグ指定が使える。 |
| `triggers[].actions[]` | 発動時アクション列。 | 複数 action を順に積める。 |
| `actions[].type` | アクション種別。 | `break_nearby_blocks` `ignite_target` `bonus_damage` など。 |
| `actions[].radius-expression` | 範囲計算式。 | 採掘系 enchant で近傍半径に使う。 |
| `actions[].same-type-only` | 同種ブロックだけに絞るか。 | vein mining の暴走防止。 |
| `actions[].require-correct-tool` | 適正ツールを要求するか。 | バランス維持向き。 |
| `actions[].target-block-types[]` | action 側の対象ブロック。 | trigger 条件より細かく絞れる。 |
| `actions[].ticks-per-level` | 点火など継続時間のレベル係数。 | 状態異常時間を伸ばす。 |
| `actions[].amount-expression` | ダメージや回復の式。 | `double(level)` など Java 式風に書かれている。 |

```yml
triggers:
  - event: attack_entity
    chance-expression: "0.1 + (double(level) * 0.05)"
    cooldown-ticks: 100
    cooldown-scope: target
    actions:
      - type: ignite_target
        ticks-per-level: 50
      - type: bonus_damage
        amount-expression: "3.0 + double(level) * 4"
```

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
