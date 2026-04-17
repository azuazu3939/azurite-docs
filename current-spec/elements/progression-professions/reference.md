# 成長・クラス・専門職 の設定項目

`level`、`mana`、`class.yml`、`tree.yml`、`professions.yml` を横断して、成長まわりの YAML を読むためのページです。

> [!TIP]
> まず `config.yml` の共通式を決めてから、`class.yml` でクラス個性、`tree.yml` で報酬段差、`professions.yml` で生活導線を足すと破綻しにくいです。

このページでは、可変のキー名を `[class-key]` や `[profession-id]` のように表記します。

## `config.yml` の進行共通設定

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `commands.shortcut-class` | `/class` 系ショートカット導線を有効にする。 | クラス切替の入口を軽くしたいときに触る。 |
| `mythicmobs.progression` | MythicMobs 連携の成長処理を使うか。 | 外部連携を止めると class exp 付与系の導線も止まる。 |
| `level.max-level` | グローバルレベル上限。 | クラス上限や報酬設計より低い値にしない。 |
| `level.formula` | グローバルレベル必要経験値の式。 | `level` 変数を使う。伸びを変えると全体の育成速度が変わる。 |
| `attributes.global.*` | 全プレイヤー共通の基礎 Attribute 加算。 | クラス別ではなく全員に乗る土台。 |
| `mana.default-key` | クラス別ボーナスが無いときの基準キー。 | `class:default` を変えると未設定クラスの扱いが変わる。 |
| `mana.base.max` | 基礎最大マナ。 | クラスボーナスより先に効く母数。 |
| `mana.base.regen-per-sec` | 基礎毎秒回復。 | 戦闘外だけでなく鍛造テンポにも影響する。 |
| `mana.combat.stop-regen-in-combat` | 戦闘中に通常回復を止めるか。 | PvE の粘りやすさを大きく変える。 |
| `mana.combat.calm-seconds` | 戦闘解除扱いまでの秒数。 | 長いほど回復復帰が遅い。 |
| `mana.combat.out-of-combat-percent-per-sec` | 戦闘外の割合回復。 | 高すぎると基礎 regen よりこちらが支配的になる。 |
| `mana.saturation-heal.enabled` | 満腹回復と連動したマナ補助を使うか。 | サバイバル寄りの運用を残したいとき向き。 |
| `mana.saturation-heal.percent` | 1 回の補助回復量。 | `max` に対する割合。 |
| `mana.saturation-heal.max-triggers` | 短時間に許す補助回復回数。 | 高いと実質無限回復に寄りやすい。 |
| `mana.saturation-heal.cooldown-seconds` | 補助回復の再発火待ち。 | burst 回復を抑えたいときに効く。 |
| `mana.bonus-poll-seconds` | ボーナス再集計の間隔。 | 短いほど即時反映だが負荷は増える。 |
| `mana.bossbar.enabled` | マナ BossBar を出すか。 | UI ノイズを減らしたいときはここ。 |
| `mana.bossbar.title` | BossBar 表示文字列。 | `{current}` `{max}` `{percent}` を使う。 |
| `mana.bossbar.color` | BossBar の色。 | Minecraft の BossBar enum 準拠。 |
| `mana.bossbar.style` | BossBar の分割スタイル。 | `SEGMENTED_10` など。 |
| `mana.bonuses.class:[class-key].max` | そのクラス専用の最大マナ加算。 | クラス個性を作る基本値。 |
| `mana.bonuses.class:[class-key].regen-per-sec` | そのクラス専用の毎秒回復加算。 | 継戦能力の差を作る。 |
| `exp-actionbar.enabled` | 経験値 ActionBar 表示。 | レベルアップの手応えを UI で見せたいときに使う。 |
| `exp-actionbar.window-millis` | まとめ表示の保持時間。 | 長いと読みやすいが重なりやすい。 |
| `exp-actionbar.interval-ticks` | 再描画間隔。 | 短くしすぎると更新が細かくなる。 |
| `backup.include-mana` | バックアップにマナ情報を含めるか。 | 本番 restore でマナを戻したいなら `true`。 |
| `backup.include-class-levels` | バックアップにクラスレベルを含めるか。 | ツリー報酬復元可否に直結する。 |

```yml
level:
  max-level: 50
  formula: "100 * level + (level + 2) * (3 * level + 4) * (5 * level + 6)"

mana:
  bonuses:
    class:knight:
      max: 100
      regen-per-sec: 1
```

## `classes/*/class.yml` のクラス定義

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `name` | GUI やメッセージに出るクラス名。 | 色コード込みで保存される。 |
| `formula` | そのクラス専用の必要経験値式。 | 未指定相当の設計にしたいときは共通式へ寄せる。 |
| `max-level` | クラス上限。 | `tree.yml` の最高報酬段と揃える。 |
| `attributes.[ATTRIBUTE]` | クラスに常時乗る加算補正。 | Bukkit の Attribute 名をそのまま使う。 |
| `effects.level-up.messages[]` | レベルアップ時メッセージ。 | `{player}` `{class}` `{level}` などが使える。 |
| `effects.level-up.sounds[]` | レベルアップ時の効果音。 | `sound` `volume` `pitch` `delay` を持つ。 |
| `effects.gui-click.*` | GUI でクラス選択した時の演出。 | 切替体験の軽さを調整する。 |
| `effects.gui-locked.*` | 未解放クリック時の演出。 | unlock 条件を伝えたいときに有効。 |
| `effects.gui-shift-click.*` | Shift 操作時の演出。 | サブ動作のフィードバック用。 |
| `effects.skill-tree-click.*` | スキルツリーを開いた時の演出。 | ツリー導線の手触りを揃える。 |

## `classes/*/tree.yml` のスキルツリー定義

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `meta.name` | ツリー画面の表示名。 | `class.yml` の `name` と揃えると混乱しにくい。 |
| `meta.icon` | ツリーの代表アイコン。 | Material 名で指定する。 |
| `meta.tree-version` | ツリー世代。 | 既存プレイヤー報酬の再適用判断に使う前提で扱う。 |
| `help.material` | ヘルプ枠の見た目。 | 本のままにすると説明枠とわかりやすい。 |
| `help.name` | ヘルプ枠タイトル。 | 何で class exp を得るかを短く書く。 |
| `help.lore[]` | ヘルプ本文。 | 1 行ずつ追加できる。 |
| `layout[]` | パネル配置テンプレート。 | `P` の位置がレベルノード候補。 |
| `panel-order[]` | 開放順インデックス。 | ルート順を変えたいときに触る。 |
| `panel-states.unlocked/next/locked.material` | 背景パネル素材。 | 視認性調整用。 |
| `levels.[level].panel.lore[]` | そのレベルの報酬表示文。 | 実際の `rewards` と必ず揃える。 |
| `levels.[level].rewards[]` | レベル到達時の報酬配列。 | 複数報酬を並べられる。 |
| `rewards[].type` | 報酬種別。 | `mana_max` `mana_regen` `attribute` `permission` `command` `item` など。 |
| `rewards[].amount` | 数値系報酬の加算量。 | `type` によって意味が変わる。 |
| `rewards[].target` | 反映先。 | `global` か `class`。未指定は実装既定値を見る。 |
| `rewards[].key` | Attribute 報酬のキー。 | Bukkit の enum 名を使う。 |
| `rewards[].node` | Permission 報酬のノード。 | 解放タグではなく権限を直接付与したい時。 |
| `rewards[].run` | command 報酬の実行内容。 | プレースホルダ展開を前提に短く保つ。 |
| `rewards[].replay` | 再適用を許すか。 | 既存プレイヤー補填と相性が良い。 |

## `professions.yml` の専門職定義

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `config-version` | 専門職設定の版番号。 | migrate 時の分岐用。 |
| `enabled` | 専門職システム全体の ON/OFF。 | 切ると採集・鍛造 unlock 導線も弱くなる。 |
| `professions.[profession-id].display-name` | 表示名。 | GUI やメッセージで使う。 |
| `professions.[profession-id].icon` | 専門職アイコン。 | Material 名。 |
| `professions.[profession-id].formula` | 専門職経験値式。 | 収穫職だけ軽くするなど差別化できる。 |
| `professions.[profession-id].max-level` | その職の上限。 | milestone 最終段と整合させる。 |
| `professions.[profession-id].telemetry-tags[]` | 分析・分類タグ。 | route や resource 系タグで集計を揃える。 |
| `professions.[profession-id].milestones.[level].notes[]` | 画面や説明に見せる補足文。 | プレイヤー向け説明用。 |
| `professions.[profession-id].milestones.[level].access-tags[]` | 到達で付く access tag。 | Frontier や Forge の解放条件に直結する。 |
| `professions.[profession-id].milestones.[level].yield-bonus` | 収量補正。 | 採集や制作の期待値を上げる。 |
| `professions.[profession-id].milestones.[level].speed-bonus` | 速度補正。 | 周回テンポを変える。 |
| `professions.[profession-id].milestones.[level].grant-permissions[]` | 到達で付ける権限。 | `forge.access` のような入口解放に使う。 |

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
