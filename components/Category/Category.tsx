import { Laptop, Briefcase, GraduationCap, Stethoscope, Megaphone, Users } from "lucide-react";

const categories = [
    {
        id: 1,
        title: "IT & Communication",
        icon: <Laptop className="w-10 h-10 text-primary" />,
        totalJobs: 120,
    },
    {
        id: 2,
        title: "Finance & Banking",
        icon: <Briefcase className="w-10 h-10 text-primary" />,
        totalJobs: 95,
    },
    {
        id: 3,
        title: "Education & Training",
        icon: <GraduationCap className="w-10 h-10 text-primary" />,
        totalJobs: 110,
    },
    {
        id: 4,
        title: "Healthcare",
        icon: <Stethoscope className="w-10 h-10 text-primary" />,
        totalJobs: 85,
    },
    {
        id: 5,
        title: "Marketing & Sales",
        icon: <Megaphone className="w-10 h-10 text-primary" />,
        totalJobs: 70,
    },
   
];

const Category = () => {
    return (
        <section className="py-16 bg-background-light dark:bg-background-dark">
            <div className="custom-container">
                <h2 className="text-3xl font-bold text-center mb-8 syne">Explore Job Categories</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6  mx-auto">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="flex flex-col items-center justify-center gap-3 p-6 border rounded-2xl hover:shadow-lg 
            transition duration-300 bg-white dark:bg-background-dark border-secondary/20 dark:text-white
            shadow-md dark:shadow-gray-800 cursor-pointer
            
            "
                        >
                            <div className="p-3 rounded-full bg-primary/10">{cat.icon}</div>
                            <h3 className="text-sm  font-semibold text-gray-800 dark:text-text-dark">{cat.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-text-dark">{cat.totalJobs}+ Jobs Available</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;
