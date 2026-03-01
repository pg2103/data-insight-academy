import { BarChart3, TrendingUp, PieChart, Activity, BookOpen, ChartPie, PenIcon } from "lucide-react";
export interface Section {
  id: number;
  title: string;
  pdfUrl: string;
  description?: string; // Optional if you want to show a subtitle!
}
export interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  lessons: number;
  progress: number;
  icon: React.ElementType;
  topics: string[];
  completed: boolean;
  sections: Section[];
}
export const modules: Module[] = [
  {
    id: 1,
    title: "Introduction to Stock Markets",
    description:
      "The stock market can play a pivotal role in ensuring your financial security. In this module, you will learn how to get started in the stock market, its fundamentals, how it functions, and the various intermediaries that appertain it.",
    duration: "3 hours",
    difficulty: "Beginner",
    lessons: 15,
    progress: 0,
    icon: BarChart3,
    topics: [
      "Basics",
      "Market Functions",
      "Intermediaries",
    ],
    completed: false,
    sections: [
      {
        id: 1,
        title: "The Need to Invest",
        description: "Learn about the importance of savings, ways to invest, and asset comparison.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 2,
        title: "Regulators, the guardians of capital markets",
        description: "How regulators govern the financial markets and types of market participants.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 3,
        title: "Market Intermediaries",
        description: "Financial intermediaries in the stock market and their services.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 4,
        title: "The IPO Markets (Part 1)",
        description: "Origins of business funding and IPO journey basics.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 5,
        title: "The IPO Markets (Part 2)",
        description: "IPO process steps and popular jargon explained.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 6,
        title: "The Stock Markets",
        description: "Minute-by-minute basics, calculation concepts in trading.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 7,
        title: "The Stock Markets Index",
        description: "Construction and practical use of Index in India.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 8,
        title: "Commonly Used Jargons",
        description: "Glossary of stock market terms and trading concepts.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 9,
        title: "The Trading Terminal",
        description: "Trading terminal introduction & relevant features.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 10,
        title: "Clearing and Settlement Process",
        description: "Behind the scenes of stock buying and selling.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 11,
        title: "Corporate actions and impact on stock prices",
        description: "How actions like splits/dividends affect prices/trading.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 12,
        title: "Key Events and Their Impact on Markets",
        description: "Major macro events impact and market mechanisms.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 13,
        title: "Getting started",
        description: "Developing a point of view with trading strategies.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 14,
        title: "Supplementary note – Rights, OFS, FPO",
        description: "Various ways to raise funds before and after listing.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
      {
        id: 15,
        title: "Supplementary note – The 20 market depth or level 3 data",
        description: "Level 3 data and how market depth works in quotes.",
        pdfUrl: "/assets/pdfs/Module 1_Introduction to Stock Markets.pdf",
      },
    ],
  },
  {
  id: 2,
  title: "Technical Analysis",
  description:
    "Technical Analysis helps in developing a point of view. In this module, we discover various patterns, indicators, and theories to find upright trading opportunities in the market.",
  duration: "5 hours",
  difficulty: "Intermediate",
  lessons: 22,
  progress: 0,
  icon: TrendingUp,
  topics: [
    "Chart Patterns",
    "Support & Resistance",
    "Moving Averages",
    "Indicators",
    "Candlestick Patterns",
  ],
  completed: false,
  sections: [
    { id: 1, title: "Background", pdfUrl: "/assets/pdfs/module2_background.pdf" },
    {
      id: 2,
      title: "Introducing Technical Analysis",
      pdfUrl: "/assets/pdfs/module2_introducing_technical_analysis.pdf",
    },
    { id: 3, title: "Chart Types", pdfUrl: "/assets/pdfs/module2_chart_types.pdf" },
    {
      id: 4,
      title: "Getting Started with Candlesticks",
      pdfUrl: "/assets/pdfs/module2_getting_started_candlesticks.pdf",
    },
    {
      id: 5,
      title: "Single Candlestick patterns (Part 1)",
      pdfUrl: "/assets/pdfs/module2_single_candlestick_part1.pdf",
    },
    {
      id: 6,
      title: "Single Candlestick patterns (Part 2)",
      pdfUrl: "/assets/pdfs/module2_single_candlestick_part2.pdf",
    },
    {
      id: 7,
      title: "Single Candlestick patterns (Part 3)",
      pdfUrl: "/assets/pdfs/module2_single_candlestick_part3.pdf",
    },
    {
      id: 8,
      title: "Multiple Candlestick patterns (Part 1)",
      pdfUrl: "/assets/pdfs/module2_multiple_candlestick_part1.pdf",
    },
    {
      id: 9,
      title: "Multiple Candlestick patterns (Part 2)",
      pdfUrl: "/assets/pdfs/module2_multiple_candlestick_part2.pdf",
    },
    {
      id: 10,
      title: "Multiple Candlestick patterns (Part 3)",
      pdfUrl: "/assets/pdfs/module2_multiple_candlestick_part3.pdf",
    },
    {
      id: 11,
      title: "The Support and Resistance",
      pdfUrl: "/assets/pdfs/module2_support_resistance.pdf",
    },
    { id: 12, title: "Volumes", pdfUrl: "/assets/pdfs/module2_volumes.pdf" },
    {
      id: 13,
      title: "Moving Averages",
      pdfUrl: "/assets/pdfs/module2_moving_averages.pdf",
    },
    {
      id: 14,
      title: "Indicators (Part 1)",
      pdfUrl: "/assets/pdfs/module2_indicators_part1.pdf",
    },
    {
      id: 15,
      title: "Indicators (Part 2)",
      pdfUrl: "/assets/pdfs/module2_indicators_part2.pdf",
    },
    {
      id: 16,
      title: "The Fibonacci Retracements",
      pdfUrl: "/assets/pdfs/module2_fibonacci_retracements.pdf",
    },
    {
      id: 17,
      title: "The Dow Theory (Part 1)",
      pdfUrl: "/assets/pdfs/module2_dow_theory_part1.pdf",
    },
    {
      id: 18,
      title: "The Dow Theory (Part 2)",
      pdfUrl: "/assets/pdfs/module2_dow_theory_part2.pdf",
    },
    {
      id: 19,
      title: "The Finale – Helping you get started",
      pdfUrl: "/assets/pdfs/module2_finale_helping_get_started.pdf",
    },
    {
      id: 20,
      title: "Other indicators",
      pdfUrl: "/assets/pdfs/module2_other_indicators.pdf",
    },
    {
      id: 21,
      title: "Interesting features on TradingView",
      pdfUrl: "/assets/pdfs/module2_interesting_features_tradingview.pdf",
    },
    {
      id: 22,
      title: "The Central Pivot Range",
      pdfUrl: "/assets/pdfs/module2_central_pivot_range.pdf",
    },
  ],
    },

  {
  id: 3,
  title: "Fundamental Analysis",
  description: "The Fundamental Analysis (FA) module explores Equity research by reading financial statements and annual reports, calculating and analyzing Financial Ratios, and evaluating the intrinsic value of a stock to find long-term investing opportunities.",
  duration: "4 hours",
  difficulty: "Intermediate",
  lessons: 16,
  progress: 0,
  icon: PieChart,
  topics: [
    "Financial Statements",
    "Annual Reports",
    "Financial Ratios",
    "Equity Research",
    "Valuation"
  ],
  completed: false,
  sections: [
    {
      id: 1,
      title: "Introduction to Fundamental Analysis",
      pdfUrl: "/assets/pdfs/module3_1_introduction_to_fundamental_analysis.pdf",
    },
    {
      id: 2,
      title: "Mindset of an Investor",
      pdfUrl: "/assets/pdfs/module3_2_mindset_of_an_investor.pdf",
    },
    {
      id: 3,
      title: "How to Read the Annual Report of a Company",
      pdfUrl: "/assets/pdfs/module3_3_read_annual_report.pdf",
    },
    {
      id: 4,
      title: "Understanding the P&L Statement (Part 1)",
      pdfUrl: "/assets/pdfs/module3_4_understanding_pl_statement_part1.pdf",
    },
    {
      id: 5,
      title: "Understanding the P&L Statement (Part 2)",
      pdfUrl: "/assets/pdfs/module3_5_understanding_pl_statement_part2.pdf",
    },
    {
      id: 6,
      title: "Understanding Balance Sheet Statement (Part 1)",
      pdfUrl: "/assets/pdfs/module3_6_understanding_balance_sheet_part1.pdf",
    },
    {
      id: 7,
      title: "Understanding the Balance Sheet Statement (Part 2)",
      pdfUrl: "/assets/pdfs/module3_7_understanding_balance_sheet_part2.pdf",
    },
    {
      id: 8,
      title: "The Cash Flow Statement",
      pdfUrl: "/assets/pdfs/module3_8_cash_flow_statement.pdf",
    },
    {
      id: 9,
      title: "The Financial Ratio Analysis (Part 1)",
      pdfUrl: "/assets/pdfs/module3_9_financial_ratio_analysis_part1.pdf",
    },
    {
      id: 10,
      title: "The Financial Ratio Analysis (Part 2)",
      pdfUrl: "/assets/pdfs/module3_10_financial_ratio_analysis_part2.pdf",
    },
    {
      id: 11,
      title: "The Financial Ratio Analysis (Part 3)",
      pdfUrl: "/assets/pdfs/module3_11_financial_ratio_analysis_part3.pdf",
    },
    {
      id: 12,
      title: "The Investment Due Diligence",
      pdfUrl: "/assets/pdfs/module3_12_investment_due_diligence.pdf",
    },
    {
      id: 13,
      title: "Equity Research (Part 1)",
      pdfUrl: "/assets/pdfs/module3_13_equity_research_part1.pdf",
    },
    {
      id: 14,
      title: "DCF Primer",
      pdfUrl: "/assets/pdfs/module3_14_dcf_primer.pdf",
    },
    {
      id: 15,
      title: "Equity Research (Part 2)",
      pdfUrl: "/assets/pdfs/module3_15_equity_research_part2.pdf",
    },
    {
      id: 16,
      title: "The Finale",
      pdfUrl: "/assets/pdfs/module3_16_the_finale.pdf",
    },
  ],
    },
  {
  id: 4,
  title: "Futures Trading",
  description: "This segment of derivatives covers the intricacies of undergoing a futures trade, including margins, leverages, pricing, and other topics. Also discusses the use of derivatives for hedging purposes.",
  duration: "2.5 hours",
  difficulty: "Advanced",
  lessons: 13,
  progress: 0,
  icon: Activity,
  topics: [
    "Forwards & Futures",
    "Leverage",
    "Margin",
    "Shorting",
    "Hedging"
  ],
  completed: false,
  sections: [
    {
      id: 1,
      title: "Background – Forwards Market",
      description: "Describes what a forward contract means along with a practical illustration.",
      pdfUrl: "/assets/pdfs/Module 4_Futures Trading.pdf",
    },
    {
      id: 2,
      title: "Introducing Futures Contract",
      description: "Drawbacks of forwards contracts and how futures contracts overcome these drawbacks.",
      pdfUrl: "/assets/pdfs/Module 4_Futures Trading.pdf",
    },
    {
      id: 3,
      title: "The Futures Trade",
      description: "How to employ futures contracts for trading directional views and examples.",
      pdfUrl: "/assets/pdfs/Module 4_Futures Trading.pdf",
    },
    {
      id: 4,
      title: "Leverage & Payoff",
      description: "Central theme of futures trading in detail, contract differences, and leverage.",
      pdfUrl: "/assets/pdfs/Module 4_Futures Trading.pdf",
    },
    {
      id: 5,
      title: "Margin & M2M",
      description: "Necessary information before placing your first futures trade including exchange margining.",
      pdfUrl: "/assets/pdfs/Module 4_Futures Trading.pdf",
    },
    {
      id: 6,
      title: "Margin Calculator (Part 1)",
      description: "Overview of how to use a margin calculator and touches on spread trading.",
      pdfUrl: "/assets/pdfs/Module 4_Futures Trading.pdf",
    },
    {
      id: 7,
      title: "Margin Calculator (Part 2)",
      description: "Product types such as NRML, MIS, Bracket Order, Cover Order and margin rules.",
      pdfUrl: "/assets/pdfs/Module 4_Futures Trading.pdf",
    },
    {
      id: 8,
      title: "All about Shorting",
      description: "About shorting stocks & futures with real life examples and practical advice.",
      pdfUrl: "/assets/pdfs/Module 4_Futures Trading.pdf",
    },
    {
      id: 9,
      title: "The Nifty Futures",
      description: "All you need to know about trading Nifty futures, including impact cost, liquidity, and benefits.",
      pdfUrl: "/assets/pdfs/Module 4_Futures Trading.pdf",
    },
    {
      id: 10,
      title: "The Futures Pricing",
      description: "How futures contracts are priced with respect to spot prices and theoretical pricing.",
      pdfUrl: "/assets/pdfs/Module 4_Futures Trading.pdf",
    },
    {
      id: 11,
      title: "Hedging with Futures",
      description: "How to hedge a portfolio of stocks using futures instruments, including tips and strategies.",
      pdfUrl: "/assets/pdfs/Module 4_Futures Trading.pdf",
    },
    {
      id: 12,
      title: "Open Interest",
      description: "Concept of open interest and its relevance, plus a study on charts.",
      pdfUrl: "/assets/pdfs/Module 4_Futures Trading.pdf",
    },
    {
      id: 13,
      title: "Quick Note on Physical Settlement",
      description: "Explains the process of equity futures and options settlement in India.",
      pdfUrl: "/assets/pdfs/Module 4_Futures Trading.pdf",
    },
  ],
}
,
  {
  id: 5,
  title: "Options Theory for Professional Trading",
  description: "Options contracts grant the buyer the right to buy/sell the underlying without a compulsory obligation. This module discusses options contracts, pricing, profit and loss payoffs.",
  duration: "6 hours",
  difficulty: "Advanced",
  lessons: 25,
  progress: 0,
  icon: BookOpen,
  topics: [
    "Call Options",
    "Put Options",
    "Option Greeks",
    "Volatility",
    "Option Pricing",
    "Case Studies"
  ],
  completed: false,
  sections: [
    {
      id: 1,
      title: "Call Option Basics",
      description: "Understand the very basics of call options assuming no prior knowledge of options.",
      pdfUrl: "/assets/pdfs/module5_call_option_basics.pdf"
    },
    {
      id: 2,
      title: "Basic Option Jargons",
      description: "Decode the essential jargon and terminologies used in options trading.",
      pdfUrl: "/assets/pdfs/module5_basic_option_jargons.pdf"
    },
    {
      id: 3,
      title: "Buying a Call Option",
      description: "Learn when and why it makes sense to buy call options with practical examples.",
      pdfUrl: "/assets/pdfs/module5_buying_a_call_option.pdf"
    },
    {
      id: 4,
      title: "Selling/Writing a Call Option",
      description: "Explore the perspective of an option seller and how it differs from buying options.",
      pdfUrl: "/assets/pdfs/module5_selling_call_option.pdf"
    },
    {
      id: 5,
      title: "The Put Option Buying",
      description: "Understanding the orientation and practicalities of buying put options.",
      pdfUrl: "/assets/pdfs/module5_put_option_buying.pdf"
    },
    {
      id: 6,
      title: "The Put Option Selling",
      description: "Explore the option seller's perspective in put options and the responsibilities involved.",
      pdfUrl: "/assets/pdfs/module5_put_option_selling.pdf"
    },
    {
      id: 7,
      title: "Summarizing Call & Put Options",
      description: "Summary of the various options positions and their payoff diagrams.",
      pdfUrl: "/assets/pdfs/module5_summarizing_call_put_options.pdf"
    },
    {
      id: 8,
      title: "Moneyness of an Option Contract",
      description: "Learn about ITM, ATM, and OTM classifications and intrinsic value concepts.",
      pdfUrl: "/assets/pdfs/module5_moneyness_option_contract.pdf"
    },
    {
      id: 9,
      title: "The Option Greeks (Delta) Part 1",
      description: "Introduction and overview of the Delta Greek.",
      pdfUrl: "/assets/pdfs/module5_option_greeks_delta_part1.pdf"
    },
    {
      id: 10,
      title: "Delta (Part 2)",
      description: "Deep dive into the model thinking behind Delta calculations.",
      pdfUrl: "/assets/pdfs/module5_delta_part2.pdf"
    },
    {
      id: 11,
      title: "Delta (Part 3)",
      description: "Understanding how Deltas add up and their implications.",
      pdfUrl: "/assets/pdfs/module5_delta_part3.pdf"
    },
    {
      id: 12,
      title: "Gamma (Part 1)",
      description: "Introducing Gamma and its significance using high school calculus.",
      pdfUrl: "/assets/pdfs/module5_gamma_part1.pdf"
    },
    {
      id: 13,
      title: "Gamma (Part 2)",
      description: "Further exploration of Gamma and curvature effects on Delta.",
      pdfUrl: "/assets/pdfs/module5_gamma_part2.pdf"
    },
    {
      id: 14,
      title: "Theta",
      description: "Understanding the time decay of options and its importance.",
      pdfUrl: "/assets/pdfs/module5_theta.pdf"
    },
    {
      id: 15,
      title: "Volatility Basics",
      description: "Background of volatility concepts and their relation to option pricing.",
      pdfUrl: "/assets/pdfs/module5_volatility_basics.pdf"
    },
    {
      id: 16,
      title: "Volatility Calculation (Historical)",
      description: "Learn how historical volatility is calculated using Excel.",
      pdfUrl: "/assets/pdfs/module5_volatility_calculation_historical.pdf"
    },
    {
      id: 17,
      title: "Volatility & Normal Distribution",
      description: "Exploring volatility probability ranges using normal distribution.",
      pdfUrl: "/assets/pdfs/module5_volatility_normal_distribution.pdf"
    },
    {
      id: 18,
      title: "Volatility Applications",
      description: "Applying volatility knowledge for better trading decisions.",
      pdfUrl: "/assets/pdfs/module5_volatility_applications.pdf"
    },
    {
      id: 19,
      title: "Vega",
      description: "Understanding the Vega Greek and volatility types.",
      pdfUrl: "/assets/pdfs/module5_vega.pdf"
    },
    {
      id: 20,
      title: "Greek Interactions",
      description: "How various Greeks interact and the concept of volatility smile.",
      pdfUrl: "/assets/pdfs/module5_greek_interactions.pdf"
    },
    {
      id: 21,
      title: "Greek Calculator",
      description: "Calculating Greeks using the Black & Scholes Model.",
      pdfUrl: "/assets/pdfs/module5_greek_calculator.pdf"
    },
    {
      id: 22,
      title: "Re-introducing Call & Put Options",
      description: "Revisiting call and put options concepts after detailed Greeks discussion.",
      pdfUrl: "/assets/pdfs/module5_reintroducing_call_put_options.pdf"
    },
    {
      id: 23,
      title: "Case studies – wrapping it all up!",
      description: "Practical case studies consolidating the module knowledge.",
      pdfUrl: "/assets/pdfs/module5_case_studies.pdf"
    },
    {
      id: 24,
      title: "Quick note on Physical Settlement",
      description: "Cash and physical settlement process in Indian equity options.",
      pdfUrl: "/assets/pdfs/module5_quick_note_physical_settlement.pdf"
    },
    {
      id: 25,
      title: "Options M2M and P&L calculation",
      description: "Mark-to-market and profit/loss calculation for options trading.",
      pdfUrl: "/assets/pdfs/module5_options_m2m_and_pl.pdf"
    }
  ],
}
,
  {
  id: 6,
  title: "Option Strategies",
  description: "A trader can use options strategies to monetize their views on volatility, sentiment, and timing. This module explores various options strategies that can be built with a multi-dimensional approach involving Option Greeks, Risk-Return, etc.",
  duration: "3 hours",
  difficulty: "Advanced",
  lessons: 14,
  progress: 0,
  icon: BarChart3,
  topics: [
    "Option Strategies",
    "Spread Strategies",
    "Straddles",
    "Strangles",
    "Max Pain",
    "Iron Condor"
  ],
  completed: false,
  sections: [
    {
      id: 1,
      title: "Orientation",
      description: "Setting the context and overview of option strategies, behavioral finance aspects.",
      pdfUrl: "/assets/pdfs/module6_orientation.pdf"
    },
    {
      id: 2,
      title: "Bull Call Spread",
      description: "A simple two leg bullish option spread strategy and its payoff.",
      pdfUrl: "/assets/pdfs/module6_bull_call_spread.pdf"
    },
    {
      id: 3,
      title: "Bull Put Spread",
      description: "A moderately bullish two leg option strategy known as bull put spread.",
      pdfUrl: "/assets/pdfs/module6_bull_put_spread.pdf"
    },
    {
      id: 4,
      title: "Call Ratio Back Spread",
      description: "An interesting option strategy with unique payoff characteristics.",
      pdfUrl: "/assets/pdfs/module6_call_ratio_back_spread.pdf"
    },
    {
      id: 5,
      title: "Bear Call Ladder",
      description: "Advanced option strategy building on the call ratio back spread.",
      pdfUrl: "/assets/pdfs/module6_bear_call_ladder.pdf"
    },
    {
      id: 6,
      title: "Synthetic Long & Arbitrage",
      description: "Simultaneous long and short positions to exploit arbitrage opportunities.",
      pdfUrl: "/assets/pdfs/module6_synthetic_long_arbitrage.pdf"
    },
    {
      id: 7,
      title: "Bear Put Spread",
      description: "Spread strategy for moderately bearish market outlook.",
      pdfUrl: "/assets/pdfs/module6_bear_put_spread.pdf"
    },
    {
      id: 8,
      title: "Bear Call Spread",
      description: "Two leg bearish option spread using call options.",
      pdfUrl: "/assets/pdfs/module6_bear_call_spread.pdf"
    },
    {
      id: 9,
      title: "Put Ratio Back Spread",
      description: "Similar to call ratio back spread but using put options.",
      pdfUrl: "/assets/pdfs/module6_put_ratio_back_spread.pdf"
    },
    {
      id: 10,
      title: "The Long Straddle",
      description: "Strategy involving buying both call and put options for volatility plays.",
      pdfUrl: "/assets/pdfs/module6_long_straddle.pdf"
    },
    {
      id: 11,
      title: "The Short Straddle",
      description: "Strategy involving selling both call and put options, betting on low volatility.",
      pdfUrl: "/assets/pdfs/module6_short_straddle.pdf"
    },
    {
      id: 12,
      title: "The Long & Short Strangle",
      description: "Understanding the strangle strategy and its variations.",
      pdfUrl: "/assets/pdfs/module6_long_short_strangle.pdf"
    },
    {
      id: 13,
      title: "Max Pain & PCR Ratio",
      description: "Insights on option pain theory and put-call ratio.",
      pdfUrl: "/assets/pdfs/module6_max_pain_pcr_ratio.pdf"
    },
    {
      id: 14,
      title: "Iron Condor",
      description: "A complex multi-leg strategy focusing on limited risk and defined profit zones.",
      pdfUrl: "/assets/pdfs/module6_iron_condor.pdf"
    }
  ],
}
,
  {
  id: 7,
  title: "Markets and Taxation",
  description: "As a trader in India, you should be informed of the taxes applicable to your investments and trades. This module outlines essential topics related to tax computation, filings, and rules for traders and investors.",
  duration: "2 hours",
  difficulty: "Beginner",
  lessons: 8,
  progress: 0,
  icon: BarChart3,
  topics: [
    "Income Tax Basics",
    "Tax Slabs",
    "Market Activity Classification",
    "Taxation for Investors",
    "Taxation for Traders",
    "Turnover & ITR Forms",
    "Foreign Stocks Taxation"
  ],
  completed: false,
  sections: [
    {
      id: 1,
      title: "Introduction (Setting the Context)",
      description: "Reassures readers that taxation need not be feared, and can be interesting from a trader/investor perspective.",
      pdfUrl: "/assets/pdfs/module7_1_introduction_setting_context.pdf"
    },
    {
      id: 2,
      title: "Basics",
      description: "Introduction to Income Tax, its importance, and applicable tax slabs for different income levels.",
      pdfUrl: "/assets/pdfs/module7_2_basics.pdf"
    },
    {
      id: 3,
      title: "Classifying Your Market Activity",
      description: "Detailed study of four income heads for trader/investor and tax computation rules under each.",
      pdfUrl: "/assets/pdfs/module7_3_classifying_market_activity.pdf"
    },
    {
      id: 4,
      title: "Taxation for Investors",
      description: "Explanation on long-term and short-term capital gains/losses and methods to reduce tax liabilities.",
      pdfUrl: "/assets/pdfs/module7_4_taxation_for_investors.pdf"
    },
    {
      id: 5,
      title: "Taxation for Traders",
      description: "Detailed look at business income heads (speculative and non-speculative) and key tax terms like BTST, tax loss harvesting.",
      pdfUrl: "/assets/pdfs/module7_5_taxation_for_traders.pdf"
    },
    {
      id: 6,
      title: "Turnover, Balance Sheet, and P&L",
      description: "Covers difference between paying income tax and filing tax returns with the various ITR forms for different assesses.",
      pdfUrl: "/assets/pdfs/module7_6_turnover_balance_sheet_pl.pdf"
    },
    {
      id: 7,
      title: "ITR Forms (The Finale)",
      description: "Introduction and explanation of different income tax forms and guidance on selecting the appropriate form.",
      pdfUrl: "/assets/pdfs/module7_7_itr_forms.pdf"
    },
    {
      id: 8,
      title: "Foreign Stocks and Taxation",
      description: "Overview of applicable taxation principles when investing/trading in foreign stocks.",
      pdfUrl: "/assets/pdfs/module7_8_foreign_stock_taxation.pdf"
    }
  ],
},
  {
  id: 8,
  title: "Currency, Commodity, and Government Securities",
  description: "Interest rates, forex rates, and inflation impact each other and commodity prices. This module discusses trading in currency and commodity derivatives and Government Securities (GSec) in the Indian markets.",
  duration: "3 hours",
  difficulty: "Intermediate",
  lessons: 20,
  progress: 0,
  icon: PieChart,
  topics: [
    "Currency Basics",
    "Reference Rates & Events",
    "Interest Rate Parity",
    "Major Currency Pairs",
    "Commodity Markets",
    "Government Securities",
    "Electricity Derivatives"
  ],
  completed: false,
  sections: [
    {
      id: 1,
      title: "Currency Basics",
      description: "Module Orientation covering currencies and currency trading, commodities, and interest rate futures.",
      pdfUrl: "/assets/pdfs/module8_currency_basics.pdf"
    },
    {
      id: 2,
      title: "Reference Rates & Impact of events",
      description: "Understanding impact of events on reference rates with dual perspectives.",
      pdfUrl: "/assets/pdfs/module8_reference_rates_impact_events.pdf"
    },
    {
      id: 3,
      title: "Impact of events (Brexit) & Interest Rate Parity",
      description: "Discussion on Brexit event and concept of Interest Rate Parity in currency markets.",
      pdfUrl: "/assets/pdfs/module8_brexit_interest_rate_parity.pdf"
    },
    {
      id: 4,
      title: "The USD INR Pair (Part 1)",
      description: "Explores contract assumptions and the role of Technical Analysis in currency trading.",
      pdfUrl: "/assets/pdfs/module8_usd_inr_part1.pdf"
    },
    {
      id: 5,
      title: "The USD INR Pair (Part 2)",
      description: "Concepts like futures calendar spread and the interest rate factor in futures trading.",
      pdfUrl: "/assets/pdfs/module8_usd_inr_part2.pdf"
    },
    {
      id: 6,
      title: "EUR, GBP, and JPY",
      description: "Other major currency pairs traded in Indian markets and their characteristics.",
      pdfUrl: "/assets/pdfs/module8_eur_gbp_jpy.pdf"
    },
    {
      id: 7,
      title: "Gold (Part 1)",
      description: "Introduction to commodity exchanges in India and commodity basics about Gold futures.",
      pdfUrl: "/assets/pdfs/module8_gold_part1.pdf"
    },
    {
      id: 8,
      title: "Gold (Part 2)",
      description: "Details on London fix and pricing commentary on gold contracts.",
      pdfUrl: "/assets/pdfs/module8_gold_part2.pdf"
    },
    {
      id: 9,
      title: "Silver",
      description: "Insights on trading silver bullion and its market dynamics.",
      pdfUrl: "/assets/pdfs/module8_silver.pdf"
    },
    {
      id: 10,
      title: "Crude Oil (Part 1), digging the past",
      description: "Historical perspective on crude oil and its importance in commodity trading.",
      pdfUrl: "/assets/pdfs/module8_crude_oil_part1.pdf"
    },
    {
      id: 11,
      title: "Crude Oil (Part 2), the crude oil ecosystem",
      description: "Overview of companies and economic factors impacting crude oil markets.",
      pdfUrl: "/assets/pdfs/module8_crude_oil_part2.pdf"
    },
    {
      id: 12,
      title: "Crude Oil (Part 3), the crude oil contract",
      description: "Contract specifications and trading volumes of crude oil futures on MCX.",
      pdfUrl: "/assets/pdfs/module8_crude_oil_part3.pdf"
    },
    {
      id: 13,
      title: "Copper & Aluminium",
      description: "The Sumitomo Copper scandal and its significance in commodities markets.",
      pdfUrl: "/assets/pdfs/module8_copper_aluminium.pdf"
    },
    {
      id: 14,
      title: "Lead & Nickel",
      description: "Historical and basic overview of Lead and Nickel commodities.",
      pdfUrl: "/assets/pdfs/module8_lead_nickel.pdf"
    },
    {
      id: 15,
      title: "Cardamom & Mentha Oil",
      description: "Trading and market insights from agri-commodities like Cardamom and Mentha Oil.",
      pdfUrl: "/assets/pdfs/module8_cardamom_mentha_oil.pdf"
    },
    {
      id: 16,
      title: "Natural Gas",
      description: "Background and trading overview of Natural Gas futures.",
      pdfUrl: "/assets/pdfs/module8_natural_gas.pdf"
    },
    {
      id: 17,
      title: "Commodity Options",
      description: "Introduction to option contracts for commodities and their peculiarities.",
      pdfUrl: "/assets/pdfs/module8_commodity_options.pdf"
    },
    {
      id: 18,
      title: "Cross Currency Pairs",
      description: "Major cross currency pairs traded globally and their features.",
      pdfUrl: "/assets/pdfs/module8_cross_currency_pairs.pdf"
    },
    {
      id: 19,
      title: "Government Securities",
      description: "Retail investors' access to Government Securities with recent RBI-NSE collaboration.",
      pdfUrl: "/assets/pdfs/module8_government_securities.pdf"
    },
    {
      id: 20,
      title: "Electricity Derivatives",
      description: "Introduction of electricity derivatives as a new financial instrument.",
      pdfUrl: "/assets/pdfs/module8_electricity_derivatives.pdf"
    }
  ],
}
,
  {
  id: 9,
  title: "Risk Management and Trading Psychology",
  description: "This module discusses risk and risk management tools along with the psychology required for sustaining in the markets.",
  duration: "3 hours",
  difficulty: "Intermediate",
  lessons: 16,
  progress: 0,
  icon: Activity,
  topics: [
    "Risk Management",
    "Portfolio Optimization",
    "Value at Risk",
    "Position Sizing",
    "Trading Biases",
    "Kelly’s Criterion"
  ],
  completed: false,
  sections: [
    {
      id: 1,
      title: "Orientation note",
      description: "Introduction to risk management and trading psychology, setting the context.",
      pdfUrl: "/assets/pdfs/module9_orientation_note.pdf"
    },
    {
      id: 2,
      title: "Risk (Part 1)",
      description: "Understanding the basics of risk in trading, its significance.",
      pdfUrl: "/assets/pdfs/module9_risk_part1.pdf"
    },
    {
      id: 3,
      title: "Risk (Part 2) – Variance & Covariance",
      description: "Concepts of variance and covariance explained with market examples.",
      pdfUrl: "/assets/pdfs/module9_risk_part2_variance_covariance.pdf"
    },
    {
      id: 4,
      title: "Risk (Part 3) – Variance & Covariance Matrix",
      description: "Recap and deeper insight into variance-covariance matrices in portfolios.",
      pdfUrl: "/assets/pdfs/module9_risk_part3_variance_covariance_matrix.pdf"
    },
    {
      id: 5,
      title: "Risk (Part 4) – Correlation Matrix & Portfolio Variance",
      description: "Understanding correlation among assets and its effect on portfolio risk.",
      pdfUrl: "/assets/pdfs/module9_risk_part4_correlation_matrix.pdf"
    },
    {
      id: 6,
      title: "Equity Curve",
      description: "An insightful digression covering the portfolio's equity curve concepts.",
      pdfUrl: "/assets/pdfs/module9_equity_curve.pdf"
    },
    {
      id: 7,
      title: "Expected Returns",
      description: "Insight into expected returns and their computation for portfolios.",
      pdfUrl: "/assets/pdfs/module9_expected_returns.pdf"
    },
    {
      id: 8,
      title: "Portfolio Optimization (Part 1)",
      description: "Introduction to portfolio optimization concepts and tools.",
      pdfUrl: "/assets/pdfs/module9_portfolio_optimization_part1.pdf"
    },
    {
      id: 9,
      title: "Portfolio Optimization (Part 2)",
      description: "Working with portfolio weights and optimization techniques.",
      pdfUrl: "/assets/pdfs/module9_portfolio_optimization_part2.pdf"
    },
    {
      id: 10,
      title: "Value at Risk",
      description: "Understanding VaR, risks during Black Monday and stress testing portfolios.",
      pdfUrl: "/assets/pdfs/module9_value_at_risk.pdf"
    },
    {
      id: 11,
      title: "Position Sizing for Active Trader",
      description: "Introducing position sizing and its psychological role, inspired by poker.",
      pdfUrl: "/assets/pdfs/module9_position_sizing_part1.pdf"
    },
    {
      id: 12,
      title: "Position Sizing for Active Traders (Part 2)",
      description: "Defining equity capital and deeper concepts in position sizing.",
      pdfUrl: "/assets/pdfs/module9_position_sizing_part2.pdf"
    },
    {
      id: 13,
      title: "Position Sizing for Active Traders (Part 3)",
      description: "Choosing an optimum path for position sizing with practical examples.",
      pdfUrl: "/assets/pdfs/module9_position_sizing_part3.pdf"
    },
    {
      id: 14,
      title: "Kelly’s Criterion",
      description: "Explaining the Kelly criterion for optimal risk percentage selection.",
      pdfUrl: "/assets/pdfs/module9_kellys_criterion.pdf"
    },
    {
      id: 15,
      title: "Trading Biases",
      description: "Understanding psychological biases influencing trading decisions.",
      pdfUrl: "/assets/pdfs/module9_trading_biases_part1.pdf"
    },
    {
      id: 16,
      title: "Trading Biases (Part 2)",
      description: "Continuation of trading biases with examples like anchoring bias.",
      pdfUrl: "/assets/pdfs/module9_trading_biases_part2.pdf"
    }
  ],
}
,
{
  id: 10,
  title: "Trading Systems",
  description: "This module covers the fundamentals of building effective trading systems including pair trading, momentum portfolios, calendar spreads, and more advanced techniques.",
  duration: "8 hours",
  difficulty: "Advanced",
  topics:[

  ],
  completed:false,
  lessons: 16,
  progress: 0,
  icon: BarChart3,
  sections: [
    {
      id: 1,
      title: "What to expect?",
      description: "Introduction and overview of trading systems, core components, and planning.",
      pdfUrl: "/assets/pdfs/module10_what_to_expect.pdf"
    },
    {
      id: 2,
      title: "Pair Trading logic",
      description: "Understanding the concept of pair trading and its underlying logic.",
      pdfUrl: "/assets/pdfs/module10_pair_trading_logic.pdf"
    },
    {
      id: 3,
      title: "Pair Trading Method 1: Tracking Pairs",
      description: "Method 1 for pair trading involving statistical correlation tracking.",
      pdfUrl: "/assets/pdfs/module10_pair_trading_method1_tracking_pairs.pdf"
    },
    {
      id: 4,
      title: "Pair Trading Method 1: Pair Stats",
      description: "Deep dive into correlation types and statistical analysis in pair trading.",
      pdfUrl: "/assets/pdfs/module10_pair_trading_method1_pair_stats.pdf"
    },
    {
      id: 5,
      title: "Pre trade setup",
      description: "How to set up your trades, revisiting statistical distributions relevant to trading.",
      pdfUrl: "/assets/pdfs/module10_pre_trade_setup.pdf"
    },
    {
      id: 6,
      title: "The Density Curve",
      description: "Understanding the density curve and its role in statistical trade identification.",
      pdfUrl: "/assets/pdfs/module10_density_curve.pdf"
    },
    {
      id: 7,
      title: "The Pair Trade",
      description: "Bringing it all together for trade execution based on pair trading signals.",
      pdfUrl: "/assets/pdfs/module10_pair_trade.pdf"
    },
    {
      id: 8,
      title: "Pair Trading Method 2: Straight Line Equation",
      description: "Advanced method involving linear regression for pair trading.",
      pdfUrl: "/assets/pdfs/module10_pair_trading_method2_straight_line_equation.pdf"
    },
    {
      id: 9,
      title: "Linear Regression",
      description: "Introduction to regression techniques and their application in trading.",
      pdfUrl: "/assets/pdfs/module10_linear_regression.pdf"
    },
    {
      id: 10,
      title: "The Error Ratio",
      description: "Evaluating error ratios to assess model fit and trade quality.",
      pdfUrl: "/assets/pdfs/module10_error_ratio.pdf"
    },
    {
      id: 11,
      title: "The ADF Test",
      description: "Explanation of Augmented Dickey-Fuller test and its importance in co-integration.",
      pdfUrl: "/assets/pdfs/module10_adf_test.pdf"
    },
    {
      id: 12,
      title: "Trade Identification",
      description: "Final steps in identifying potential trades based on statistical testing.",
      pdfUrl: "/assets/pdfs/module10_trade_identification.pdf"
    },
    {
      id: 13,
      title: "Live Example 1",
      description: "Real-world example showcasing pair trading implementation.",
      pdfUrl: "/assets/pdfs/module10_live_example1.pdf"
    },
    {
      id: 14,
      title: "Live Example 2",
      description: "Continuation of real-world example, including position sizing.",
      pdfUrl: "/assets/pdfs/module10_live_example2.pdf"
    },
    {
      id: 15,
      title: "Calendar Spreads",
      description: "Introduction to calendar spreads and their application in trading.",
      pdfUrl: "/assets/pdfs/module10_calendar_spreads.pdf"
    },
    {
      id: 16,
      title: "Momentum Portfolios",
      description: "Building and managing momentum-based trading portfolios.",
      pdfUrl: "/assets/pdfs/module10_momentum_portfolios.pdf"
    }
  ]
}

  ,
 {
  id: 11,
  title: "Personal Finance - Mutual Funds",
  description: "Managing personal finances can help achieve financial goals. This module covers retirement planning, mutual funds, bonds, and goal-oriented investments.",
  duration: "5 hours",
  difficulty: "Intermediate",
  topics:[],
  completed:false,
  lessons: 32,
  progress: 0,
  icon: PieChart,
  sections: [
    {
      id: 1,
      title: "Background and Orientation",
      description: "Introduction highlighting the importance of starting personal finance and developing a financial mindset.",
      pdfUrl: "/assets/pdfs/module11_background_orientation.pdf"
    },
    {
      id: 2,
      title: "Personal Finance Math (Part 1)",
      description: "Understanding basic math concepts essential for managing personal finances effectively.",
      pdfUrl: "/assets/pdfs/module11_personal_finance_math_part1.pdf"
    },
    {
      id: 3,
      title: "Personal Finance Math (Part 2)",
      description: "Covers the time value of money and its application in financial planning.",
      pdfUrl: "/assets/pdfs/module11_personal_finance_math_part2.pdf"
    },
    {
      id: 4,
      title: "The retirement problem (Part 1)",
      description: "Addresses planning for retirement including identifying income sources and estimating expenses.",
      pdfUrl: "/assets/pdfs/module11_retirement_problem_part1.pdf"
    },
    {
      id: 5,
      title: "The retirement problem (Part 2)",
      description: "Focus on asset allocation in retirement planning across asset classes like fixed deposits, equities, etc.",
      pdfUrl: "/assets/pdfs/module11_retirement_problem_part2.pdf"
    },
    {
      id: 6,
      title: "Introduction to Mutual Funds",
      description: "Introduces mutual funds, their structure, and advantages over direct investing.",
      pdfUrl: "/assets/pdfs/module11_introduction_mutual_funds.pdf"
    },
    {
      id: 7,
      title: "Concept of fund & NAV",
      description: "Explains the net asset value concept and how it represents an investor's share.",
      pdfUrl: "/assets/pdfs/module11_concept_fund_nav.pdf"
    },
    {
      id: 8,
      title: "The mutual fund fact-sheet",
      description: "Guide to reading and understanding the information presented in mutual fund fact sheets.",
      pdfUrl: "/assets/pdfs/module11_mutual_fund_factsheet.pdf"
    },
    {
      id: 9,
      title: "The Equity scheme (Part 1)",
      description: "Details various categories of equity mutual funds and their characteristics.",
      pdfUrl: "/assets/pdfs/module11_equity_scheme_part1.pdf"
    },
    {
      id: 10,
      title: "The Equity scheme (Part 2)",
      description: "Focuses on mid-cap and multi-cap funds and their risk profiles.",
      pdfUrl: "/assets/pdfs/module11_equity_scheme_part2.pdf"
    },
    {
      id: 11,
      title: "The Debt funds (Part 1)",
      description: "Introduction to debt mutual funds and their categories.",
      pdfUrl: "/assets/pdfs/module11_debt_funds_part1.pdf"
    },
    {
      id: 12,
      title: "The Debt funds (Part 2)",
      description: "Explains overnight funds and risk considerations in debt funds.",
      pdfUrl: "/assets/pdfs/module11_debt_funds_part2.pdf"
    },
    {
      id: 13,
      title: "The Debt funds (Part 3)",
      description: "Discusses debt fund attributes and associated jargons.",
      pdfUrl: "/assets/pdfs/module11_debt_funds_part3.pdf"
    },
    {
      id: 14,
      title: "The Debt funds (Part 4)",
      description: "Addresses liquidity risk and lessons from debt fund controversies.",
      pdfUrl: "/assets/pdfs/module11_debt_funds_part4.pdf"
    },
    {
      id: 15,
      title: "Investing in Bonds",
      description: "Overview of bonds, their investment rationale, and markets.",
      pdfUrl: "/assets/pdfs/module11_investing_in_bonds.pdf"
    },
    {
      id: 16,
      title: "Index Funds",
      description: "Explains index funds, their structure, and investment approach.",
      pdfUrl: "/assets/pdfs/module11_index_funds.pdf"
    },
    {
      id: 17,
      title: "Arbitrage Funds",
      description: "Details arbitrage mutual funds and their role in portfolio management.",
      pdfUrl: "/assets/pdfs/module11_arbitrage_funds.pdf"
    },
    {
      id: 18,
      title: "Measuring Mutual Fund Returns",
      description: "Measures and interprets mutual fund returns and performance metrics.",
      pdfUrl: "/assets/pdfs/module11_measuring_mutual_fund_returns.pdf"
    },
    {
      id: 19,
      title: "Rolling Returns",
      description: "Coverage of rolling returns as a better reflection of mutual fund returns over time.",
      pdfUrl: "/assets/pdfs/module11_rolling_returns.pdf"
    },
    {
      id: 20,
      title: "Mutual Fund Expense Ratio, Direct, and Regular",
      description: "Explains expense ratios and the differences between direct and regular plans.",
      pdfUrl: "/assets/pdfs/module11_expense_ratio_direct_regular.pdf"
    },
    {
      id: 21,
      title: "Mutual Fund Benchmarking",
      description: "Discusses benchmarking of mutual funds for performance comparison.",
      pdfUrl: "/assets/pdfs/module11_mutual_fund_benchmarking.pdf"
    },
    {
      id: 22,
      title: "Mutual Fund Beta, Sharpe, and Sortino Ratios",
      description: "Covers key risk and performance ratios used in mutual fund analysis.",
      pdfUrl: "/assets/pdfs/module11_mutual_fund_beta_sharpe_sortino.pdf"
    },
    {
      id: 23,
      title: "Sortino and Capture Ratios",
      description: "Detailed exploration of Sortino ratio and capture ratios.",
      pdfUrl: "/assets/pdfs/module11_sortino_capture_ratios.pdf"
    },
    {
      id: 24,
      title: "How to Analyse Equity Mutual Funds",
      description: "Checklist and steps to analyse and choose equity mutual funds.",
      pdfUrl: "/assets/pdfs/module11_how_to_analyse_equity_mutual_funds.pdf"
    },
    {
      id: 25,
      title: "How to Analyse Debt Mutual Funds",
      description: "Checklist and steps for analysing debt mutual funds.",
      pdfUrl: "/assets/pdfs/module11_how_to_analyse_debt_mutual_funds.pdf"
    },
    {
      id: 26,
      title: "Mutual Fund Portfolio Construction",
      description: "Guidance on building a diversified mutual fund portfolio.",
      pdfUrl: "/assets/pdfs/module11_mutual_fund_portfolio_construction.pdf"
    },
    {
      id: 27,
      title: "Smart Beta Funds",
      description: "Introduction to smart beta funds and their investment strategy.",
      pdfUrl: "/assets/pdfs/module11_smart_beta_funds.pdf"
    },
    {
      id: 28,
      title: "Asset Allocation",
      description: "Understanding asset allocation and its importance in investing.",
      pdfUrl: "/assets/pdfs/module11_asset_allocation.pdf"
    },
    {
      id: 29,
      title: "Exchange Traded Funds (ETFs)",
      description: "Overview of ETFs and how they function.",
      pdfUrl: "/assets/pdfs/module11_etfs.pdf"
    },
    {
      id: 30,
      title: "Basics of Macro Economics",
      description: "Macro-economic factors influencing investment decisions and markets.",
      pdfUrl: "/assets/pdfs/module11_macro_economics.pdf"
    }
  ]
}
,
{
  id: 12,
  title: "Innerworth - Mind over markets",
  description: "A collection of newsletters on trading psychology published by Marketwise, originally from 2002-2007, acquired by Zerodha and made available to readers in India. Covers emotional and psychological aspects of trading for improving trader mindset and performance.",
  duration: "Varies",
  difficulty: "Intermediate",
  lessons: 50,
  topics:[],
  completed:false,
  progress: 0,
  icon: BookOpen,
  sections: [
    {
      id: 1,
      title: "Introducing ‘Innerworth – Mind over markets’",
      description: "Most people start trading lured by easy money prospects, but the market is tough. This introduction sets realistic expectations.",
      pdfUrl: "/assets/pdfs/module12_introducing_innerworth_mind_over_markets.pdf"
    },
    {
      id: 2,
      title: "Accurate Perceptions of Loss and Risk Aversion",
      description: "Explores how emotions like fear and greed distort investment decisions causing poor timing in buying and selling.",
      pdfUrl: "/assets/pdfs/module12_accurate_perceptions_loss_risk_aversion.pdf"
    },
    {
      id: 3,
      title: "Accepting Criticism",
      description: "Novice traders resist admitting mistakes leading to bad trading behaviors; learning to accept criticism is vital for growth.",
      pdfUrl: "/assets/pdfs/module12_accepting_criticism.pdf"
    },
    {
      id: 4,
      title: "Trading Capital: Size Matters",
      description: "Discusses how much capital is necessary to start trading and the common concerns newbies raise about capital needs.",
      pdfUrl: "/assets/pdfs/module12_trading_capital_size_matters.pdf"
    },
    {
      id: 5,
      title: "Action Oriented and Winning",
      description: "Trading is challenging and requires resilience; being action-oriented rather than hopeless is key to success.",
      pdfUrl: "/assets/pdfs/module12_action_oriented_and_winning.pdf"
    },
    {
      id: 6,
      title: "Focus on the Action, Not the Prize",
      description: "Stresses the importance of focusing on the trading process and actions, rather than outcomes or rewards.",
      pdfUrl: "/assets/pdfs/module12_focus_on_action_not_prize.pdf"
    },
    {
      id: 7,
      title: "Detailed Action Plans: A Precursor For Trading Success",
      description: "Success in trading requires deliberate planning and avoiding impulsive behaviors common in daily life.",
      pdfUrl: "/assets/pdfs/module12_detailed_action_plans.pdf"
    },
    {
      id: 8,
      title: "A Trading Fable",
      description: "A thought-provoking fable to elucidate trading concepts and mindset.",
      pdfUrl: "/assets/pdfs/module12_trading_fable.pdf"
    },
    {
      id: 9,
      title: "It’s Easier to Face Fear than Avoid It",
      description: "Facing the fear associated with trading and losses head-on is less damaging than avoidance.",
      pdfUrl: "/assets/pdfs/module12_facing_fear.pdf"
    },
    {
      id: 10,
      title: "Regret: A Powerful Emotion You Must Face",
      description: "The reality of actual monetary loss poses a challenge that traders must psychologically confront.",
      pdfUrl: "/assets/pdfs/module12_regret_powerful_emotion.pdf"
    },
    {
      id: 11,
      title: "The Unconscious Drive to Fail",
      description: "Some traders unknowingly adopt behaviors that sabotage their success despite conscious goals.",
      pdfUrl: "/assets/pdfs/module12_unconscious_drive_to_fail.pdf"
    },
    {
      id: 12,
      title: "False Consensus Effects",
      description: "Discusses traders’ tendency to overestimate others’ agreement with their decisions.",
      pdfUrl: "/assets/pdfs/module12_false_consensus_effects.pdf"
    }
  ]
}
,
  {
  id: 13,
  title: "Integrated Financial Modelling",
  description: "Learn to build financial models to analyze company financials, forecast statements, and perform valuations using Excel.",
  duration: "8-10 hours",
  difficulty: "Advanced",
  lessons: 18,
  progress: 0,
  topics: [
    "Financial Modelling",
    "Excel",
    "Valuation"
  ],
  completed: false,
  icon: BookOpen,
  sections: [
    {
      id: 1,
      title: "Introduction to Financial Modelling",
      description: "Overview and approach to integrated financial modelling including uncertainty and non-linear learning.",
      pdfUrl: "/pdfs/module13/introduction_to_financial_modelling.pdf"
    },
    {
      id: 2,
      title: "Excel workbook setup",
      description: "Setting up the Excel workbook systematically for financial modelling with consistent layouts.",
      pdfUrl: "/pdfs/module13/excel_workbook_setup.pdf"
    },
    {
      id: 3,
      title: "Historical Data",
      description: "Extracting and inputting historical data from company annual reports into Excel.",
      pdfUrl: "/pdfs/module13/historical_data.pdf"
    },
    {
      id: 4,
      title: "Assumptions (Part 1)",
      description: "Setting up assumptions and maintaining model integrity with realistic inputs.",
      pdfUrl: "/pdfs/module13/assumptions_part1.pdf"
    },
    {
      id: 5,
      title: "Assumptions (Part 2)",
      description: "Advanced assumptions including deferred tax and adjustments.",
      pdfUrl: "/pdfs/module13/assumptions_part2.pdf"
    },
    {
      id: 6,
      title: "Revenue model",
      description: "Building a logical revenue model based on business basics.",
      pdfUrl: "/pdfs/module13/revenue_model.pdf"
    },
    {
      id: 7,
      title: "Asset Schedule (Part 1)",
      description: "Constructing detailed asset schedules including plant and machinery.",
      pdfUrl: "/pdfs/module13/asset_schedule_part1.pdf"
    },
    {
      id: 8,
      title: "Asset Schedule (Part 2)",
      description: "Continuing asset schedules covering depreciation and CAPEX.",
      pdfUrl: "/pdfs/module13/asset_schedule_part2.pdf"
    },
    {
      id: 9,
      title: "Debt Schedule",
      description: "Formulating the debt schedule and related interest projections.",
      pdfUrl: "/pdfs/module13/debt_schedule.pdf"
    },
    {
      id: 10,
      title: "Reserves Schedule (Part 1)",
      description: "Building reserves including share capital and retained earnings.",
      pdfUrl: "/pdfs/module13/reserves_schedule_part1.pdf"
    },
    {
      id: 11,
      title: "Reserves Schedule (Part 2)",
      description: "Completing the reserves schedule and integrating with overall balance sheet.",
      pdfUrl: "/pdfs/module13/reserves_schedule_part2.pdf"
    },
    {
      id: 12,
      title: "Projections",
      description: "Forecasting financial statements for multiple years.",
      pdfUrl: "/pdfs/module13/projections.pdf"
    },
    {
      id: 13,
      title: "Cash flow statement",
      description: "Deriving cash flow using the indirect method linking P&L and balance sheet.",
      pdfUrl: "/pdfs/module13/cash_flow_statement.pdf"
    },
    {
      id: 14,
      title: "Valuation (Part 1)",
      description: "Introduction to valuation basics and methods.",
      pdfUrl: "/pdfs/module13/valuation_part1.pdf"
    },
    {
      id: 15,
      title: "Valuation (Part 2)",
      description: "Building valuation blocks like FCFF and FCFE.",
      pdfUrl: "/pdfs/module13/valuation_part2.pdf"
    },
    {
      id: 16,
      title: "Valuation (Part 3)",
      description: "Exploring risk premium and tax shield elements.",
      pdfUrl: "/pdfs/module13/valuation_part3.pdf"
    },
    {
      id: 17,
      title: "Weighted average cost of capital",
      description: "Calculating WACC and terminal growth rate assumptions.",
      pdfUrl: "/pdfs/module13/wacc_terminal_growth.pdf"
    },
    {
      id: 18,
      title: "Discounted cash flow analysis",
      description: "Applying DCF method to complete valuation.",
      pdfUrl: "/pdfs/module13/dcf_analysis.pdf"
    }
  ]
}
,
  {
  id: 14,
  title: "Personal Finance - Insurance",
  description: "Understanding health and related insurance products, their nuances, and how to make well-informed insurance purchase decisions.",
  duration: "3 hours",
  difficulty: "Beginner to Intermediate",
  lessons: 9,
  progress: 0,
  icon: BookOpen,
  topics: [
    "Health Insurance Basics",
    "Claim Process and Pitfalls",
    "Insurance Coverage and Premiums",
    "Co-payments and Room Restrictions",
    "Medical Declarations and Waiting Periods",
    "Types of Insurance Plans",
    "Insurance Discounts and Plans",
    "Insurance Product Analysis",
    "Consumables and Bill Components"
  ],
  completed: false,
  sections: [
    {
      id: 1,
      title: "Introduction",
      description: "Overview of financial vulnerability due to medical emergencies and the critical role of health insurance.",
      pdfUrl: "/pdfs/personal-finance/insurance/introduction.pdf"
    },
    {
      id: 2,
      title: "Perverse Incentives",
      description: "Understanding application process and common claim rejection pitfalls.",
      pdfUrl: "/pdfs/personal-finance/insurance/perverse-incentives.pdf"
    },
    {
      id: 3,
      title: "The Nudge",
      description: "Exploring insurance coverage amounts, premiums, and consumer behavior impacts.",
      pdfUrl: "/pdfs/personal-finance/insurance/the-nudge.pdf"
    },
    {
      id: 4,
      title: "Skin in the Game",
      description: "Details of co-payment clauses and room rent limits in insurance policies.",
      pdfUrl: "/pdfs/personal-finance/insurance/skin-in-the-game.pdf"
    },
    {
      id: 5,
      title: "Dunning Kruger",
      description: "Medical declaration complexities, pre-existing conditions, and loading charges.",
      pdfUrl: "/pdfs/personal-finance/insurance/dunning-kruger.pdf"
    },
    {
      id: 6,
      title: "A Mighty Defence",
      description: "Insights into specified illnesses, sub-limits, exclusions, and blacklists in insurance.",
      pdfUrl: "/pdfs/personal-finance/insurance/a-mighty-defence.pdf"
    },
    {
      id: 7,
      title: "No Free Lunch",
      description: "Analysis of family floater plans, group insurance, discounts, and employee plans.",
      pdfUrl: "/pdfs/personal-finance/insurance/no-free-lunch.pdf"
    },
    {
      id: 8,
      title: "Gimmick or Not - Part 1",
      description: "Investigation into insurance product terms, pricing, and potential consumer traps.",
      pdfUrl: "/pdfs/personal-finance/insurance/gimmick-or-not-1.pdf"
    },
    {
      id: 9,
      title: "Gimmick or Not - Part 2",
      description: "Understanding bill components like consumables and the fine print in insurance claims.",
      pdfUrl: "/pdfs/personal-finance/insurance/gimmick-or-not-2.pdf"
    }
  ]
},
{
  id: 15,
  title: "Sector Analysis",
  description: "A thorough exploration of various sectors as investment avenues, helping understand sector-specific factors, value chains, performance metrics, and competitive dynamics for better stock picking decisions.",
  duration: "6-8 hours",
  difficulty: "Intermediate",
  lessons: 15,
  progress: 0,
  topics:[],
  completed:false,
  icon: ChartPie,
  sections: [
    {
      id: 1,
      title: "Sector analysis overview",
      description: "Introduction to the module, understanding sectors, industries, value chains, and sector analysis frameworks like PESTLE.",
      pdfUrl: "/pdfs/sector-analysis/overview.pdf"
    },
    {
      id: 2,
      title: "Cement",
      description: "Detailed study of the cement sector including value chain, vertical integration, and industry dynamics.",
      pdfUrl: "/pdfs/sector-analysis/cement.pdf"
    },
    {
      id: 3,
      title: "Insurance (Part 1)",
      description: "Introduction to the insurance industry covering types of insurance and market structure.",
      pdfUrl: "/pdfs/sector-analysis/insurance-part1.pdf"
    },
    {
      id: 4,
      title: "Insurance (Part 2)",
      description: "Detailed analysis of insurance companies including sales channels and risks.",
      pdfUrl: "/pdfs/sector-analysis/insurance-part2.pdf"
    },
    {
      id: 5,
      title: "Information Technology",
      description: "Metrics specific to the IT industry and its unique characteristics.",
      pdfUrl: "/pdfs/sector-analysis/information-technology.pdf"
    },
    {
      id: 6,
      title: "Automobiles (Part 1)",
      description: "Overview of the automotive sector as a manufacturing industry.",
      pdfUrl: "/pdfs/sector-analysis/automobiles-part1.pdf"
    },
    {
      id: 7,
      title: "Automobiles (Part 2)",
      description: "Further insights into automotive sector dynamics.",
      pdfUrl: "/pdfs/sector-analysis/automobiles-part2.pdf"
    },
    {
      id: 8,
      title: "Banking (Part 1)",
      description: "Introduction to the banking sector emphasizing digital evolution and account opening.",
      pdfUrl: "/pdfs/sector-analysis/banking-part1.pdf"
    },
    {
      id: 9,
      title: "Banking (Part 2)",
      description: "Techniques and parameters to analyze banks including asset quality and capital adequacy.",
      pdfUrl: "/pdfs/sector-analysis/banking-part2.pdf"
    },
    {
      id: 10,
      title: "Steel (Part 1)",
      description: "Study of steel industry, grades, forms, and applications.",
      pdfUrl: "/pdfs/sector-analysis/steel-part1.pdf"
    },
    {
      id: 11,
      title: "Steel (Part 2)",
      description: "Advanced concepts and production details in the steel sector.",
      pdfUrl: "/pdfs/sector-analysis/steel-part2.pdf"
    },
    {
      id: 12,
      title: "Hotels (Part 1)",
      description: "Examining the hotel sector as a part of the economy's building blocks.",
      pdfUrl: "/pdfs/sector-analysis/hotels-part1.pdf"
    },
    {
      id: 13,
      title: "Hotels (Part 2)",
      description: "Value and aspirational features of the hotels sector.",
      pdfUrl: "/pdfs/sector-analysis/hotels-part2.pdf"
    },
    {
      id: 14,
      title: "Retail (Part 1)",
      description: "Understanding retail sector strategies and product placements.",
      pdfUrl: "/pdfs/sector-analysis/retail-part1.pdf"
    },
    {
      id: 15,
      title: "Retail (Part 2)",
      description: "Measuring retail business efficiency and pricing strategies.",
      pdfUrl: "/pdfs/sector-analysis/retail-part2.pdf"
    }
  ]
}
,{
  id: 16,
  title: "Social Stock Exchanges (SSEs)",
  description: "Introduction and detailed exploration of Social Stock Exchanges, their role in bridging social enterprises with investors, fundraising instruments, regulatory framework, and operational insights.",
  duration: "4-5 hours",
  difficulty: "Intermediate",
  lessons: 4,
  topics:[],
  completed: false,
  progress: 0,
  icon: BookOpen,
  sections: [
    {
      id: 1,
      title: "Social Stock Exchanges – An Introduction",
      description: "Overview of SSEs as platforms connecting donors with social enterprises, regulatory background, and operational dynamics.",
      pdfUrl: "/pdfs/social-stock-exchange/introduction.pdf"
    },
    {
      id: 2,
      title: "Who can raise funds on SSE?",
      description: "Explaining the eligibility criteria of entities allowed to list and raise funds on SSE, including Non-Profit Organizations and For-Profit Social Enterprises.",
      pdfUrl: "/pdfs/social-stock-exchange/who-can-raise-funds.pdf"
    },
    {
      id: 3,
      title: "Modes of raising funds (Part 1) : ZCZP and other instruments",
      description: "Introduction to fundraising instruments on SSE, focusing on Zero Coupon Zero Principal bonds and their unique characteristics.",
      pdfUrl: "/pdfs/social-stock-exchange/modes-raising-funds-part1.pdf"
    },
    {
      id: 4,
      title: "Modes of raising funds (Part 2)",
      description: "Covering additional fundraising instruments such as development impact bonds and donations, their functioning and regulatory aspects.",
      pdfUrl: "/pdfs/social-stock-exchange/modes-raising-funds-part2.pdf"
    }
  ]
},
{
  id: 17,
  title: "NPS: National Pension Scheme",
  description: "Comprehensive guide to National Pension Scheme (NPS), covering its features, contribution rules, investment options, tax benefits, withdrawal norms, and associated products.",
  duration: "4-5 hours",
  difficulty: "Intermediate",
  lessons: 9,
  topics:[],
  completed: false,
  progress: 0,
  icon: PenIcon,
  sections: [
    {
      id: 1,
      title: "Introduction",
      description: "Overview of NPS, its purpose, regulatory framework, and key features including contributions, annuity, and tax benefits.",
      pdfUrl: "/pdfs/nps/introduction.pdf"
    },
    {
      id: 2,
      title: "NPS vs other retirement plans",
      description: "Comparative analysis of NPS with other retirement savings options highlighting pros and cons.",
      pdfUrl: "/pdfs/nps/nps-vs-other-retirement-plans.pdf"
    },
    {
      id: 3,
      title: "Investment Options",
      description: "Details on Tier I and Tier II accounts, including asset classes, fund managers, and allocation strategies.",
      pdfUrl: "/pdfs/nps/investment-options.pdf"
    },
    {
      id: 4,
      title: "Exit & Withdrawals",
      description: "Rules regarding premature withdrawals, pension payouts, and account closure conditions.",
      pdfUrl: "/pdfs/nps/exit-withdrawals.pdf"
    },
    {
      id: 5,
      title: "NPS Tier II Account",
      description: "Features and limitations of the voluntary Tier II account meant for investment and liquidity.",
      pdfUrl: "/pdfs/nps/tier-ii-account.pdf"
    },
    {
      id: 6,
      title: "NPS Tax Rules & Benefits",
      description: "Tax benefits under various sections of the Income Tax Act regarding contribution and maturity.",
      pdfUrl: "/pdfs/nps/tax-rules-benefits.pdf"
    },
    {
      id: 7,
      title: "NPS Structure, Fees, How to Open Account & SIP",
      description: "Explains the organizational structure of NPS, associated charges, and steps to open and start investing through SIP.",
      pdfUrl: "/pdfs/nps/structure-fees-opening.pdf"
    },
    {
      id: 8,
      title: "NPS Vatsalya",
      description: "Investment scheme aimed at securing future of minors with special features.",
      pdfUrl: "/pdfs/nps/vatsalya.pdf"
    },
    {
      id: 9,
      title: "Corporate NPS",
      description: "Details of NPS schemes offered through employers and corporates.",
      pdfUrl: "/pdfs/nps/corporate-nps.pdf"
    }
  ]
}


];
