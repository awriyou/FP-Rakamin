
import Slider from '@/app/components/Slider';
import BannerPromotion from '@/app/components/BannerPromotion';
import WhyUs from '@/app/components/WhyUs';
import Category from '@/app/components/Category';
import Brands from '@/app/components/Brands';
import Contact from '@/app/components/Contact';
import FeedbackForm from '@/app/components/FeedbackForm';
import Footer from '@/app/components/Footer';
export default function Home() {
  return (
    <main>
      <Slider />
      <BannerPromotion/>
      <WhyUs />
      <Category />
      <Brands />
      <Contact />
      <FeedbackForm />
      <Footer />
    </main>
  );
}
