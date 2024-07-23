"use client"

import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const arabicRegex = /^[\u0600-\u06FF\s]+$/;

const FormSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }).regex(arabicRegex, { message: "Only Arabic letters are allowed" }),
  nationality: z.string().min(1, { message: "Nationality is required" }).regex(arabicRegex, { message: "Only Arabic letters are allowed" }),
  idNumber: z.string().min(1, { message: "ID Number is required" }),
});

const PersonalForm = forwardRef(({ setData }, ref) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
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
    submitForm: () => form.handleSubmit(() => {})()
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
      </form>
    </Form>
  );
});

PersonalForm.displayName = "PersonalForm";

export default PersonalForm;