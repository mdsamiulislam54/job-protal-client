'use client';
import Loading from '@/components/Loading/Loading';
import Pagination from '@/components/Pagination/Pagination';
import api from '@/lib/api/axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

const CompanyList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const { data: companies, isLoading, isError } = useQuery({
        queryKey: ['company', currentPage],
        queryFn: async () => {
            const res = await api.get(`/company/list?page=${currentPage}&limit=${12}`);
            setTotal(res?.data?.total || 0);
            return res?.data?.companies;
        },
        staleTime: 0,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <p className="text-center py-10"><Loading /></p>;
    if (isError) return <p className="text-center py-10 text-red-500">Error loading companies</p>;

    return (
        <div className="text-center syne text-3xl font-bold mb-6">
            <div className="custom-container">
                <div className="p-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {companies.map((company: any) => (
                        <div
                            key={company.companyName}
                            className="bg-background dark:bg-background-dark shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:border border-gray-700 hover:shadow-gray-600 cursor-pointer "
                        >
                            <div className="flex p-4  items-center syne">
                                <div>
                                    {company.logo ? (
                                        <Image
                                            src={company.logo}
                                            alt={company.companyName}
                                            width={80}
                                            height={100}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700">
                                            No Logo
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <h3 className="text-sm font-semibold">{company.companyName}</h3>
                                    {company.location && (
                                        <p className="text-sm text-muted-foreground mt-1">{company.location}</p>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))}



                </div>
                <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={total} />
            </div>
        </div>
    );
}

export default CompanyList;
