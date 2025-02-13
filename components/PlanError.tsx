import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui";

interface ApiErrorProps {
  message: string;
}

export function ApiError({ message }: ApiErrorProps) {
  return (
    <div className="flex min-h-[calc(100vh-136px)] flex-col items-center justify-center bg-background text-foreground">
      <div className="container flex max-w-md flex-col items-center gap-4 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h1 className="text-4xl font-bold tracking-tighter">API Plan Error</h1>
        <p className="text-xl text-muted-foreground">{message}</p>
        <div className="mt-4 flex gap-2">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          {/* <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button> */}
        </div>
      </div>
    </div>
  );
}
