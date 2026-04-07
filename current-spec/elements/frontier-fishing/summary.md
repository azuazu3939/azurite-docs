# フロンティア・遠征・釣り戦闘

Iolite worldgen、遠征契約、Quest Catalog、釣り池 archetype、魚種と竿戦闘をまとめる要素です。

## 現行仕様
- Frontier が有効な role でだけ NMS runtime を立て、world generator / biome provider を供給します。
- `quests/frontier/*.yml` を読んで遠征契約へ変換し、`ExpeditionService` がフェーズ進行と報酬を担当します。
- 釣り戦闘は `fishing-content.yml` に settings、pond-archetypes、rods、species を持ちます。

## 主なファイル
- `core/src/main/resources/quests/frontier/frontier.yml`
- `core/src/main/resources/fishing-content.yml`
- `nms/src/main/resources/generator/*.yml`

## 更新メモ
- route、profession access、quest 条件を別々に変えない。
- 報酬変更は economy と campaign にも効く。
- 池 archetype 名を変えると既存 world 側と切れやすい。

## 関連
- [編集例](./examples.md)
- [Wiki](./wiki.md)
