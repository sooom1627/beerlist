# GitHub Actions ワークフロー

このディレクトリには、CI/CDパイプラインを定義するGitHub Actionsワークフローが含まれています。

## ワークフロー一覧

### 1. Test (`test.yml`)

**トリガー:**
- Pull Requestが作成/更新された時（main, master, develop ブランチ向け）
- main, master, develop ブランチへのpush時

**実行内容:**
- 依存関係のインストール（pnpm）
- テストの実行（`pnpm test run`）

### 2. CI (`ci.yml`)

**トリガー:**
- Pull Requestが作成/更新された時（main, master, develop ブランチ向け）
- main, master, develop ブランチへのpush時

**実行内容:**
- 依存関係のインストール（pnpm）
- ESLintの実行（`pnpm lint`）
- プロジェクトのビルド（`pnpm build`）

## セットアップ

### 必要な設定

1. **ブランチ保護ルール（推奨）**
   - Settings > Branches > Branch protection rules
   - `main`または`master`ブランチに以下を設定：
     - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging
     - 必須ステータスチェック: `Run Tests`, `Lint and Build`

## ローカルでの確認

ワークフローで実行されるコマンドをローカルで確認できます：

```bash
# テストの実行
pnpm test run

# Lintの実行
pnpm lint

# ビルドの確認
pnpm build
```

## トラブルシューティング

### テストが失敗する場合
1. ローカルで `pnpm test run` を実行して確認
2. テストログを確認してエラーを特定
3. 修正後、再度PRを更新

### ビルドが失敗する場合
1. ローカルで `pnpm build` を実行して確認
2. TypeScriptエラーがないか確認
3. 環境変数が必要な場合は、`.env.example`を確認

### pnpmのバージョン問題
- ワークフローでは pnpm v10 を使用
- ローカルのpnpmバージョンと異なる場合は、`package.json`の`packageManager`フィールドを確認
