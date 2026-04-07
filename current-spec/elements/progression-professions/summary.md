# 成長・クラス・専門職

レベル、クラス、マナ、スキルツリー、専門職 milestone をまとめる要素です。

## 現行仕様
- `config.yml` の `level` と `mana` が共通基礎式で、`classes/<classKey>/class.yml` と `tree.yml` がクラス別定義です。
- 保存は MariaDB 前提で、プロフィール、マナ、クラスレベル、報酬台帳を個別に持ちます。
- `professions.yml` の milestone で access-tag、yield bonus、speed bonus、permission 付与を制御します。

## 主なファイル
- `core/src/main/resources/config.yml`
- `core/src/main/resources/classes/class_knight/class.yml`
- `core/src/main/resources/professions.yml`

## 更新メモ
- クラス報酬変更時は `tree-version` の扱いを決める。
- profession の access-tag は Frontier / Forge へ波及する。
- マナ調整は戦闘や制作体感も変える。

## 関連
- [編集例](./examples.md)
- [Wiki](./wiki.md)
