import { features } from "./featureData";

interface FeaturesSectionProps {
  title?: string;
}

export default function FeaturesSection({
  title = "Buying with pludo",
}: FeaturesSectionProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-100">
        {title}
      </h2>
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-lg border border-white/30">
        <div className="grid gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <feature.icon className="w-8 h-8 text-gray-200" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
