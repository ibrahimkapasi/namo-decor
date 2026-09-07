import { getGoogleReviews } from "@/lib/google-places";
import { ReviewsSection } from "./reviews-section";

export async function ReviewsServer() {
  const result = await getGoogleReviews();
  if (result.status !== "ready" || result.reviews.length === 0) return null;
  return <ReviewsSection result={result} />;
}
