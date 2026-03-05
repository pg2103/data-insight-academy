import { Card, CardContent } from "@/components/ui/card";

const PlatformIntroCard = () => {
  return (
    <Card className="shadow-card mb-10">
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-4">
            <span className="text-sm text-primary font-medium">
              Data Insight Learning Platform
            </span>

            <h1 className="text-3xl font-bold">
              Learn Financial Markets Step-by-Step
            </h1>

            <p className="text-muted-foreground leading-relaxed">
              Explore financial markets through structured learning modules.
              Download step-by-step PDFs covering stock markets, technical
              analysis, derivatives, trading systems, and personal finance.
              Each module is designed to build real understanding so you can
              confidently analyze markets and investments.
            </p>

            <p className="text-muted-foreground">
              Study at your own pace and build strong financial knowledge
              through practical and well-organized learning material.
            </p>
          </div>

          {/* RIGHT SIDE VIDEO */}
          <div className="rounded-xl overflow-hidden bg-muted">
  <video
    controls
    preload="none"
    poster="/assets/video-thumbnail.png"
    className="w-full h-full rounded-lg"
  >
    <source src="/assets/platform-intro.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformIntroCard;