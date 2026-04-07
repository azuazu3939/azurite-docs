# 経済・コマース

Vault、共有倉庫、ドロップ倉庫、直売、マーケット、Trade Shop を扱う要素です。

## 現行仕様
- `EconomyRepository` の初期化に失敗すると runtime 自体を立てません。
- 共有倉庫とドロップ倉庫は別コンテナですが、受取処理と ledger は共通です。
- Trade Shop、Market Board、Direct Sell、Storage GUI は同一 runtime 内で連携します。

## 主なファイル
- `core/src/main/kotlin/com/github/azuazu3939/azuriter/core/economy/EconomyRuntime.kt`
- `core/src/main/resources/plugin.yml` の commerce 系コマンド定義

## 更新メモ
- 価格変更は直売だけでなくマーケット体感にも効く。
- 倉庫系変更は配送や受取導線に波及する。
- コード主導要素なので概念整理を先にする。

## 関連
- [編集例](./examples.md)
- [Wiki](./wiki.md)
