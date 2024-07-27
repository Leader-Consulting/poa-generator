"use client"

import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import POALengthSwitch from './POALengthSwitch';

const arabicRegex = /^[\u0600-\u06FF\s]+$/;

const FormSchema = z.object({
  companyName: z.string().min(1, { message: "Company Name is required" }).regex(arabicRegex, { message: "Only Arabic letters are allowed" }),
  companyNameEnglish: z.string().min(1, { message: "Company Name in English is required" }),
  referenceNumber: z.string().min(1, { message: "Reference Number is required" }),
  licenseNumber: z.string().min(1, { message: "License Number is required" }),
  issuingAuthority: z.string().min(1, { message: "Issuing Authority is required" }).regex(arabicRegex, { message: "Only Arabic letters are allowed" }),
  address: z.string().min(1, { message: "Company Address is required" }),
  representative: z.string().min(1, { message: "Representative is required" }).regex(arabicRegex, { message: "Only Arabic letters are allowed" }),
  nationality: z.string().min(1, { message: "Nationality is required" }).regex(arabicRegex, { message: "Only Arabic letters are allowed" }),
  idNumber: z.string().min(1, { message: "ID Number is required" }),
});

const CompanyForm = forwardRef(({ setData, isShort, setIsShort }, ref) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: "",
      companyNameEnglish: "",
      referenceNumber: "",
      issuingAuthority: "",
      address: "",
      licenseNumber: "",
      representative: "",
      nationality: "",
      idNumber: "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      setData(value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setData]);

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      return new Promise((resolve, reject) => {
        form.handleSubmit(
          () => resolve(true),
          () => resolve(false)
        )();
      });
    }
  }));

  const labelStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    direction: 'rtl',
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>
                <span>اسم الشركة</span>
                <span>Company Name</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyNameEnglish"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>
                <span>اسم الشركة بالإنجليزية</span>
                <span>Company Name in English</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Company Name in English" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referenceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>
                <span>الرقم المرجعي</span>
                <span>Reference Number</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Reference Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>
                <span>رقم الرخصة</span>
                <span>License Number</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="License Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       <FormField
          control={form.control}
          name="issuingAuthority"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>
                <span>جهة الإصدار</span>
                <span>Issuing Authority</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Issuing Authority" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>
                <span>عنوان الشركة</span>
                <span>Company Address</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Company Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="representative"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>
                <span>الممثل</span>
                <span>Representative</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Representative" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>
                <span>الجنسية</span>
                <span>Nationality</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Nationality" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>
                <span>رقم الهوية</span>
                <span>ID Number</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="ID Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <POALengthSwitch isShort={isShort} setIsShort={setIsShort} />
      </form>
    </Form>
  );
});

CompanyForm.displayName = "CompanyForm";

export default CompanyForm;