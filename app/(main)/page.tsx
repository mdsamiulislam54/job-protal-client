import Category from "@/components/Category/Category";
import Hero from "@/components/Hero/Hero";
import LatestJobs from "@/components/Jobs/Latest-jobs/Latest-jobs";
import Overview from "@/components/Overview/Overview";


export default function Home() {
  return (
    <div >
      <Hero />
      <Category/>
      <LatestJobs/>
      <Overview/>
    </div>
  );
}
