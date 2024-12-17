"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "../../components/ui/button";
import LoadingModal from "./ui/LoadingModal";

export default function DashboardBtn(schoolInfo) {
    const [dashboards, setDashboards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboards = async () => {
            try {
                const res = await fetch('/api/dashboard', {
                    cache: 'no-store',
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch information");
                }

                const data = await res.json();
                setDashboards(data.dashboards);
            } catch (error) {
                console.error("Error Loading informations: ", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboards();
    }, []);


    console.log(schoolInfo);

    return (
        <div>
            {dashboards.map((schoolInfo) => (
                <div key={schoolInfo._id}>
                    <Link href={`editDashboard/${schoolInfo._id}`} className={buttonVariants({
                        size: "sm",
                        variant: "ghost",
                    })}>
                        Dashboard
                    </Link>
                </div>
            ))}
        </div>
    );
}