import "server-only";

export type GoogleReview = {
  id: string;
  authorName: string;
  authorUri?: string;
  rating: number;
  text: string;
  relativeTime?: string;
  profilePhotoUrl?: string;
  googleMapsUri: string;
};

export type ReviewsResult =
  | { status: "ready"; placeName: string; rating?: number; reviewCount?: number; googleMapsUri: string; reviews: GoogleReview[] }
  | { status: "unconfigured" }
  | { status: "empty"; placeName: string; rating?: number; reviewCount?: number; googleMapsUri: string }
  | { status: "error" };

type PlacesResponse = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    name?: string;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    rating?: number;
    googleMapsUri?: string;
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }>;
};

export async function getGoogleReviews(): Promise<ReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return { status: "unconfigured" };

  try {
    const fields = "id,displayName,formattedAddress,rating,userRatingCount,googleMapsUri,reviews";
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: { "X-Goog-Api-Key": apiKey, "X-Goog-FieldMask": fields },
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      console.error("Google Places review request failed.", { status: response.status });
      return { status: "error" };
    }

    const place = (await response.json()) as PlacesResponse;
    const placeName = place.displayName?.text?.trim() ?? "";
    const address = place.formattedAddress?.toLowerCase() ?? "";
    const isExpectedBusiness = place.id === placeId
      && placeName.toLowerCase() === "namo decor"
      && address.includes("kandivali east")
      && address.includes("mumbai");
    if (!isExpectedBusiness || !place.googleMapsUri) {
      console.error("Configured Google Place ID did not resolve to Namo Decor in Kandivali East, Mumbai.");
      return { status: "error" };
    }

    const reviews: GoogleReview[] = (place.reviews ?? []).flatMap((review, index) => {
      const authorName = review.authorAttribution?.displayName?.trim();
      const text = review.text?.text?.trim() || review.originalText?.text?.trim();
      if (!authorName || !text || typeof review.rating !== "number" || !review.googleMapsUri) return [];
      return [{
        id: review.name ?? `${placeId}-${index}`,
        authorName,
        authorUri: review.authorAttribution?.uri,
        rating: review.rating,
        text,
        relativeTime: review.relativePublishTimeDescription,
        profilePhotoUrl: review.authorAttribution?.photoUri,
        googleMapsUri: review.googleMapsUri,
      }];
    });
    const common = { placeName, rating: place.rating, reviewCount: place.userRatingCount, googleMapsUri: place.googleMapsUri };
    return reviews.length ? { status: "ready", ...common, reviews } : { status: "empty", ...common };
  } catch (error) {
    console.error("Unable to load Google reviews.", error instanceof Error ? error.message : "Unknown error");
    return { status: "error" };
  }
}
