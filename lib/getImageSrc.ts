import imgPlaceholder from '@/public/assets/images/img-placeholder.webp'

type MediaType =
  | string
  | { url?: string; secure_url?: string }
  | Array<{ url?: string; secure_url?: string }>
  | undefined
  | null

export function getImageSrc(media: MediaType): string {
  try {
    if (!media) return imgPlaceholder.src
    // If already a string URL
    if (typeof media === 'string') return media

    // If it's an array, prefer the first element's secure_url/url
    if (Array.isArray(media)) {
      const first = media[0]
      if (first?.secure_url) return first.secure_url
      if (first?.url) return first.url
      return imgPlaceholder.src
    }

    // Object case
    if (typeof media === 'object') {
      if (media.secure_url) return media.secure_url
      if (media.url) return media.url
    }

    return imgPlaceholder.src
  } catch {
    return imgPlaceholder.src
  }
}

export default getImageSrc
