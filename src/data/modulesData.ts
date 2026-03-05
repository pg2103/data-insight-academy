import {
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  BookOpen,
  ChartPie,
  PenIcon,
} from "lucide-react";

export interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  lessons: number;
  icon: React.ElementType;
  topics: string[];
  pdfUrl: string;
}

export const modules: Module[] = [
  {
    id: 1,
    title: "Introduction to Stock Markets",
    description:
      "Understand how stock markets work, the role of intermediaries, and how investors begin their journey.",
    duration: "3 hours",
    difficulty: "Beginner",
    lessons: 15,
    icon: BarChart3,
    topics: ["Basics", "Market Functions", "Intermediaries"],
    pdfUrl: "/assets/pdfs/Module_1_Introduction_to_Stock_Markets.pdf",
  },
  {
    id: 2,
    title: "Technical Analysis",
    description:
      "Learn chart patterns, indicators, candlestick analysis, and how traders identify opportunities.",
    duration: "5 hours",
    difficulty: "Intermediate",
    lessons: 22,
    icon: TrendingUp,
    topics: ["Chart Patterns", "Indicators", "Support & Resistance"],
    pdfUrl: "/assets/pdfs/Module_2_Technical_Analysis.pdf",
  },
  {
    id: 3,
    title: "Fundamental Analysis",
    description:
      "Study financial statements, ratios, and company fundamentals to evaluate investments.",
    duration: "4 hours",
    difficulty: "Intermediate",
    lessons: 16,
    icon: PieChart,
    topics: ["Financial Statements", "Ratios", "Valuation"],
    pdfUrl: "/assets/pdfs/Module_3_Fundamental_Analysis.pdf",
  },
  {
    id: 4,
    title: "Futures Trading",
    description:
      "Understand futures contracts, leverage, margins, pricing, and hedging techniques.",
    duration: "2.5 hours",
    difficulty: "Advanced",
    lessons: 13,
    icon: Activity,
    topics: ["Leverage", "Margin", "Hedging"],
    pdfUrl: "/assets/pdfs/Module_4_Futures_Trading.pdf",
  },
  {
    id: 5,
    title: "Options Theory for Professional Trading",
    description:
      "Learn option contracts, option Greeks, volatility, and payoff structures.",
    duration: "6 hours",
    difficulty: "Advanced",
    lessons: 25,
    icon: BookOpen,
    topics: ["Call Options", "Put Options", "Option Greeks"],
    pdfUrl: "/assets/pdfs/Module_5_Options_Theory_for_Professional_Trading.pdf",
  },
  {
    id: 6,
    title: "Option Strategies",
    description:
      "Explore spreads, straddles, strangles, iron condors and advanced strategies.",
    duration: "3 hours",
    difficulty: "Advanced",
    lessons: 14,
    icon: BarChart3,
    topics: ["Spreads", "Straddles", "Iron Condor"],
    pdfUrl: "/assets/pdfs/Module_6_Option_Strategies.pdf",
  },
  {
    id: 7,
    title: "Markets and Taxation",
    description:
      "Understand taxation rules applicable to investors and traders in India.",
    duration: "2 hours",
    difficulty: "Beginner",
    lessons: 8,
    icon: BarChart3,
    topics: ["Income Tax", "Capital Gains", "Trading Taxes"],
    pdfUrl: "/assets/pdfs/Module_7_Markets_and_Taxation.pdf",
  },
  {
    id: 8,
    title: "Currency, Commodity, and Government Securities",
    description:
      "Learn trading currency pairs, commodities, and government securities.",
    duration: "3 hours",
    difficulty: "Intermediate",
    lessons: 20,
    icon: PieChart,
    topics: ["Forex", "Commodities", "Gold", "Crude Oil"],
    pdfUrl:
      "/assets/pdfs/Module_8_Currency_Commodity_and_Government_Securities.pdf",
  },
  {
    id: 9,
    title: "Risk Management and Trading Psychology",
    description:
      "Learn position sizing, portfolio risk management, and trading psychology.",
    duration: "3 hours",
    difficulty: "Intermediate",
    lessons: 16,
    icon: Activity,
    topics: ["Risk Management", "Portfolio Risk", "Psychology"],
    pdfUrl: "/assets/pdfs/Module_9_Risk_Management_and_Trading_Psychology.pdf",
  },
  {
    id: 10,
    title: "Trading Systems",
    description:
      "Understand systematic trading strategies including pair trading and momentum.",
    duration: "8 hours",
    difficulty: "Advanced",
    lessons: 16,
    icon: BarChart3,
    topics: ["Pair Trading", "Momentum", "Quant Strategies"],
    pdfUrl: "/assets/pdfs/Module_10_Trading_Systems.pdf",
  },
  {
    id: 11,
    title: "Personal Finance - Mutual Funds",
    description:
      "Learn mutual funds, portfolio construction, and long-term investment strategies.",
    duration: "5 hours",
    difficulty: "Intermediate",
    lessons: 32,
    icon: PieChart,
    topics: ["Mutual Funds", "Asset Allocation", "Portfolio"],
    pdfUrl: "/assets/pdfs/Module_11_Personal_Finance_Mutual_Funds.pdf",
  },
  {
    id: 12,
    title: "Integrated Financial Modelling",
    description:
      "Learn financial modelling, projections, and valuation techniques.",
    duration: "8 hours",
    difficulty: "Advanced",
    lessons: 18,
    icon: BookOpen,
    topics: ["Financial Models", "DCF", "Excel"],
    pdfUrl: "/assets/pdfs/Module_13_Integrated_Financial_Modelling.pdf",
  },
  {
    id: 13,
    title: "Personal Finance - Insurance",
    description:
      "Understand health insurance products and financial protection strategies.",
    duration: "3 hours",
    difficulty: "Beginner",
    lessons: 9,
    icon: PenIcon,
    topics: ["Health Insurance", "Coverage", "Claims"],
    pdfUrl: "/assets/pdfs/Module_14_Personal_Finance_Insurance.pdf",
  },
];