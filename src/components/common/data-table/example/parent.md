"use client";

import { DataTable } from "@/components/common/data-table/data-table";
import { MedEmptyBoxIcon } from "@/components/common/icons";
import { useGetProviderClaims } from "@/hooks/api/provider";
import {
Claim,
useClaimsTableColumns,
} from "@/hooks/table/columns/use-claims-table-columns";
import { usePatientsToolbar } from "@/hooks/table/toolbars/use-patents-toolbar";

export const ViewAllClaims = () => {
const columns = useClaimsTableColumns();

const { data: claims } = useGetProviderClaims({});

return (
<>
{true ? (
<DataTable
data={claimsDummy}
className=""
count={claimsDummy.length}
limit={100}
pageSizeOptions={[2, 5, 10, 20, 50]}
columns={columns}
Toolbar={usePatientsToolbar}
/>
) : (
<div className="flex-1 flex items-center justify-center">
<span className="flex flex-col items-center rounded-md p-8 gap-4 max-w-96">
<MedEmptyBoxIcon />
<p className="text-center text-sm text-medsave-black-500 font-semibold">
No Claims Yet
</p>
<p className="text-center text-sm text-medsave-black-300">
No claims have been created yet. Log your first patient’s claim to
get started.
</p>
</span>
</div>
)}
</>
);
};

export const claimsDummy: Claim[] = [
{
id: "c001",
patient: "Amina Mensah",
service: "Diabetes",

    dateJoined: "2024-08-12T10:20:00Z",
    amount: "₵2,500.00",
    status: "Remitted",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123456",

},
{
id: "c002",
patient: "Kwame Nkrumah",
service: "Hypertension",

    dateJoined: "2023-11-02T08:15:00Z",
    amount: "₵1,200.00",
    status: "Pending",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123457",

},
{
id: "c003",
patient: "Efua Sarpong",
service: "Asthma",

    dateJoined: "2021-05-23T14:30:00Z",
    amount: "₵3,750.00",
    status: "Remitted",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123458",

},
{
id: "c004",
patient: "Samuel Opoku",
service: "Cholestrol",

    dateJoined: "", // intentionally empty to test fallback
    amount: "₵950.00",
    status: "Pending",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123459",

},
{
id: "c005",
patient: "Nana Ama",
service: "General",

    dateJoined: "invalid-date", // intentionally invalid to test fallback
    amount: "₵1,800.00",
    status: "Pending",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123460",

},
{
id: "c006",
patient: "Joseph Armah",
service: "Diabetes",

    dateJoined: "2022-02-14T09:00:00Z",
    amount: "₵4,200.00",
    status: "Remitted",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123461",

},
{
id: "c007",
patient: "Rita Osei",
service: "Hypertension",

    dateJoined: "2020-12-01T16:45:00Z",
    amount: "₵2,100.00",
    status: "Remitted",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123462",

},
{
id: "c008",
patient: "Michael Boateng",
service: "Asthma",

    dateJoined: "2019-07-08T12:10:00Z",
    amount: "₵1,650.00",
    status: "Pending",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123463",

},
{
id: "c009",
patient: "Linda Kwasi",
service: "Cholestrol",

    dateJoined: "2018-03-21T09:15:00Z",
    amount: "₵2,850.00",
    status: "Remitted",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123464",

},
{
id: "c010",
patient: "Daniel Kuffuor",
service: "General",

    dateJoined: "2017-10-05T11:30:00Z",
    amount: "₵1,400.00",
    status: "Pending",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123465",

},
{
id: "c011",
patient: "Grace Anokye",
service: "Diabetes",

    dateJoined: "2016-06-12T14:00:00Z",
    amount: "₵3,200.00",
    status: "Remitted",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123466",

},
{
id: "c012",
patient: "Peter Asare",
service: "Hypertension",

    dateJoined: "2015-01-30T08:45:00Z",
    amount: "₵2,750.00",
    status: "Pending",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123467",

},
{
id: "c013",
patient: "Evelyn Boateng",
service: "Asthma",

    dateJoined: "2014-09-17T10:10:00Z",
    amount: "₵1,950.00",
    status: "Remitted",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123468",

},
{
id: "c014",
patient: "Kofi Adjei",
service: "Cholestrol",

    dateJoined: "2013-04-25T13:20:00Z",
    amount: "₵3,600.00",
    status: "Pending",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123469",

},
{
id: "c015",
patient: "Abena Frimpong",
service: "General",

    dateJoined: "2012-11-11T09:05:00Z",
    amount: "₵4,800.00",
    status: "Remitted",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123470",

},
{
id: "c016",
patient: "Yaw Mensah",
service: "Diabetes",

    dateJoined: "2011-08-02T15:40:00Z",
    amount: "₵1,300.00",
    status: "Pending",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123471",

},
{
id: "c017",
patient: "Selina Ofori",
service: "Hypertension",

    dateJoined: "2010-02-19T07:50:00Z",
    amount: "₵2,400.00",
    status: "Remitted",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123472",

},
{
id: "c018",
patient: "Bernard Tetteh",
service: "Asthma",

    dateJoined: "2009-12-29T12:00:00Z",
    amount: "₵1,750.00",
    status: "Pending",
    avatar: "/media/placeholder.svg",
    medsaveId: "MS123473",

},
];
