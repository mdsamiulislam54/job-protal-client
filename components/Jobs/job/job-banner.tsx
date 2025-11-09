import { Button } from "@/components/ui/button";

const JobBanner = () => {
    return (
        <div
            className="w-full h-[400px] bg-cover bg-center relative"
            style={{
                backgroundImage: `url("https://img.freepik.com/free-photo/handsome-businessman-black-suit-holding-magnifying-glass-smiling-found-something-standing-aga_1258-154963.jpg?t=st=1762663182~exp=1762666782~hmac=b9dbcfd53004367209410b6f5479d22639d43983073f40ad89ed3c1e18acc5d3&w=1060")`,
            }}
        >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-primary/90 dark:bg-background-dark/90"></div>
            <div className="custom-container  ">
                <div className="max-w-3xl pt-24  relative z-10 h-full  text-white px-4 flex flex-col gap-4   ">
                    <p className="text-sm uppercase tracking-wide syne ">
                        Find Your Next Opportunity
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold syne mt-2">
                        Explore All Available Job Openings
                    </h1>
                    <p className="max-w-xl syne mt-4 text-gray-200">
                        Discover the latest job opportunities that match your skills and
                        interests. Browse through our list of available positions and take
                        the next step in your career journey.
                    </p>
                   
                </div>
            </div>
        </div>
    );
};

export default JobBanner;
