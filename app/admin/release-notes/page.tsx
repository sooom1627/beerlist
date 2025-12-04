import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitCommit, Sparkles, Wrench, Zap, Tag } from "lucide-react";

type ChangeType = "feature" | "enhancement" | "fix" | "refactor" | "perf";

interface ReleaseItem {
  date: string;
  version?: string;
  changes: {
    type: ChangeType;
    description: string;
  }[];
}

const releaseHistory: ReleaseItem[] = [
  {
    date: "2025-01-27",
    version: "v1.4.3",
    changes: [
      {
        type: "fix",
        description: "セキュリティアップデート：Next.js 16.0.7、React 19.2.1、react-dom 19.2.1へのアップグレードにより、CVE-2025-55182の脆弱性を修正しました。",
      },
      {
        type: "enhancement",
        description: "価格表示の改善：グラスとパイントの価格が0の場合に、お客様画面では、-（ハイフン）を表示するようにしました。管理画面では、そのまま0を表示します。",
      },
    ],
  },
  {
    date: "2025-11-27",
    version: "v1.4.2",
    changes: [
      {
        type: "enhancement",
        description: "ダイアログコンポーネントの改善：レイアウトとレスポンシブ対応を向上させました。",
      },
    ],
  },
  {
    date: "2025-11-27",
    version: "v1.4.1",
    changes: [
      {
        type: "enhancement",
        description: "ナビゲーションの改善：ヘッダーメニューを整理し、アイコン付きのボタンデザインに変更しました。「メニュー画面」と「ビール設定」へのアクセスが容易になりました。",
      },
      {
        type: "feature",
        description: "情報ページの実装：利用規約とリリースノートの閲覧ページを追加し、フッターからアクセスできるようにしました。",
      },
    ],
  },
  {
    date: "2025-11-27",
    version: "v1.4.0",
    changes: [
      {
        type: "feature",
        description: "下書き機能の実装：ビールの情報を下書きとして保存・復元できるようにしました。",
      },
      {
        type: "enhancement",
        description: "管理画面UIの改善：Radix UIコンポーネントの導入により操作性を向上させました。",
      },
    ],
  },
  {
    date: "2025-11-26",
    version: "v1.3.0",
    changes: [
      {
        type: "feature",
        description: "トースト通知の導入：操作結果をユーザーにフィードバックする機能を追加しました。",
      },
      {
        type: "enhancement",
        description: "価格表示の改善：ロケールに基づいた適切な数値フォーマットで表示するようにしました。",
      },
      {
        type: "refactor",
        description: "コードベースのリファクタリング：管理画面とフォームのロジックを整理し、保守性を向上させました。",
      },
      {
        type: "fix",
        description: "CI/CD設定の修正：テスト構成とLint設定を見直しました。",
      },
    ],
  },
  {
    date: "2025-11-25",
    version: "v1.2.0",
    changes: [
      {
        type: "feature",
        description: "「New」バッジ機能：新着ビールを強調表示する機能と管理トグルを追加しました。",
      },
      {
        type: "enhancement",
        description: "スロットカードUIの改善：配置と空白の調整、更新アクションのアイコン追加を行いました。",
      },
    ],
  },
  {
    date: "2025-11-23",
    version: "v1.1.1",
    changes: [
      {
        type: "perf",
        description: "パフォーマンス最適化：AnalyticsとSpeedInsightsの読み込みを改善しました。",
      },
      {
        type: "fix",
        description: "レイアウト修正：不要なSuspenseラッパーを削除し、構造を簡素化しました。",
      },
    ],
  },
];

const getTypeIcon = (type: ChangeType) => {
  switch (type) {
    case "feature":
      return <Sparkles className="h-4 w-4 text-yellow-500" />;
    case "enhancement":
      return <Zap className="h-4 w-4 text-blue-500" />;
    case "fix":
      return <Wrench className="h-4 w-4 text-red-500" />;
    case "refactor":
      return <GitCommit className="h-4 w-4 text-slate-500" />;
    case "perf":
      return <Zap className="h-4 w-4 text-green-500" />;
    default:
      return <Tag className="h-4 w-4 text-gray-500" />;
  }
};

const getTypeLabel = (type: ChangeType) => {
  switch (type) {
    case "feature":
      return "New Feature";
    case "enhancement":
      return "Enhancement";
    case "fix":
      return "Bug Fix";
    case "refactor":
      return "Refactoring";
    case "perf":
      return "Performance";
    default:
      return "Change";
  }
};

const getTypeColor = (type: ChangeType) => {
  switch (type) {
    case "feature":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    case "enhancement":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "fix":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    case "refactor":
      return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    case "perf":
      return "bg-green-500/10 text-green-600 border-green-500/20";
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20";
  }
};

export default function ReleaseNotesPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-6 pb-12 max-w-4xl mx-auto">
      <div className="w-full space-y-2">
        <h1 className="font-bold text-3xl tracking-tight">リリースノート</h1>
        <p className="text-muted-foreground">
          BeerListアプリケーションの更新履歴と改善内容
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-250px)] pr-4">
        <div className="relative border-l border-muted ml-4 space-y-12 pb-10">
          {releaseHistory.map((item, index) => (
            <div key={index} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground font-mono">
                    {item.date}
                  </span>
                  {item.version && (
                    <Badge variant="outline" className="font-mono">
                      {item.version}
                    </Badge>
                  )}
                </div>

                <Card className="border-none shadow-sm bg-card/50">
                  <CardContent className="pt-6 grid gap-4">
                    {item.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className="flex gap-4 items-start group">
                        <div className="mt-0.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                          {getTypeIcon(change.type)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="secondary" 
                              className={`text-[10px] px-1.5 py-0 h-5 font-normal border ${getTypeColor(change.type)} bg-transparent`}
                            >
                              {getTypeLabel(change.type)}
                            </Badge>
                          </div>
                          <p className="text-sm leading-relaxed text-foreground/90">
                            {change.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
