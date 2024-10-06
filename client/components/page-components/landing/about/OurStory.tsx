import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const OurStory = () => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Our Story</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">
          Founded in 2000 by Moyudu Gurikkal, Ayurveda Health Center began with a vision to spread the good power of nature and Ayurveda. Over the years, we have evolved into a comprehensive wellness center, dedicated to transforming lives through holistic health practices.
        </p>
        <p className="mb-8 indent-10 text-xl">
          Ayurveda, the timeless science of life, offers a comprehensive and natural approach to health and well-being. Grounded in nature, it harmonizes the body, mind, and soul through customized therapies, herbal remedies, and mindful practices. We prioritize natural healing, avoiding allopathic medicines with potential side effects.
        </p>
        <p className="mb-4 indent-10 text-xl">
          With over a century of rich heritage and expertise, we provide exceptional service rooted in tradition and excellence. Our facility also offers Kalari classes, preserving this ancient martial art as part of a holistic lifestyle. Embrace Ayurveda and Kalari with us for a balanced, vibrant life free from the drawbacks of modern medicine.
        </p>
      </CardContent>
    </Card>
  );
};

export default OurStory;
