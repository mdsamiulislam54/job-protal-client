"use client"
import { FormProvider, useForm } from "react-hook-form"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import api from "@/lib/api/axios"
import { toast } from "react-toastify"
import { handleAxiosError } from "@/lib/handleAxiosError/handleAxiosError"
import { useAuth } from "@/hook/UserHook/useAuth"
const JobPostPage = () => {

    const {user} = useAuth()
    const methods = useForm({
        defaultValues: {
            title: "",
            category: "",
            companyName: "",
            location: "",
            jobType: "",
            experienceLevel: "",
            workingHours: "",
            salaryRange: { min: 0, max: 0, currency: "BDT" },
            skills: "",
            postedDate: "",
            deadline: "",
            aboutTheJob: "",
            jobDescription: "",
            responsibilities: "",
            requirements: "",
            benefits: "",
            companyLogo: "",
            contactEmail: "",
            contactMessage: "",
        }
    });

    const { register, handleSubmit, formState: { errors }, reset } = methods;

    const onSubmit = async (data) => {
        const formattedData = {
            ...data,
            responsibilities: data.responsibilities
                ? data.responsibilities.split(',').map(i => i.trim())
                : [],
            requirements: data.requirements
                ? data.requirements.split(',').map(i => i.trim())
                : [],
            skills: data.skills
                ? data.skills.split(',').map(i => i.trim())
                : [],
            benefits: data.benefits
                ? data.benefits.split(',').map(i => i.trim())
                : [],
        };

        try {
            const res = await api.post(`/job`, formattedData)

            if (res.status === 200) {
                toast.success('Jobs Post Successfully!')
            }

            console.log("Job Data:", formattedData);
            reset();
        } catch (error) {
            handleAxiosError(error)
        }
    }

    return (
        <div className="min-h-screen py-10 ">
            <div className="custom-container max-w-5xl mx-auto shadow  p-8 rounded-2xl ">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200 syne">
                    Post a New Job
                </h2>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                        {/* --- Basic Info --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label className="font-semibold mb-1 block">Job Title</label>
                                <Input {...register("title", { required: "Title is required" })} placeholder="Frontend Developer" className="border-2" />
                                {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="font-semibold mb-1 block">Category</label>
                                <select
                                    {...register("category", { required: "Category is required" })}
                                    className="p-2 border-2 w-full rounded-md border-gray-400"
                                >
                                    <option value="">Select a category</option>
                                    <option value="web-development">IT & Communication</option>
                                    <option value="mobile-development">Finance & Banking</option>
                                    <option value="data-science">Education & Training</option>
                                    <option value="design">Healthcare</option>
                                    <option value="marketing">Marketing & Sales</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
                            </div>

                            <div>
                                <label className="font-semibold mb-1 block">Company Name</label>
                                <Input {...register("companyName", { required: "Company name is required" })} placeholder="Enter your company name" className="border-2" />
                                {errors.companyName && <p className="text-red-600 text-sm mt-1">{errors.companyName.message}</p>}
                            </div>

                            <div>
                                <label className="font-semibold mb-1 block">Location</label>
                                <Input {...register("location", { required: "Location is required" })} placeholder="Dhaka, Bangladesh" className="border-2"/>
                                {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>}
                            </div>
                        </div>

                        {/* --- Job Details --- */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
  <label className="font-semibold mb-1 block">Job Type</label>
  <select 
    {...register("jobType", { required: "Job type is required" })} 
    className="border-2 w-full p-2 rounded-md border-gray-400"
  >
    <option value="">Select job type</option>
    <option value="full-time">Full-time</option>
    <option value="part-time">Part-time</option>
    <option value="contract">Contract</option>
    <option value="freelance">Freelance</option>
    <option value="internship">Internship</option>
    <option value="remote">Remote</option>
  </select>
  {errors.jobType && <p className="text-red-600 text-sm mt-1">{errors.jobType.message}</p>}
</div>

                          <div>
  <label className="font-semibold mb-1 block">Experience Level</label>
  <select 
    {...register("experienceLevel", { required: "Experience level is required" })} 
    className="border-2 w-full p-2 rounded-md border-gray-400"
  >
    <option value="">Select experience level</option>
    <option value="entry-level">Entry Level</option>
    <option value="mid-level">Mid Level</option>
    <option value="senior-level">Senior Level</option>
    <option value="lead">Lead</option>
    <option value="principal">Principal</option>
  </select>
  {errors.experienceLevel && <p className="text-red-600 text-sm mt-1">{errors.experienceLevel.message}</p>}
</div>

                            <div>
                                <label className="font-semibold mb-1 block">Working Hours</label>
                                <Input {...register("workingHours", { required: "Working hours is required" })} placeholder="9 AM - 5 PM" className="border-2" />
                                {errors.workingHours && <p className="text-red-600 text-sm mt-1">{errors.workingHours.message}</p>}
                            </div>
                        </div>

                        {/* --- Salary & Skills --- */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="font-semibold mb-1 block">Min Salary (BDT)</label>
                                <Input type="number" {...register("salaryRange.min", { required: "Min salary is required" })} placeholder="20000" className="border-2" />
                                {errors.salaryRange?.min && <p className="text-red-600 text-sm mt-1">{errors.salaryRange.min.message}</p>}
                            </div>

                            <div>
                                <label className="font-semibold mb-1 block">Max Salary (BDT)</label>
                                <Input type="number" {...register("salaryRange.max", { required: "Max salary is required" })} placeholder="40000" className="border-2" />
                                {errors.salaryRange?.max && <p className="text-red-600 text-sm mt-1">{errors.salaryRange.max.message}</p>}
                            </div>

                            <div>
                                <label className="font-semibold mb-1 block">Skills (comma-separated)</label>
                                <Input {...register("skills", { required: "Skills are required" })} placeholder="HTML, CSS, React..." className="border-2" />
                                {errors.skills && <p className="text-red-600 text-sm mt-1">{errors.skills.message}</p>}
                            </div>
                        </div>

                        {/* --- Company Logo & Benefits --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="font-semibold mb-1 block">Company Logo URL</label>
                                <Input {...register("companyLogo", { required: "Company logo URL is required" })} placeholder="https://logo-name.com" className="border-2" />
                                {errors.companyLogo && <p className="text-red-600 text-sm mt-1">{errors.companyLogo.message}</p>}
                            </div>

                            <div>
                                <label className="font-semibold mb-1 block">Benefits (comma-separated)</label>
                                <Input {...register("benefits", { required: "Benefits are required" })} placeholder="Health insurance, Bonus, Remote work" className="border-2" />
                                {errors.benefits && <p className="text-red-600 text-sm mt-1">{errors.benefits.message}</p>}
                            </div>
                        </div>

                        {/* --- Description --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="font-semibold mb-1 block">About the Job</label>
                                <Textarea {...register("aboutTheJob", { required: "About the Job is required" })} rows={3} placeholder="Short summary about the job..." />
                                {errors.aboutTheJob && <p className="text-red-600 text-sm mt-1">{errors.aboutTheJob.message}</p>}
                            </div>

                            <div>
                                <label className="font-semibold mb-1 block">Job Description</label>
                                <Textarea {...register("jobDescription", { required: "Job description is required" })} rows={5} placeholder="Write about your company, role, team size, culture, and candidate expectations." />
                                {errors.jobDescription && <p className="text-red-600 text-sm mt-1">{errors.jobDescription.message}</p>}
                            </div>
                        </div>

                        {/* --- Responsibilities & Requirements --- */}
                        <div className="space-y-4">
                            <div>
                                <label className="font-semibold mb-1 block">Responsibilities (comma-separated)</label>
                                <Textarea {...register("responsibilities", { required: "Responsibilities are required" })} rows={3} placeholder="Write responsibilities separated by comma (,)" />
                                {errors.responsibilities && <p className="text-red-600 text-sm mt-1">{errors.responsibilities.message}</p>}
                            </div>

                            <div>
                                <label className="font-semibold mb-1 block">Requirements (comma-separated)</label>
                                <Textarea {...register("requirements", { required: "Requirements are required" })} rows={3} placeholder="Write requirements separated by comma (,)" />
                                {errors.requirements && <p className="text-red-600 text-sm mt-1">{errors.requirements.message}</p>}
                            </div>
                        </div>

                        {/* --- Dates & Contact --- */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="font-semibold mb-1 block">Posted Date</label>
                                <Input type="date" {...register("postedDate", { required: "Posted date is required" })} className="border-2" />
                                {errors.postedDate && <p className="text-red-600 text-sm mt-1">{errors.postedDate.message}</p>}
                            </div>

                            <div>
                                <label className="font-semibold mb-1 block">Deadline</label>
                                <Input type="date" {...register("deadline", { required: "Deadline is required" })} className="border-2" />
                                {errors.deadline && <p className="text-red-600 text-sm mt-1">{errors.deadline.message}</p>}
                            </div>

                            <div>
                                <label className="font-semibold mb-1 block">Contact Email</label>
                                <Input
                                    type="email"
                                      value={user.email}
                                    {...register("contactEmail", {
                                      
                                        required: "Contact Email is required",
                                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" }
                                    })}
                                    placeholder="example@company.com"
                                    className="border-2"
                                />
                                {errors.contactEmail && <p className="text-red-600 text-sm mt-1">{errors.contactEmail.message}</p>}
                            </div>
                        </div>

                        {/* --- Message for Applicants --- */}
                        <div>
                            <label className="font-semibold mb-1 block">Message for Applicants</label>
                            <Textarea {...register("contactMessage", { required: "Message is required" })} placeholder="About your company, why you're hiring, and where to send CV/Resume" />
                            {errors.contactMessage && <p className="text-red-600 text-sm mt-1">{errors.contactMessage.message}</p>}
                        </div>

                        {/* --- Submit --- */}
                        <div className="text-center">
                            <Button type="submit" className="px-8 py-2 font-semibold">Submit Job Post</Button>
                        </div>

                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default JobPostPage;
