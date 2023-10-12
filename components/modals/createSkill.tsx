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
  skillName: z.string().min(3),
  userId: z.string().min(3),
});

interface CreateSkillModalProps {
  userId: string;
}

const CreateSkillModal: React.FC<CreateSkillModalProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: userId,
      skillName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setIsLoading(true);
      const response = await axios.post("/api/register/skill", values);
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
          name="skillName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compétence</FormLabel>
              <FormControl>
                <Input placeholder="Ex: JavasCript" {...field} />
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

export default CreateSkillModal;
