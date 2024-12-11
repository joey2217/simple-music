import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { fetchBanner } from '../../api/migu'
import { BannerItem } from '@/main/types/migu'
import { Link } from 'react-router'
import Image from '@/main/components/Image'

export default function Banner() {
  const [banners, setBanners] = useState<BannerItem[]>([])

  useEffect(() => {
    fetchBanner().then(setBanners)
  }, [])

  return (
    <Carousel className="w-full" opts={{ loop: true }}>
      <CarouselContent>
        {banners.map((b) => (
          <CarouselItem key={b.url}>
            <Link to={b.url} className="h-80 w-screen relative" title={b.title}>
              <Image
                src={b.image}
                alt={b.title}
                className="h-full w-full object-cover"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className="rounded-none h-1/2 w-10 opacity-50"
        variant="outline"
      />
      <CarouselNext
        className="rounded-none h-1/2 w-10 opacity-50"
        variant="outline"
      />
      <CarouselNavigation />
    </Carousel>
  )
}
