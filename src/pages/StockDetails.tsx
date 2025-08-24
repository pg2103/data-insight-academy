import { useParams, Link } from "react-router-dom";
import { getStockBySlug } from "../data/stockData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building2, LineChart, Newspaper } from "lucide-react";

type RowProps = {
  label: string;
  value?: string | number;
};

function Row({ label, value }: RowProps) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="font-medium text-foreground">{label}</span>
      <span className="text-muted-foreground">{value ?? "—"}</span>
    </div>
  );
}

export default function StockDetails() {
  const { slug } = useParams();
  const stock = slug ? getStockBySlug(slug) : undefined;

  if (!stock) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Stock not found.</p>
          <Link
            to="/stocks"
            className="inline-flex items-center text-primary hover:underline mt-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to list
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/60 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{stock.name}</h1>
            <p className="text-sm text-muted-foreground">
              {stock.symbol} • {stock.sector}
            </p>
          </div>
        </div>

        {/* Company Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Row label="Headquarters" value={stock.headquarters} />
            <Row
              label="Website"
              value={
                stock.website ? (
                  <a
                    href={stock.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    {stock.website}
                  </a>
                ) : undefined
              }
            />
            <Row label="Founded" value={stock.foundedYear} />
            <Row label="BSE Code" value={stock.bseCode} />
            <Row label="ISIN" value={stock.isin} />
          </CardContent>
        </Card>

        {/* Key Executives */}
        <Card>
          <CardHeader>
            <CardTitle>Key Executives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Row label="CEO" value={stock.keyExecutives?.ceo} />
            <Row label="Managing Director" value={stock.keyExecutives?.md} />
            <Row label="Chairperson" value={stock.keyExecutives?.chairperson} />
          </CardContent>
        </Card>

        {/* Shareholding Pattern */}
        <Card>
          <CardHeader>
            <CardTitle>Shareholding Pattern</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Row label="Promoters (%)" value={stock.shareholdingPattern?.promoters} />
            <Row label="FII (%)" value={stock.shareholdingPattern?.fii} />
            <Row label="DII (%)" value={stock.shareholdingPattern?.dii} />
            <Row label="Public (%)" value={stock.shareholdingPattern?.public} />
            <Row label="Govt (%)" value={stock.shareholdingPattern?.govt} />
            <Row label="As of" value={stock.shareholdingPattern?.asOf} />
          </CardContent>
        </Card>

        {/* Financials */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <LineChart className="w-4 h-4 mr-2 text-primary" /> Financials (Snapshot)
            </CardTitle>
            {stock.financials?.lastFY && (
              <Badge variant="secondary">{stock.financials.lastFY}</Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-2">
            <Row label="Revenue (₹ Cr)" value={stock.financials?.revenueCr} />
            <Row label="Net Profit (₹ Cr)" value={stock.financials?.netProfitCr} />
            <Row label="EPS (₹)" value={stock.financials?.eps} />
            <Row label="ROE (%)" value={stock.financials?.roePct} />
            <Row label="PAT Margin (%)" value={stock.financials?.patMarginPct} />
          </CardContent>
        </Card>

        {/* News */}
        {stock.news && stock.news.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Newspaper className="w-4 h-4 mr-2 text-primary" /> Recent News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {stock.news.map((n, idx) => (
                  <li key={idx}>
                    {n.url ? (
                      <a
                        href={n.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline"
                      >
                        {n.title}
                      </a>
                    ) : (
                      <span>{n.title}</span>
                    )}
                    {n.publishedAt && (
                      <span className="text-xs text-muted-foreground ml-1">
                        — {n.publishedAt}
                      </span>
                    )}
                    {n.source && (
                      <span className="text-xs text-muted-foreground ml-1">
                        • {n.source}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-xs text-muted-foreground text-right">
          Last updated: {stock.lastUpdated || "—"}
        </div>
      </div>
    </div>
  );
}
