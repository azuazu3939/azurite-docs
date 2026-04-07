# 鍛造 の設定項目

鍛造は YAML が多い要素です。`forge.yml` が入口、`forge-content.yml` が素材と報酬、`forge-actions.yml` が手番、`forge-balance.yml` が最終換算という見方をすると追いやすいです。

> [!TIP]
> 体感を変えたい時は `forge-actions.yml`、価値を変えたい時は `forge-balance.yml`、入口や研究段階を変えたい時は `forge.yml` から読むと迷いません。

このページでは、可変のキー名を `[alloy-id]` や `[action-id]` のように表記します。

## `forge.yml` の基礎設定

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `config-version` | 設定版番号。 | migrate 前提の番号。 |
| `enabled` | 鍛造 runtime の ON/OFF。 | 切ると全導線が止まる。 |
| `strict-click-protection` | GUI 誤操作保護を強めるか。 | 不正クリック対策寄り。 |
| `logistics.enabled` | 物流システムを使うか。 | delivery 導線まで止めたい時だけ切る。 |
| `logistics.allowed-worlds[]` | 物流を許すワールド。 | frontier 側だけで動かすかを決める。 |
| `files.content` | 内容定義ファイルへのパス。 | 分割先を差し替える時に使う。 |
| `files.balance` | 最終計算ファイルへのパス。 | balance 別案を切る時向き。 |
| `files.actions` | 行動定義ファイルへのパス。 | action セット差し替え用。 |
| `files.message-ja` / `files.message-en` | メッセージ定義。 | 文言だけ差し替えたい時。 |
| `access.open-on-interact` | ブロック右クリックで開くか。 | コマンド導線主体にしたいなら `false`。 |
| `access.interact-blocks[]` | 開けるブロック種別。 | 入口の見た目を変える時に触る。 |
| `sounds.[sound-kind].sound` | 各場面のサウンド ID。 | `open` `select` `progress` `result` `error` を持つ。 |
| `sounds.[sound-kind].volume` | 音量。 | 小さめにすると UI っぽくなる。 |
| `sounds.[sound-kind].pitch` | 音程。 | 成功・失敗の印象を分ける。 |
| `purity.min` | 完成品 purity 下限。 | 低品質側の床。 |
| `purity.max` | 完成品 purity 上限。 | masterwork 上限と噛み合う。 |
| `purity.reforge-max` | 再鍛造時の purity 上限。 | 作り直しでの青天井化を防ぐ。 |
| `super-quality.tier-thresholds[]` | 超品質 tier のしきい値。 | delivery 要件や倍率と合わせて変える。 |
| `super-quality.tier-multipliers[]` | tier ごとの倍率。 | 高 tier 報酬の跳ね方を決める。 |
| `super-quality.decay-bands[]` | 品質帯ごとの減衰。 | 終盤の伸びすぎ抑制に使う。 |
| `super-quality.delivery-requirements.[score-threshold]` | その tier に必要な納品量。 | 長期導線に効く。 |
| `quality-ranks.*-max` | 品質ランクの上限値。 | RUINED から MASTERWORK までの境界。 |
| `quality-effects.[quality-rank].beneficial-scale` | 良性ステータスの倍率。 | 高品質でどれだけ盛るか。 |
| `quality-effects.[quality-rank].detrimental-scale` | 悪性ステータスの倍率。 | 低品質ペナルティの強さ。 |
| `quality-effects.[quality-rank].gear-score-bonus` | Gear Score 補正。 | 装備評価へ直結する。 |
| `quality-effects.[quality-rank].item-level-bonus` | Item Level 補正。 | 見た目の強さ表示に効く。 |
| `quality-effects.[quality-rank].durability-multiplier` | 耐久倍率。 | 低品質の消耗しやすさを決める。 |

## `forge.yml` の工程・施設設定

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `stages.heat.underheat/optimal/overheat.*` | 加熱結果ごとの stat 変化。 | purity/hardness/toughness の初期差になる。 |
| `stages.heat.catalysts.<band>.*` | 加熱帯別の触媒候補。 | `material` `amount` `return-material` を持てる。 |
| `stages.hammer.miss/good/perfect.*` | 打鍛結果ごとの差分。 | perfect の伸びを上げると熟練差が出やすい。 |
| `stages.fold.minimum` / `maximum` | 推奨 fold 下限 / 上限。 | 合金ごとの recommended と組み合わせて使う。 |
| `stages.fold.overfold-offset` | overfold 扱い開始オフセット。 | 欲張りペナルティの境目。 |
| `stages.fold.none/intermediate/recommended/overfold.*` | fold 回数帯ごとの stat 変化。 | toughness と hardness の増え方を決める。 |
| `stages.quench.preferred-bonus` | 推奨焼き入れの bonus。 | 合金の個性を出す中心値。 |
| `stages.quench.fallback-bonus` | 非推奨焼き入れ時 bonus。 | ハズレ時の救済。 |
| `stages.quench.catalysts.[quench-type].*` | 焼き入れ触媒。 | `water` `oil` `magic` などの種別ごと。 |
| `stages.polish.fail/success/critical.purity` | 研磨結果の purity 差分。 | 終盤の詰め幅。 |
| `facility.tiers.[tier].point-cost` | 施設 tier 開放に要る point。 | 研究導線とセットで調整する。 |
| `facility.tiers.[tier].purity-bonus` | 施設 tier による purity 加点。 | ベース品質底上げ用。 |
| `facility.tiers.[tier].research-multiplier` | 研究効率倍率。 | 長期進行速度に効く。 |
| `facility.tiers.[tier].reforge-purity-bonus` | 再鍛造時 purity 加点。 | 再挑戦価値を上げる。 |
| `facility.tiers.[tier].research-requirements.*` | tier 開放に必要な研究値。 | `logistics` `metallurgy` `relics` のようなトラック名で指定。 |
| `research.tracks.labels.*` | 研究トラック名の表示ラベル。 | UI 文言用。 |
| `research.quality-values.[quality-rank]` | 品質ランクから研究値へ換算する点数。 | 高品質クラフトの研究価値を決める。 |
| `trade.quality-points.[quality-rank]` | 品質ランクから trade point へ換算する点数。 | 取引価値に効く。 |

## `forge-content.yml` の Trade・納品・研究素材

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `trade.offers.[offer-id].icon` | Offer 表示アイコン。 | GUI 視認性用。 |
| `trade.offers.[offer-id].price` | 交換コスト。 | 物流 point 経済の重さを決める。 |
| `trade.offers.[offer-id].required-facility-tier` | 購入に必要な施設 tier。 | 終盤素材の早取り防止。 |
| `trade.offers.[offer-id].description` | Offer 説明文。 | 何の素材かを短く書く。 |
| `trade.offers.[offer-id].result.material/mmid/amount` | 交換結果。 | Vanilla 素材と Mythic item の両方を持てる。 |
| `trade.npcs.[npc-id].title` | NPC 側の表示名。 | Trade 画面見出しに使う。 |
| `trade.npcs.[npc-id].mmids[]` | 紐づく NPC MMID 群。 | 同一 trade を複数 NPC へ配る時に使う。 |
| `trade.npcs.[npc-id].extra-offers.*` | NPC 専用追加 offer。 | 共通 offer と分けたい終盤商品向け。 |
| `delivery.entries.[delivery-id].label` | 納品名。 | questboard 風の見出し。 |
| `delivery.entries.[delivery-id].description` | 納品の趣旨。 | 世界観説明と用途を兼ねる。 |
| `delivery.entries.[delivery-id].requirements[]` | 必要資材。 | `material` または `mmid` と `amount` を持つ。 |
| `delivery.entries.[delivery-id].reward.forge-points` | 納品で得る forge point。 | 施設開放や trade に使う基礎通貨。 |
| `delivery.entries.[delivery-id].reward.research.*` | 合金研究の直接報酬。 | `alloy-id` と `amount` を指定。 |
| `delivery.entries.[delivery-id].reward.research-tracks.*` | トラック別研究値。 | 物流 / 冶金 / 遺構を伸ばす。 |
| `delivery.entries.[delivery-id].reward.rewards[]` | アイテム報酬。 | `material` / `mmid` / `amount` を持つ。 |
| `delivery.entries.[delivery-id].reward.campaign-rewards[]` | campaign 側報酬。 | `campaign-id` `community-points` `campaign-tokens` を持つ。 |
| `admin.presets.[preset-id]` | 管理用の即席完成品 preset。 | `alloy-id` `equipment-type` `purity` `source` を持つ。 |

## `forge-content.yml` の品質軸・装備種別・合金

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `quality.defaults.channels[]` | 標準で使う品質チャンネル。 | channel を増やすと UI と閾値も見直す。 |
| `quality-channels.[channel-id].label` | チャンネル表示名。 | UI 向け。 |
| `quality-channels.[channel-id].stat` | 対応する内部 stat。 | `hardness` など。 |
| `quality-threshold-profiles.[profile-id]` | 装備種別が使う閾値セット。 | 装備ごとの差分を profile 化する。 |
| `equipment-types.[equipment-type-id].label` | 装備種別名。 | 剣・防具・ツール単位。 |
| `equipment-types.[equipment-type-id].material` | 完成品 Material。 | 見た目の基礎。 |
| `equipment-types.[equipment-type-id].slot` | 装備スロット。 | balance 適用先の分岐に効く。 |
| `equipment-types.[equipment-type-id].gathering-profile` | 採集用プロファイル名。 | ツール専用。 |
| `equipment-types.[equipment-type-id].target-progress` | 必要 progress 目標値。 | 工程の長さ。 |
| `equipment-types.[equipment-type-id].base-durability` | 基礎耐久。 | 品質補正の母数。 |
| `equipment-types.[equipment-type-id].item-durability-base` | 表示用耐久基準。 | lore 表示との整合を見る。 |
| `equipment-types.[equipment-type-id].base-item-level` | 基礎 Item Level。 | quality bonus 前の土台。 |
| `equipment-types.[equipment-type-id].required-craft-power/control/stability/focus` | 必要ステータス。 | 終盤装備ほど値が高い。 |
| `equipment-types.[equipment-type-id].quality-channels[]` | その装備で使う品質軸。 | 武器と防具で見せ方を変えられる。 |
| `equipment-types.[equipment-type-id].quality-threshold-profile` | 使う閾値 profile。 | rank 判定を装備別に分ける入口。 |
| `equipment-types.[equipment-type-id].recipe.*` | 基本レシピ素材。 | `primary-material` `primary-amount` `secondary-materials[]` を持つ。 |
| `alloys.[alloy-id].display-name` | 合金表示名。 | research / craft 両方で見える。 |
| `alloys.[alloy-id].tier` | 合金 tier。 | 施設 tier や unlock 段階と整合を取る。 |
| `alloys.[alloy-id].starting-unlocked` | 初期解放か。 | 新規プレイヤー導線用。 |
| `alloys.[alloy-id].preferred-quench` | 推奨焼き入れ種別。 | `water` `oil` `magic` など。 |
| `alloys.[alloy-id].recommended-folds` | 推奨 fold 回数。 | `stages.fold` と一緒に読む。 |
| `alloys.[alloy-id].research-exp-required` | 研究解放に必要な exp。 | 納品テンポとセットで調整。 |
| `alloys.[alloy-id].recycle-*` | リサイクル返却素材。 | 廃棄コストの重さを変える。 |
| `alloys.[alloy-id].forge-material-*` | 主素材定義。 | `mmid` と `material` を必要に応じて使い分ける。 |
| `alloys.[alloy-id].secondary-materials[]` | 副素材群。 | 触媒や補助素材を足す場所。 |
| `alloys.[alloy-id].trait-summary` | 合金説明要約。 | UI 説明用。 |
| `alloys.[alloy-id].trade-bonus-points` | trade 上の価値補正。 | 経済面の差別化。 |
| `alloys.[alloy-id].equipment-types[]` | 対応装備種別。 | 使える武具カテゴリ制限。 |
| `alloys.[alloy-id].unlock.*` | 解放条件群。 | profession / player level / campaign / contract / server project をまとめて持てる。 |
| `alloys.[alloy-id].stats.*` | 合金の品質軸ステータス。 | `purity` `hardness` `toughness` `mana-conductivity` `elemental-affinity` `weight` など。 |

## `forge-actions.yml` と `forge-balance.yml`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `actions.[action-id].label` | UI 上の行動名。 | 手番での印象を決める。 |
| `actions.[action-id].description` | 行動説明。 | 何が伸びて何を失うかを短く書く。 |
| `actions.[action-id].stage` | 行動を出す工程。 | `HEAT` `HAMMER` `FOLD` など。 |
| `actions.[action-id].category` | 行動分類。 | `PROGRESS` `QUALITY` `GAMBLE` など。 |
| `actions.[action-id].page` | GUI ページ分け用の補助キー。 | 行動数が増えた時に使う。 |
| `actions.[action-id].permission` | 使用権限。 | GM 行動や限定行動の制御用。 |
| `actions.[action-id].material` | ボタン表示や消費の主素材。 | 触媒と見分けて使う。 |
| `actions.[action-id].catalyst.*` | 追加消費触媒。 | `material` / `mmid` / `amount` を持てる。 |
| `actions.[action-id].progress-gain` | 基礎 progress 増加。 | 工程速度そのもの。 |
| `actions.[action-id].quality-gain` | 基礎 quality 増加。 | 仕上がりの良さ。 |
| `actions.[action-id].durability-cost` | 耐久消費。 | 大技ほど重くなる。 |
| `actions.[action-id].focus-cost` / `focus-gain` | focus の支払い / 回復。 | 手番循環の中心。 |
| `actions.[action-id].success-rate` | 成功率。 | gamble 行動の危険度。 |
| `actions.[action-id].critical-rate` | クリティカル率。 | 上振れ頻度。 |
| `actions.[action-id].critical-progress-multiplier` | crit 時 progress 倍率。 | 大技の伸び幅。 |
| `actions.[action-id].critical-quality-multiplier` | crit 時 quality 倍率。 | 品質特化技向け。 |
| `actions.[action-id].progress-scaling` / `quality-scaling` / `stability-scaling` | プレイヤー能力値からの伸び。 | class bonus や装備との噛み合わせを見る。 |
| `actions.[action-id].combo.*` | 直前行動に応じた bonus。 | ループ手順を作る中心。 |
| `actions.[action-id].unlock.*` | 行動解放条件。 | class level、research alloy、campaign など。 |
| `actions.[action-id].gamble-on-fail-*` | gamble 失敗時の残量補正。 | 全損を避ける緩衝材。 |
| `actions.[action-id].buff.*` | 付与バフ定義。 | 次ターン倍率や regen を持たせられる。 |
| `gameplay.mana.max.*` | 装備化後の最大マナ換算。 | conductivity / purity の価値付け。 |
| `gameplay.mana.regen.*` | 装備化後のマナ regen 換算。 | sustained build 用。 |
| `gameplay.melee.attack.*` | 近接攻撃値換算。 | hardness と mana の寄与を見る。 |
| `gameplay.melee.damage-multiplier.*` | ダメージ倍率換算。 | purity と affinity の伸び幅。 |
| `gameplay.armor.*` | 防具換算。 | toughness / hardness / weight の意味付け。 |
| `gameplay.tool.exp.*` | ツール exp bonus 換算。 | gather 速度の報酬側。 |
| `gameplay.tool.drop.*` | ドロップ bonus 換算。 | 採集のうま味をどこまで載せるか。 |

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
