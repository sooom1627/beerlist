# GitHub Actions ワークフロー

このディレクトリには、CIパイプラインを定義するGitHub Actionsワークフローが含まれています。

## ワークフロー

### CI (`test.yml`)

**トリガー:**
- Pull Requestが作成/更新された時（main, master, develop ブランチ向け）
- main, master, develop ブランチへのpush時

**実行内容:**
- 依存関係のインストール（pnpm）
- ESLintの実行（`pnpm lint`）
- テストの実行（`pnpm test run`）

※ ビルドはVercelが自動実行するため、GitHub Actionsでは実行しない

## セットアップ

### ブランチ保護ルール（推奨）

- Settings > Branches > Branch protection rules
- `main`または`master`ブランチに以下を設定：
  - ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
  - 必須ステータスチェック: `Test and Lint`

## ローカルでの確認

```bash
# Lintの実行
pnpm lint

# テストの実行
pnpm test run
```

## トラブルシューティング

### テストが失敗する場合
1. ローカルで `pnpm test run` を実行して確認
2. テストログを確認してエラーを特定
3. 修正後、再度PRを更新

### Lintが失敗する場合
1. ローカルで `pnpm lint` を実行して確認
2. ESLintエラーを修正
3. `pnpm lint --fix` で自動修正可能なものは修正

### pnpmのバージョン問題
- ワークフローでは pnpm v10 を使用
- ローカルのpnpmバージョンと異なる場合は、`package.json`の`packageManager`フィールドを確認
