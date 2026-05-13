import Link from "next/link";
import Image from "next/image";
import type { Artwork, ArtworkImage, ArtistProfile } from "@haippa/db";

type ArtworkWithDetails = Artwork & { images: ArtworkImage[]; artistProfile: ArtistProfile };

export function ArtworkCard({ artwork }: { artwork: ArtworkWithDetails }) {
  const primaryImage = artwork.images[0];
  const formattedPrice = new Intl.NumberFormat("en-GB", { style: "currency", currency: artwork.currency, minimumFractionDigits: 0 }).format(artwork.price / 100);

  return (
    <Link href={`/artworks/${artwork.id}`} className="group block">
      <div className="artwork-card">
        <div className="relative aspect-[3/4] bg-sand-300 rounded-sm overflow-hidden mb-3">
          {primaryImage ? (
            <Image src={primaryImage.url} alt={primaryImage.altText ?? artwork.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-sand-200">
              <span className="text-sand-500 text-xs">No image</span>
            </div>
          )}
          {artwork.status === "SOLD" && (
            <div className="absolute inset-0 bg-charcoal-900/60 flex items-center justify-center">
              <span className="bg-white text-charcoal-900 text-xs font-semibold px-3 py-1 rounded-sm tracking-wider uppercase">Sold</span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            {artwork.originality === "ORIGINAL" && <span className="badge-verified">Original</span>}
            {artwork.originality === "LIMITED_PRINT" && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700">Limited</span>}
          </div>
        </div>
        <div>
          <p className="text-xs text-charcoal-500 mb-0.5">{artwork.artistProfile.displayName}</p>
          <h3 className="font-medium text-charcoal-900 text-sm line-clamp-1 group-hover:text-primary-500 transition-colors">{artwork.title}</h3>
          <p className="text-xs text-charcoal-500 mt-0.5">{artwork.medium}</p>
          <p className="price-tag text-sm mt-2">{formattedPrice}</p>
        </div>
      </div>
    </Link>
  );
}
