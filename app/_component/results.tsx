import { Button } from "@/components/ui/button";
import { AppScreen, GiftRecommendation } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface ResultProps {
  setScreen: (screen: AppScreen) => void;
  results: GiftRecommendation[];
  onSaveGift: (gift: GiftRecommendation) => void;
}

export const Results = ({ setScreen, results, onSaveGift }: ResultProps) => {
  return (
    <div className="flex flex-col items-center p-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Top Recommendations
      </h1>
      <div className="grid gap-6 w-full max-w-2xl">
        {results.map((gift, index) => (
          <Card key={index} className="w-full overflow-hidden flex flex-col">
            {gift.image && (
              <div className="w-full h-48 overflow-hidden bg-gray-200">
                <img
                  src={gift.image}
                  alt={gift.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl text-pink-500">
                  {gift.name}
                </CardTitle>
                <p className="font-bold text-green-600">{gift.price}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {gift.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-blue-100 text-blue-800 font-bold text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4 grow">
              <div>
                <h4 className="font-semibold text-xs uppercase text-gray-800">
                  Why this gift?
                </h4>
                <p className="text-gray-500 text-sm">{gift.why}</p>
              </div>
              <div>
                <h4 className="font-semibold text-xs uppercase text-gray-800">
                  Try this activity
                </h4>
                <p className="text-gray-500 italic text-sm">{gift.activity}</p>
              </div>
            </CardContent>
            <CardContent className="space-y-4 grow">
              {gift.onlineShops && gift.onlineShops.length > 0 && (
                <div className="pt-2 border-t border-gray-200">
                  <h4 className="font-semibold text-xs uppercase text-gray-800 mb-2">
                    Where to buy:
                  </h4>
                  <div className="flex flex-col gap-2">
                    {gift.onlineShops.map((shop, sIndex) => (
                      <a
                        key={sIndex}
                        href={shop.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-md bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-blue-600 group-hover:underline">
                            {shop.name}
                          </span>
                          {shop.note && (
                            <span className="text-[10px] text-gray-500">
                              {shop.note}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <div className="p-4 pt-0 mt-auto">
              <Button
                onClick={() => onSaveGift(gift)}
                className="w-full gap-2"
                variant="secondary"
              >
                <Heart className="w-4 h-4" /> Buy later
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-10 mb-20">
        <Button onClick={() => setScreen(AppScreen.HOME)} variant="outline">
          Start Again
        </Button>
      </div>
    </div>
  );
};
