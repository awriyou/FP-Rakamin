import Slider from './components/Slider';
import BannerPromotion from './components/BannerPromotion';
import WhyUs from './components/WhyUs';
import Category from './components/Category';
import Brands from './components/Brands';
import Contact from './components/Contact';
import FeedbackForm from './components/FeedbackForm';
import Footer from './components/Footer';


//tess
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
