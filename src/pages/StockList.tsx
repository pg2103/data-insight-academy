import { Link } from "react-router-dom";
import type { Stock } from "../data/stockData";
import { TOP_STOCKS } from "../data/stockData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";

export default function StockList() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/60 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Top 10 Indian Companies</h1>
            <p className="text-muted-foreground">
              Explore company details, sectors, and financials
            </p>
          </div>
        </div>

        {/* Stock Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {TOP_STOCKS.map((stock: Stock) => (
            <Card
              key={stock.slug}
              className="shadow-card hover:shadow-elegant transition-all duration-300 group"
            >
              <Link to={`/stocks/${stock.slug}`} className="block h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {stock.name}{" "}
                        <span className="text-muted-foreground">({stock.symbol})</span>
                      </CardTitle>
                      {stock.description && (
                        <CardDescription className="mt-1">
                          {stock.description}
                        </CardDescription>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs bg-primary/5 border-primary/20 text-primary"
                    >
                      {stock.sector}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    CEO: {stock.keyExecutives?.ceo || "N/A"} | Founded: {stock.foundedYear || "N/A"}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
