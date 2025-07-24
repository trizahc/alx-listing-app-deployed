import "./globals.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import Card from "@/components/common/Card";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";



export default function Home() {
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchListings = async () => {
        try {
            const response = await 
            axios.get(https://felikz97.pythonanywhere.com/api/properties);
            setProperties(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load listings.");
        } finally {
            setLoading(false);
        }
        };

        fetchListings();
    }, []);

    return (
        <>
        <Head>
            <title>ALX Listing App</title>
        </Head>

        <Navbar /> 
        <div className="bg-gray-100 min-h-screen">
            <main className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Available Properties
                </h1>

            {loading && <p className="text-gray-500">Loading listings...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                <Card
                    key={property.id}
                    id={property.id}
                    title={property.name}
                    description={property.description || "No description provided."}
                    imageUrl={property.image || "/fallback.jpg"}
                    onClick={() => {
                    // You can navigate to /property/[id] here
                    console.log("Clicked", property.id);
                    }}
                />
                ))}
            </div>
            )}
            <Footer />
        </main>
        </div>
        </>
    );
}