"use client";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";

enum STEPS {
  PROFILE = 0,
  EDUCATION = 1,
}

const formSchema = z.object({
  institution: z.string().min(2),
  degree: z.string().min(2),
  fieldOfStudy: z.string().min(2),
  startDate: z.string(),
  endDate: z.string(),
  userId: z.string(),
});

interface ClientProps {
  userId: string;
}

const Client: React.FC<ClientProps> = ({ userId }) => {
  const [step, setStep] = useState(STEPS.EDUCATION);
  const [loading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      userId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/register/study", values);
      toast.success("Success !");
      window.location.assign("/member/edit-profile");
    } catch (error) {
      toast.error("Something went wrong !");
    } finally {
      setIsLoading(false);
    }
  };

  let bodyContent;
  if (step === STEPS.EDUCATION) {
    bodyContent = (
      <div>
        <div className="text-lg font-semibold">Edication</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="pb-4">
              <div className="min-h-[40vh] grid grid-cols-none md:grid-cols-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diplôme</FormLabel>
                        <FormControl>
                          <Input placeholder="Diplôme" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <Input placeholder="Institution" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fieldOfStudy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Département</FormLabel>
                        <FormControl>
                          <Input placeholder="Département" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Entré</FormLabel>
                        <FormControl>
                          <Input type="date" placeholder="Date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de Sortie</FormLabel>
                        <FormControl>
                          <Input type="date" placeholder="Date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="w-full ml-auto">
              <Button disabled={loading} className="w-48" type="submit">
                Envoyer
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="my-8 flex items-center justify-center">
        <div
          className={`w-3 h-3 rounded-full mx-2 bg-[#2370f4]  ${
            step === STEPS.PROFILE ? "opacity-100" : "opacity-5"
          }`}
        ></div>
        <div
          className={`w-3 h-3 rounded-full mx-2 bg-[#2370f4] ${
            step === STEPS.EDUCATION ? "opacity-100" : "opacity-5"
          }`}
        ></div>
      </div>
      <Heading
        title="Soyez jumelé à l'emploi de vos rêves."
        description="Complétez votre profil pour trouver des opportunités qui correspondents à vos compétences."
      />
      {bodyContent}
    </div>
  );
};
export default Client;
