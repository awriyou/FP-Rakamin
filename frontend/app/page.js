import Slider from "./components/Slider";
import BannerPromotion from "./components/BannerPromotion";
import WhyUs from "./components/WhyUs";
import Category from "./components/Category";
import Brands from "./components/Brands";
import Contact from "./components/Contact";
import FeedbackForm from "./components/FeedbackForm";
import Footer from "./components/Footer";

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
      <BannerPromotion />
      <WhyUs />
      <Category />
      <Brands />
      <Contact />
      <FeedbackForm />
      <Footer />
    </main>
  );
}
