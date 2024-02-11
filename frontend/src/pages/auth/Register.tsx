import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import registerSchema from "@/lib/validations/register-validation";
import authService from "@/services/auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutation.mutate(values);
  };

  const mutation = useMutation(authService.register, {
    onSuccess: () => {
      form.reset();
      setError(null);
      toast("Success create an account", {
        duration: 2000,
      });
      navigate("/login");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message);
      }
    },
    onMutate: () => {
      setError(null);
    },
  });

  return (
    <>
      <Card className="max-w-md w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Register for an account</CardDescription>
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardHeader>
            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full" type="submit">
                Register
              </Button>
              <Link to="/login" className="mt-3">
                Login if you already have an account
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default Register;
