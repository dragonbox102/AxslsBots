import { Link } from "wouter";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Card className="flex flex-col items-center justify-center border border-border bg-card shadow-lg md:w-3/4">
        <CardHeader className="flex w-full flex-col items-center">
          <CardTitle className="text-9xl">404</CardTitle>
          <CardDescription>Page Not Found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            We are sorry, but the page you requested was not found.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}