"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules"
import { BookOpenIcon, GraduationCapIcon } from "lucide-react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { Badge } from "@/components/ui/badge"
import { ChildCard } from "./ChildCard"
import { ChildReportModal } from "./ChildReportModal"
import { ChildData, ParentDashboardCarouselProps } from "./types"

interface ExtendedParentDashboardCarouselProps extends ParentDashboardCarouselProps {
  sidebarCollapsed?: boolean
}

export const ParentDashboardCarousel: React.FC<ExtendedParentDashboardCarouselProps> = ({
  childrenData,
  autoplayDelay = 4000,
  showPagination = true,
  showNavigation = true,
  sidebarCollapsed = false,
}) => {
  const [selectedChild, setSelectedChild] = useState<ChildData | null>(null)

  const handleCardClick = (child: ChildData) => {
    setSelectedChild(child)
  }

  // Professional CSS for carousel styling
  const carouselStyles = `
    .parent-dashboard-swiper {
      width: 100%;
      padding-bottom: 60px;
      padding-top: 20px;
    }
    
    .parent-dashboard-swiper .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 280px;
      height: 450px;
      transition: all 0.3s ease;
    }
    
    .parent-dashboard-swiper .swiper-3d .swiper-slide-shadow-left,
    .parent-dashboard-swiper .swiper-3d .swiper-slide-shadow-right {
      background: none;
    }

    .parent-dashboard-swiper .swiper-button-next, 
    .parent-dashboard-swiper .swiper-button-prev {
      color: hsl(var(--foreground));
      background: hsl(var(--card));
      backdrop-filter: blur(8px);
      border-radius: 50%;
      width: 48px;
      height: 48px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      border: 1px solid hsl(var(--border));
      z-index: 20;
    }

    .parent-dashboard-swiper .swiper-button-next:hover, 
    .parent-dashboard-swiper .swiper-button-prev:hover {
      background: hsl(var(--accent));
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .parent-dashboard-swiper .swiper-button-next::after, 
    .parent-dashboard-swiper .swiper-button-prev::after {
      font-size: 18px !important;
    }

    .parent-dashboard-swiper .swiper-pagination-bullet {
      background: hsl(var(--muted-foreground)) !important;
      opacity: 0.5;
      width: 10px;
      height: 10px;
      transition: all 0.2s ease;
    }

    .parent-dashboard-swiper .swiper-pagination-bullet-active {
      background: hsl(var(--primary)) !important;
      opacity: 1;
      transform: scale(1.2);
    }

    .parent-dashboard-swiper .swiper-pagination {
      bottom: 20px !important;
    }
  `

  // If sidebar is collapsed, show a simple grid layout instead of carousel
  if (sidebarCollapsed) {
    return (
      <section className="w-full space-y-6">
        <div className="mx-auto w-full max-w-7xl rounded-2xl border border-border bg-card p-6 shadow-sm card-subtle">
          <div className="relative mx-auto flex w-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
            
            {/* Simplified Header for collapsed state */}
            <div className="relative mb-8 text-center">
              <Badge
                variant="outline"
                className="mb-4 rounded-xl border-border bg-muted/50 text-base text-primary font-medium px-4 py-2"
              >
                <BookOpenIcon className="mr-2 size-4 text-primary" />
                Parent Dashboard
              </Badge>
              
              <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">
                Your Children's Progress
                <GraduationCapIcon className="inline-block ml-3 size-6 text-primary animate-float" />
              </h2>
              <p className="text-base text-muted-foreground max-w-xl mx-auto">
                Quick overview of all learning activities
              </p>
            </div>

            {/* Grid Layout for collapsed sidebar - NO SLIDER */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
              {childrenData.map((child) => (
                <div key={child.id} className="w-full max-w-[280px]">
                  <ChildCard child={child} onClick={handleCardClick} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <ChildReportModal
          child={selectedChild}
          onClose={() => setSelectedChild(null)}
        />
      </section>
    )
  }

  // Original carousel layout for expanded sidebar
  return (
    <section className="w-full space-y-6">
      <style>{carouselStyles}</style>
      
      <div className="mx-auto w-full max-w-6xl rounded-2xl border border-border bg-card p-3 shadow-sm card-subtle">
        <div className="relative mx-auto flex w-full flex-col rounded-xl border border-border bg-card p-3 shadow-sm">
          
          {/* Header with professional styling */}
          <div className="relative mb-8 p-6">
            <Badge
              variant="outline"
              className="absolute left-0 top-0 rounded-xl border-border bg-muted/50 text-base text-primary font-medium px-4 py-2"
            >
              <BookOpenIcon className="mr-2 size-4 text-primary" />
              Parent Dashboard
            </Badge>
            
            <div className="pt-16 text-center">
              <h2 className="text-4xl font-bold tracking-tight text-primary mb-4">
                Track Your Children's Learning Journey
                <GraduationCapIcon className="inline-block ml-3 size-8 text-primary animate-float" />
              </h2>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                Monitor progress, celebrate achievements, and support their educational growth
              </p>
            </div>
          </div>

          {/* Carousel */}
          <div className="flex w-full items-center justify-center">
            <div className="w-full">
              <Swiper
                spaceBetween={30}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={childrenData.length > 1}
                slidesPerView="auto"
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 150,
                  modifier: 1.5,
                  slideShadows: false,
                }}
                pagination={
                  showPagination
                    ? { 
                        clickable: true, 
                        dynamicBullets: true,
                        dynamicMainBullets: 3
                      }
                    : false
                }
                navigation={showNavigation}
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                className="parent-dashboard-swiper"
              >
                {childrenData.map((child) => (
                  <SwiperSlide key={child.id}>
                    <ChildCard child={child} onClick={handleCardClick} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <ChildReportModal
        child={selectedChild}
        onClose={() => setSelectedChild(null)}
      />
    </section>
  )
}