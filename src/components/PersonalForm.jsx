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
  fullName: z.string().min(1, { message: "Full Name is required" }).regex(arabicRegex, { message: "Only Arabic letters are allowed" }),
  fullNameEnglish: z.string().min(1, { message: "Full Name in English is required" }),
  referenceNumber: z.string().min(1, { message: "Reference Number is required" }),
  nationality: z.string().min(1, { message: "Nationality is required" }).regex(arabicRegex, { message: "Only Arabic letters are allowed" }),
  idNumber: z.string().min(1, { message: "ID Number is required" }),
});

const PersonalForm = forwardRef(({ setData, isShort, setIsShort }, ref) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      fullNameEnglish: "",
      referenceNumber: "",
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
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>
                <span>الاسم الكامل</span>
                <span>Full Name</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullNameEnglish"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>
                <span>الاسم الكامل بالإنجليزية</span>
                <span>Full Name in English</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Full Name in English" {...field} />
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

PersonalForm.displayName = "PersonalForm";

export default PersonalForm;