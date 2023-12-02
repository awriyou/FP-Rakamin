
import Slider from '@/app/components/Slider';
import BannerPromotion from '@/app/components/BannerPromotion';
import WhyUs from '@/app/components/WhyUs';
import Category from '@/app/components/Category';
import Brands from '@/app/components/Brands';
import Contact from '@/app/components/Contact';
import FeedbackForm from '@/app/components/FeedbackForm';
import Footer from '@/app/components/Footer';

const images = [
  "images/jumbotron-1.png",
  "images/jumbotron-2.png",
  "images/jumbotron-3.png",
  "images/jumbotron-4.png",
  "images/jumbotron-5.png",
];

export default function Home() {
  return (
    <main>
      <div>
        <Slider autoSlide={true}>
          {images.map((each) => (
            <img src= {each}/>
          ))}
        </Slider>
      </div>
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
