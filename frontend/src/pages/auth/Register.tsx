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
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <Card className="max-w-md w-full">
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}> */}
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
        <CardContent className="space-y-2"></CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit">
            Register
          </Button>
          <Link to="/login" className="mt-3">
            Login if you already have an account
          </Link>
        </CardFooter>
        {/* </form>
        </Form> */}
      </Card>
    </>
  );
};

export default Register;
