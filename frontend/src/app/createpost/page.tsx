"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import TextEditor from "@/components/TextEditor/TextEditor";

type FormSchema = {
  title: string;
  content: string;
};

export default function CreatePost() {
  const form = useForm<FormSchema>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log("📝 Submitted:", data);
  };

  return (
    <div className="w-screen h-screen flex  items-center justify-center ">
      <div className="max-w-full max-h-screen mx-auto mt-10 bg-zinc-900  text-zinc-100 p-6 rounded-lg border border-zinc-700 shadow-md">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter post title..."
                      {...field}
                      className="bg-zinc-800 text-zinc-100 border-zinc-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem  >
                  <FormLabel className="text-white">Contentds</FormLabel>
                  <FormControl >
                    <TextEditor content={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="hover:bg-zinc-400 bg-zinc-300 text-zinc-900">
              Submit Post
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
