# レシピ・ストレージ・採集コレクション の設定項目

レシピ制御、採集スタミナ、コレクション進行、地表資源配置を触るときの YAML リファレンスです。

> [!TIP]
> 採集体験は `gathering.yml` だけでは決まりません。制限は `config.yml`、周回テンポは `gathering-stamina.yml`、地形側の供給量は `surface-acquisition.yml` まで見て調整します。

## `config.yml` のレシピ制御・ストレージ制約

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `recipe-controls.accept-database-disabled-recipes` | DB で無効化された recipe を読んでも許容するか。 | 運用での一時停止を優先したい時に使う。 |
| `craft-blocker.enabled` | クラフト禁止ルールを使うか。 | 封鎖運用が必要な時だけ有効にする。 |
| `craft-blocker.bypass-permission` | ブロック無視権限。 | GM や検証用アカウント向け。 |
| `craft-blocker.rules[]` | 禁止ルール配列。 | 現在は空だが、ルール追加前提の入口。 |
| `storage-box.blocked-items[]` | Storage Box に入れない item key。 | 特殊アイテムやヘッドを隔離したい時に使う。 |

## `gathering-stamina.yml` の周回テンポ設定

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `enabled` | スタミナ制御全体の ON/OFF。 | 切ると採集テンポが大きく軽くなる。 |
| `base-max` | 基礎最大スタミナ。 | 長時間採集の許容量。 |
| `base-regen-per-sec` | 基礎毎秒回復。 | 休憩の短さに直結する。 |
| `max-bonus-per-level` | レベル由来の最大スタミナ bonus 上限。 | 育成差の天井。 |
| `regen-bonus-every-levels` | 何レベルごとに regen bonus を足すか。 | 段差を細かくしすぎないための周期。 |
| `idle-recovery-delay-seconds` | 停止後に回復へ戻る待ち時間。 | combat と違い採集テンポの呼吸を決める。 |
| `flush-seconds` | 永続化や反映の flush 間隔。 | 短いほど安全だが I/O は増える。 |
| `relevant-professions[]` | スタミナ恩恵の対象職。 | `all` なら全 profession。 |
| `tool-enchant-modifiers[]` | エンチャントによる消費補正。 | `enchant-id` `mode` `minimum-cost` を持つ。 |

## `gathering.yml` のカテゴリとコレクション

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `enabled` | 採集コレクション全体の ON/OFF。 | 切ると収集進行と解放報酬が止まる。 |
| `notify.mode` | 進捗通知の出し方。 | 現在は `actionbar`。 |
| `categories.<id>.name` | カテゴリ表示名。 | GUI の大分類名。 |
| `categories.<id>.lore[]` | カテゴリ説明。 | 何を集めるカテゴリかを示す。 |
| `categories.<id>.icon.material/mmid` | カテゴリアイコン。 | Mythic item にもできる。 |
| `collections.<id>.profession` | 紐づく専門職。 | bonus 計算や表示の分類軸。 |
| `collections.<id>.display-name` | コレクション名。 | アイテム表示名ベースで良い。 |
| `collections.<id>.lore[]` | 収集対象説明。 | プレイヤー向けヒント。 |
| `collections.<id>.icon.*` | コレクションアイコン。 | Material か MMID。 |
| `collections.<id>.match.type` | 判定方式。 | `material` か `mmid`。 |
| `collections.<id>.match.material/mmid` | 実際に数える対象。 | 入手結果と一致させる。 |
| `collections.<id>.count-sources[]` | カウントする取得元。 | `direct_break` や chest loot を使い分ける。 |
| `collections.<id>.levels.<n>.required` | その段に必要な累計数。 | 周回量の段差。 |
| `collections.<id>.levels.<n>.point` | 段達成で得る point。 | unlock 経済の基本通貨。 |
| `collections.<id>.levels.<n>.recipe-unlocks[]` | 解放 recipe ID。 | Forge 素材や utility を解放できる。 |
| `collections.<id>.levels.<n>.campaign-rewards[]` | campaign 連動報酬。 | 長期進行へ接続したい時に使う。 |

```yml
collections:
  diamond:
    profession: mining
    match:
      type: material
      material: DIAMOND
    levels:
      1:
        required: 16
        point: 4
      2:
        required: 64
        point: 6
        recipe-unlocks: [ "forge/process/moonwell_catalyst" ]
```

## `surface-acquisition.yml` の地表資源配置

`surface-acquisition.yml` は「何がどのバイオームに、どう置かれるか」を決めるファイルです。採集対象数そのものを増減させるので、collection 側の必要数とセットで見ます。

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `schema-version` | 配置定義の版番号。 | 旧 schema と混ぜない目印。 |
| `root-plots.<id>.biomes[]` | 作物プロットを置くバイオーム。 | route の見た目と収穫量に直結する。 |
| `root-plots.<id>.crop-material` | 植える作物。 | collection の対象と合わせる。 |
| `root-plots.<id>.plot-width/depth` | 畑サイズ。 | 1 スポットの密度が変わる。 |
| `root-plots.<id>.border-material` | 畑の縁材。 | 視認性用。 |
| `root-plots.<id>.water-material` | 水路素材。 | 通常は `WATER`。 |
| `root-plots.<id>.placement.*` | プロット配置ノイズ設定。 | `salt` `cell-size` `jitter-blocks` `density-threshold` などで分布を決める。 |
| `reed-banks.<id>.material` | 葦帯の生成素材。 | `SUGAR_CANE` など。 |
| `reed-banks.<id>.cluster-min/max-length` | 群生長さの範囲。 | 川辺の採集量に効く。 |
| `reed-banks.<id>.placement.*` | 水辺条件や傾斜条件。 | `nearby-water-radius` `max-steepness` など。 |
| `fishing-basins.<id>.archetype-id` | 釣り池 archetype への紐付け。 | `fishing-content.yml` と名前を揃える。 |
| `fishing-basins.<id>.shape` | 池形状。 | `rounded-rect` や `blob`。 |
| `fishing-basins.<id>.water-half-width/depth` | 池の大きさ。 | fish の逃げ回りやすさにも効く。 |
| `fishing-basins.<id>.shore-width/shelf-depth/center-depth` | 岸と深さの形状。 | 釣り場の見た目と動線を決める。 |
| `fishing-basins.<id>.placement.*` | 池の生成条件。 | `avoid-farm-overlap` なども含む。 |
| `wildlife-herds.<id>.package-id/rule-id/condition-profile-id` | スポーン系 YAML との接続キー。 | spawn 側ファイルとずらさない。 |
| `wildlife-herds.<id>.count-min/max` | 群れの数。 | route の賑やかさ調整。 |
| `wildlife-herds.<id>.eligibility.*` | 時間・明るさ・距離などの条件。 | 野生動物を採集ループに混ぜる量を決める。 |

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
