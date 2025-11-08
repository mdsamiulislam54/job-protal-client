import Category from "@/components/Category/Category";
import Faq from "@/components/Faq/Faq";
import Hero from "@/components/Hero/Hero";
import LatestJobs from "@/components/Jobs/Latest-jobs/Latest-jobs";
import Newsletter from "@/components/NewsLetter/NewsLetter";

import Overview from "@/components/Overview/Overview";
import Testimonial from "@/components/Testimonial/Testimonial";


export default function Home() {
  
  return (
    <div >
      <Hero />
      <Category/>
      <LatestJobs/>
      <Overview/>
      <Faq/>
      <Testimonial/>
      <Newsletter/>
    </div>
  );
}
