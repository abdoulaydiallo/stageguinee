"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Education, Experience, User } from "@prisma/client";
import { format } from "date-fns";

const formSchema = z.object({
  id: z.string().min(3),
  organization: z.string().min(3),
  title: z.string().min(3),
  startDate: z.date(),
  endDate: z.date().nullable(),
  userId: z.string(),
});

interface UpdateWorkModalProps {
  userId: string;
  experience: Experience;
}

const UpdateWorkModal: React.FC<UpdateWorkModalProps> = ({
  userId,
  experience,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: experience.id,
      userId: userId,
      organization: experience.organization,
      title: experience.title,
      startDate: experience.startDate,
      endDate: experience.endDate,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.patch("/api/register/work", values);
      toast.success("Success!");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entreprise</FormLabel>
              <FormControl>
                <Input placeholder="Nom de la société" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4">Poste</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Formateur" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4">Date de debut</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="choisir une date"
                    value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4">Date de fin</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="choisir une date"
                    value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
          Envoyer
        </Button>
      </form>
    </Form>
  );
};

export default UpdateWorkModal;
