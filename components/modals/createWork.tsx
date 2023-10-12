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

const formSchema = z.object({
  organization: z.string().min(3),
  title: z.string().min(3),
  startDate: z.string(),
  endDate: z.string(),
  userId: z.string(),
});

interface CreateWorkModalProps {
  userId: string;
}

const CreateWorkModal: React.FC<CreateWorkModalProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization: "",
      title: "",
      startDate: "",
      endDate: "",
      userId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setIsLoading(true);
      const response = await axios.post("/api/register/work", values);
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
                <Input placeholder="Nom de l'entreprise" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4">Titre/Poste</FormLabel>
              <FormControl>
                <Input placeholder="Ex: vendeur" {...field} />
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
                <FormLabel className="mt-4">Date de début</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="choisir une date"
                    {...field}
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
                    {...field}
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

export default CreateWorkModal;
