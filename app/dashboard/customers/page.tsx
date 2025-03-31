import Table from '../../ui/customers/table'
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata:Metadata={
    title:'customer'
  }

export default async function Page(props:{
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const customers = await fetchFilteredCustomers(query);
    // const totalPages = await fetchInvoicesPages(query);
    
  return (
    <div className="w-full">
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table customers={customers}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}