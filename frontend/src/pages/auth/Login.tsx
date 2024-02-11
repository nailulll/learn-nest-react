import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import authService from "@/services/auth-service";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import loginSchema from "@/lib/validations/login-validation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation(authService.login, {
    onSuccess: () => {
      form.reset();
      setError(null);
      toast("Success login to your account", {
        duration: 2000,
      });
      navigate("/dashboard");
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

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutation.mutate(values);
  };

  return (
    <>
      <Card className="max-w-md w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to start session</CardDescription>
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
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full" type="submit">
                Login
              </Button>
              <Link to="/register" className="mt-3">
                Click here to register
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default Login;
