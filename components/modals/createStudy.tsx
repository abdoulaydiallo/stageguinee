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
import { User } from "@prisma/client";

const formSchema = z.object({
  institution: z.string().min(3, {
    message: "Institution dois avoir au minimun 2 caracteres !",
  }),
  degree: z.string().min(3, {
    message: "Institution dois avoir au minimun 2 caracteres !",
  }),
  startDate: z.string(),
  endDate: z.string(),
  fieldOfStudy: z.string(),
  userId: z.string(),
});

interface CreateStudyModalProps {
  userId: string;
}

const CreateStudyModal: React.FC<CreateStudyModalProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: userId,
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      fieldOfStudy: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setIsLoading(true);
      const response = await axios.post("/api/register/study", values);
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
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Etablissement</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'école" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4">Niveau</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Licence" {...field} />
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
                <FormLabel className="mt-4">Date d&apos;inscription</FormLabel>
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
                <FormLabel className="mt-4">Date de sortie</FormLabel>
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

        <FormField
          control={form.control}
          name="fieldOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4">Domaine d&apos;étude</FormLabel>
              <FormControl>
                <Input placeholder="Département" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
          Envoyer
        </Button>
      </form>
    </Form>
  );
};

export default CreateStudyModal;
