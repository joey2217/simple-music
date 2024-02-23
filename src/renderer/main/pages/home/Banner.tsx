import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { BannerItem } from '../../types/migu'
import { fetchBanner } from '../../api/migu'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Link } from 'react-router-dom'

const Banner: React.FC = () => {
  const [banner, setBanners] = useState<BannerItem[]>([])

  useEffect(() => {
    fetchBanner().then(setBanners)
  }, [])

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {banner.map((b, index) => (
        <SwiperSlide key={index}>
          <Link to={b.url} className="h-80 w-screen relative">
            <img
              src={b.image}
              alt={b.title}
              className="h-full w-full object-cover"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Banner
