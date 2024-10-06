'use client'
import { Card, CardContent } from "@/components/ui/card";
import { ButtonV2 } from "@/components/button/ButtonV2";
import { useRouter } from "next/navigation";

const BookingSection = () => {
  const router = useRouter();
  return (
    <Card className="bg-primary/5">
      <CardContent className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Ready to Start Your Wellness Journey?</h2>
        <p className="text-sm mb-4 text-muted-foreground">Book a consultation with our Ayurvedic experts and take the first step towards holistic health.</p>
        <ButtonV2 onClick={() => router.push("/new-appointment")} variant={"shine"} size="default">
          Book an Appointment
        </ButtonV2>
      </CardContent>
    </Card>
  );
};

export default BookingSection;