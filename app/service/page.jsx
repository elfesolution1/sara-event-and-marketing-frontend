"use client";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { delay, motion } from "framer-motion";
import { getStrapiData } from "@/libs/api";
import { useState, useEffect } from "react";
import Link from "next/link";

function Service() {
  const baseImageUrl = "http://localhost:1337";
  const [servicePageData, setServicePageData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const query = `
      {
       servicePage{
    data{
      attributes{
        blocks{
          ... on ComponentLayoutServiceCard{
            ServiceCard{
              description,
              title,
              button,
              href,
              image{
                data{
                  attributes{
                    url,
                    alternativeText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
      }
      `;
      const articles = await getStrapiData(query);
      setServicePageData(articles.servicePage);
    };

    fetchData();
  }, []);
  if (!servicePageData) return <div>Loading...</div>;
  const linkBaseUrl = "http://localhost:3000";
  const { blocks } = servicePageData;
  const serviceData = blocks[0];
  console.log("service ", serviceData.ServiceCard);
  const cardVariants = [
    {
      hidden: { opacity: 0, x: -100 }, // Slide from left
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.8 } },
    },
    {
      hidden: { opacity: 0, y: 100 }, // Slide from bottom
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } },
    },
    {
      hidden: { opacity: 0, x: 100 }, // Slide from right
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.8 } },
    },
  ];
  return (
    <>
      <section className="hero-section relative w-full h-[50vh]">
        <div className="relative w-full h-full">
          <Image
            src="https://via.assets.so/img.jpg?w=1000&h=200&tc=blue&bg=gray"
            alt="alt"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-8">
            <div className="text-white text-left max-w-lg ml-12">
              <h1 className="text-2xl font-bold mb-4 leading-tight shadow-lg">
                Service
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-12 pt-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-[#1F995E]">
            {/* {serviceSection.title} */}
            Our <span className="text-[#1e995e] font-bold">Service</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perferendis, repellendus nulla. Praesentium architecto corporis qui
            ab assumenda maiores rem, tempore debitis et
          </p>
        </div>

        <section className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {serviceData.ServiceCard.map((item, index) => {
            return (
              <motion.Card
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants[index % 3]}
                className="shadow-md"
              >
                <CardHeader className="p-0">
                  <Image
                    src={`${baseImageUrl}${item.image.url}`}
                    alt={item.image.alternativeText}
                    width={400}
                    height={250}
                    className="w-full h-52 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-2xl font-semibold text-gray-800 mb-2 dark:text-[#1F995E]">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 dark:text-white">
                    {item.description}
                  </CardDescription>
                  <Link
                    href={`${linkBaseUrl}${item.href}`}
                    target="_blank"
                    className="bg-[#1e995e] hover:bg-white hover:text-[#1e995e] hover:border hover:border-[#1e995e] text-white py-2 px-4 rounded hover:scale-110 hover:shadow-lg transition-all duration-300"
                  >
                    {item.button}
                  </Link>
                </CardContent>
              </motion.Card>
            );
          })}
        </section>
      </section>
    </>
  );
}

export default Service;
