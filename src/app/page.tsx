"use client"

import React from "react";

import { locale, addLocale } from 'primereact/api';
import MainLayout from "./layout/page";
 
export default function Home() {
  addLocale('es', {
    firstDayOfWeek: 1,
    dayNamesMin: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  });

  locale('es');

  return (
    <MainLayout />
  );
}