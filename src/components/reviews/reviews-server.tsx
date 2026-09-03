import { getGoogleReviews } from "@/lib/google-places";
import { ReviewsSection } from "./reviews-section";

export async function ReviewsServer() {
  return <ReviewsSection result={await getGoogleReviews()} />;
}
