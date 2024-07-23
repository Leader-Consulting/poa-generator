"use client"

import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const arabicRegex = /^[\u0600-\u06FF\s]+$/;

const FormSchema = z.object({
  companyName: z.string().min(1, { message: "Company Name is required" }).regex(arabicRegex, { message: "Only Arabic letters are allowed" }),
  licenseNumber: z.string().min(1, { message: "License Number is required" }),
  issuingAuthority: z.string().min(1, { message: "Issuing Authority is required" }).regex(arabicRegex, { message: "Only Arabic letters are allowed" }),
  address: z.string().min(1, { message: "Company Address is required" }),
  representative: z.string().min(1, { message: "Representative is required" }).regex(arabicRegex, { message: "Only Arabic letters are allowed" }),
  nationality: z.string().min(1, { message: "Nationality is required" }).regex(arabicRegex, { message: "Only Arabic letters are allowed" }),
  idNumber: z.string().min(1, { message: "ID Number is required" }),
});

const CompanyForm = forwardRef(({ setData }, ref) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: "",
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

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
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
              <FormLabel>License Number</FormLabel>
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
              <FormLabel>Issuing Authority</FormLabel>
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
              <FormLabel>Company Address</FormLabel>
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
              <FormLabel>Representative</FormLabel>
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
              <FormLabel>Nationality</FormLabel>
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
              <FormLabel>ID Number</FormLabel>
              <FormControl>
                <Input placeholder="ID Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});

CompanyForm.displayName = "CompanyForm";

export default CompanyForm;