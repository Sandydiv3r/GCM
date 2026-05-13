import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import type { ArtistProfile, Artwork, ArtworkImage } from "@haippa/db";

type ArtistWithArtwork = ArtistProfile & { artworks: (Artwork & { images: ArtworkImage[] })[] };

export function ArtistCard({ artist }: { artist: ArtistWithArtwork }) {
  const previewImage = artist.artworks[0]?.images[0];
  return (
    <Link href={`/artists/${artist.slug}`} className="group flex flex-col items-center text-center">
      <div className="relative w-20 h-20 mb-3">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-sand-300 ring-2 ring-sand-300 group-hover:ring-primary-400 transition-all">
          {artist.profileImageUrl ? (
            <Image src={artist.profileImageUrl} alt={artist.displayName} fill className="object-cover" />
          ) : previewImage ? (
            <Image src={previewImage.url} alt={artist.displayName} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-display text-2xl font-semibold">
              {artist.displayName.charAt(0)}
            </div>
          )}
        </div>
        {artist.isVerified && (
          <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5">
            <CheckCircle size={14} className="text-primary-500 fill-primary-100" />
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-charcoal-900 line-clamp-1 group-hover:text-primary-500 transition-colors">{artist.displayName}</p>
      <p className="text-xs text-charcoal-500 mt-0.5">{artist.country}</p>
    </Link>
  );
}
