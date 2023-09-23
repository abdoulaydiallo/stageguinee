"use client";

import axios from "axios";
import toast from "react-hot-toast";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User } from "@clerk/nextjs/server";
import { Input } from "@/components/ui/input";

import {
  PhoneInput,
  defaultCountries,
  parseCountry,
} from "react-international-phone";
import "react-international-phone/style.css";
import ImageUpload from "@/components/image-upload";
import { useRouter } from "next/navigation";

enum STEPS {
  PROFILE = 0,
  EDUCATION = 1,
}

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Ce champ est obligatoire !",
  }),
  email: z.string().email({
    message: "Ce champ est obligatoire !",
  }),
  residenceCity: z.string().min(2, {
    message: "Ce champ est obligatoire !",
  }),
  phoneNumber: z.string(),
  clerkId: z.string(),
  profileImage: z.string(),
});

interface ClientProps {
  currentUser: User | null;
  userId: string;
}

const Client: React.FC<ClientProps> = ({ currentUser, userId }) => {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.PROFILE);
  const [loading, setIsLoading] = useState(false);

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ["gn"].includes(iso2);
  });

  const fullName = currentUser?.firstName + " " + currentUser?.lastName;
  const email = currentUser?.emailAddresses.map((e) => e.emailAddress)[0];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: fullName,
      email: email,
      residenceCity: "",
      phoneNumber: "",
      clerkId: userId,
      profileImage: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (!userId) {
        toast.error("Unauthorized");
        router.refresh();
      }
      const response = await axios.post("/api/register/profile", values);
      toast.success("Success !");
      window.location.assign(`/register/study?userId=${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  let bodyContent = (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="pb-4">
            <div className="min-h-[40vh] grid grid-cols-none md:grid-cols-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom et Nom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Prénom et Nom"
                          {...field}
                          required
                          className="col-span-2"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="residenceCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ville</FormLabel>
                      <FormControl>
                        <Input placeholder="Ville" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <PhoneInput
                          {...field}
                          hideDropdown
                          defaultCountry="gn"
                          countries={countries}
                          inputStyle={{
                            width: "100%",
                            borderColor: `hsl(var(--input))`,
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-4">
                <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUpload {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-lg">Photo de Profile</div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Button
              type="submit"
              disabled={loading}
              className="w-48 mt-4 ml-auto"
            >
              Suivant
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );

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
        description="Complétez votre profile pour trouver des opportunités qui correspondents à vos compétences."
      />
      {bodyContent}
    </div>
  );
};
export default Client;
