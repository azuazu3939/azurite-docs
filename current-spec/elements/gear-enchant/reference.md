# 仮想ロア・カスタムエンチャント の設定項目

仮想ロアと独自エンチャントを触るときの参照先をまとめます。現行実装では Item Level / Gear Score 用の独立 YAML はなく、表示の合成は `ItemLoreOverlayService` 側で行います。

> [!TIP]
> 見た目を変えたい時は仮想ロア service、効果を変えたい時は `enchants/*.yml` を見ると迷いにくいです。

## `config.yml` のエンチャント共通設定

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `mythicmobs.custom-enchants` | 独自エンチャント連携の ON/OFF。 | 切ると `enchants/*.yml` の読込も意味を失う。 |
| `gui.title` | エンチャント GUI タイトル。 | MiniMessage 風の装飾を含められる。 |
| `gui.offers-per-roll` | 1 回の抽選で出す候補数。 | 多いほど厳選しやすい。 |
| `gui.reroll-level-cost` | 再抽選のレベルコスト。 | 低すぎると期待値が上がりやすい。 |
| `disabled-vanilla-enchantments[]` | 完全無効にするバニラ enchant。 | 独自環境で役割が被るものを切る。 |
| `gated-vanilla-enchantments[]` | 使えるが制限対象にするバニラ enchant。 | 段階解放や別導線に回したい時向き。 |

## 仮想ロア表示の現行実装メモ

| 項目 | 役割 | 変更時の見方 |
| --- | --- | --- |
| `ItemLoreOverlayService` | 採集 / 鍛造情報を 1 つの仮想ロアへ合成する。 | 表示順や結合条件を変える時の入口。 |
| `LEGACY_ITEM_EVALUATION_PREFIXES` | 旧 Item Level / Gear Score 行を除去する。 | 既存アイテムの二重表示防止用。 |
| `VirtualLoreSections.join / replaceTail` | 各 section を空行区切りで結合し、既存末尾を差し替える。 | section の順序を変える時は見た目全体を確認する。 |
| `buildSellValueLines` | 現在は常に空で、売却価値 PacketLore を出さない。 | 再導入時は economy 側との整合を確認する。 |

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
| `unlock.required-unlock-ids[]` | 既存 unlock-id ベースの解放条件。 | gathering の累計 milestone などと接続できる。 |
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
